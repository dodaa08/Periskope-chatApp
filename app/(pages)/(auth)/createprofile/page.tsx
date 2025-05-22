"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from "next-auth/react";

export default function CreateProfile() {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true); // Start with loading state true
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
    const router = useRouter();
    const { data: session, status } = useSession();

    const supabase = createClientComponentClient({
        cookieOptions: {
            name: "sb-periskope-auth",
            domain: "",
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        }
    });
    
    // Check if user already has a profile on page load
    useEffect(() => {
        // Wait for session to be loaded
        if (status === 'loading') return;

        const checkExistingProfile = async () => {
            try {
                // Check if user is authenticated with NextAuth
                if (!session?.user) {
                    // If no user, redirect to sign in
                    router.push('/signin');
                    return;
                }
                
                // Try to get user's display name from session
                if (session.user?.name) {
                    setFullName(session.user.name);
                }
                
                // Get current user from Supabase using the email from session
                const { data: { user } } = await supabase.auth.getUser();
                
                if (!user) {
                    console.error('No user found in Supabase');
                    // Continue anyway as we have a NextAuth session
                }
                
                // Check if user already has a profile
                const userId = user?.id || (session.user as any).id;
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();
                
                if (profile) {
                    // User already has a profile, redirect to chats
                    router.push('/chats');
                } else {
                    // No profile, allow creation
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error checking profile:', err);
                setLoading(false);
            }
        };
        
        checkExistingProfile();
    }, [router, supabase, session, status]);
    
    // Handle toast auto-hide and redirect
    useEffect(() => {
        if (showToast && toastType === 'success') {
            const timer = setTimeout(() => {
                setShowToast(false);
                router.push('/chats');
            }, 3000);
            
            return () => clearTimeout(timer);
        } else if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [showToast, toastType, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use NextAuth session as primary auth source
            if (!session?.user) {
                setToastType('error');
                setToastMessage('You must be logged in to create a profile');
                setShowToast(true);
                setError('You must be logged in to create a profile');
                return;
            }
            
            // Get Supabase user as backup
            const { data: { user } } = await supabase.auth.getUser();
            const userId = user?.id || (session.user as any).id;
            
            // Create profile with user ID
            const { error: profileError } = await supabase.from('profiles').insert([{
                id: userId,
                avatar_url: avatarUrl,
                full_name: fullName || session.user?.name || "",
                username: session.user?.email || user?.email
            }]);
            
            if (profileError) {
                console.error(profileError);
                setToastType('error');
                setToastMessage(profileError.message);
                setShowToast(true);
                setError(profileError.message);
            } else {
                setToastType('success');
                setToastMessage('Profile created successfully! Redirecting to chats...');
                setShowToast(true);
                router.push('/chats');
            }
        } catch (err) {
            console.error(err);
            setToastType('error');
            setToastMessage('An unexpected error occurred');
            setShowToast(true);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Toast notification */}
            {showToast && (
                <div className={`fixed top-5 right-5 p-4 rounded shadow-lg z-50 ${
                    toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 
                    toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' :
                    'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
                }`}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {toastType === 'success' && (
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                            {toastType === 'error' && (
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                            {toastType === 'info' && (
                                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm">{toastMessage}</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="ml-auto pl-3">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        <span className="font-medium">Periskope</span>
                    </h2>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Complete your profile
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Set up your profile to get started with Periskope
                </p>
            </div>

            {loading ? (
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
                    </div>
                </div>
            ) : (
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700">
                                    Avatar URL (optional)
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="avatar_url"
                                        name="avatar_url"
                                        type="text"
                                        value={avatarUrl}
                                        onChange={(e) => setAvatarUrl(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>
                                <div>
                                    <p className="mt-2 text-center text-sm text-gray-500">or</p>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="avatar_file" className="block text-sm font-medium text-gray-700">
                                        Upload an image (coming soon)
                                    </label>
                                    <input
                                        id="avatar_file"
                                        name="avatar_file"
                                        type="file"
                                        disabled
                                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black cursor-not-allowed bg-gray-100"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Image upload functionality will be available soon!</p>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    {loading ? 'Creating profile...' : 'Create Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}