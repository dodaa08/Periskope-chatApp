"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
            {/* Decorative shapes */}
            <motion.div 
                className="absolute -top-24 -right-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.75, 0.7],
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-60"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.7, 0.6],
                }}
                transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1 
                            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            Communication <span className="font-medium">reimagined</span> for modern teams
                        </motion.h1>
                        
                        <motion.p 
                            className="mt-6 text-xl text-gray-600 max-w-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                        >
                            Periskope elevates your team's conversations with seamless real-time chat, 
                            intuitive organization, and powerful search—all with enterprise-grade security.
                        </motion.p>
                        
                        <motion.div 
                            className="mt-10 flex flex-wrap gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                        >
                            <motion.div whileTap={{ scale: 0.98 }}>
                                <Link 
                                    href="/" 
                                    className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
                                >
                                    Get Started Free
                                </Link>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.98 }}>
                                <Link 
                                    href="#how-it-works" 
                                    className="px-8 py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors text-sm font-medium"
                                >
                                    See How It Works 
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    
                    {/* Chat UI Preview */}
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <motion.div 
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Chat UI simulation */}
                            <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4">
                                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <div className="mx-auto text-sm text-gray-500 font-medium">Periskope Chat</div>
                            </div>
                            <div className="p-4 h-80 bg-gradient-to-br from-gray-50 to-white">
                                {/* Chat bubbles */}
                                <motion.div 
                                    className="flex mb-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0"></div>
                                    <div className="ml-3 bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none max-w-xs">
                                        <p className="text-sm text-gray-800">Hey team! Has anyone started on the new design?</p>
                                    </div>
                                </motion.div>
                                <motion.div 
                                    className="flex justify-end mb-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1, duration: 0.5 }}
                                >
                                    <div className="mr-3 bg-black px-4 py-2 rounded-2xl rounded-tr-none max-w-xs">
                                        <p className="text-sm text-white">I'm working on it now. Will share mockups by EOD.</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0"></div>
                                </motion.div>
                                <motion.div 
                                    className="flex mb-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0"></div>
                                    <div className="ml-3 bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none max-w-xs">
                                        <p className="text-sm text-gray-800">Perfect timing! The client just asked for an update.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                        
                        {/* Floating elements */}
                        <motion.div 
                            className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-500 rounded-xl"
                            
                            transition={{ repeat: Infinity, duration: 6 }}
                        />
                        <motion.div 
                            className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500 rounded-full"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.7, 0.9, 0.7]
                            }}
                            transition={{ repeat: Infinity, duration: 4 }}
                        />
                    </motion.div>
                </div>
                
                {/* Stats */}
                <motion.div 
                    className="mt-16 grid grid-cols-3 gap-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.7 }}
                >
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <p className="text-3xl font-medium">99.9%</p>
                        <p className="text-sm text-gray-500">Uptime</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <p className="text-3xl font-medium">5000+</p>
                        <p className="text-sm text-gray-500">Active users</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <p className="text-3xl font-medium">10000+</p>
                        <p className="text-sm text-gray-500">Messages sent daily</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}