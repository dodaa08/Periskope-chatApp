"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Howitworks() {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl md:text-4xl text-gray-900 font-light mb-4">See <span className="font-medium">Periskope</span> in action</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Watch how our platform simplifies team communication and collaboration
                    </p>
                </motion.div>
                
                <motion.div 
                    className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    whileHover={{ 
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        scale: 1.01
                    }}
                >
                    {/* Video embed - replace the src with your actual video URL */}
                    <iframe 
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Periskope Demo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
                
                <motion.div 
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <p className="text-gray-600 mb-6">
                        Ready to transform how your team communicates?
                    </p>
                    <motion.div
                       
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link 
                            href="/" 
                            className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
                        >
                            Start Free Trial
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}