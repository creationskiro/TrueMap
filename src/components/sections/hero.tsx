"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Map, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import { ThreeDemo } from "@/components/ui/three-demo"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-24 pb-32">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                        Where Google Maps Ends, TrueMap Begins
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 font-mono"
                    >
                        The Future of <span className="text-blue-600">Indoor Navigation</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                    >
                        An AI-powered, community-driven 3D mapping platform. Transform your smartphone into a professional-grade indoor scanner and ensure no one gets lost indoors again.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" className="w-full sm:w-auto text-base">
                            Start Mapping For Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" asChild>
                            <a href="https://github.com/creationskiro/TrueMap" target="_blank" rel="noopener noreferrer">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                Star on GitHub
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-12 flex justify-center gap-8 text-sm text-slate-500"
                    >
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-500" />
                            <span>Enterprise Grade Security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            <span>Instant AI Reconstruction</span>
                        </div>
                    </motion.div>
                </div>

                {/* Abstract 3D Phone Mockup Representation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-20 mx-auto max-w-5xl relative"
                >
                    <div className="aspect-[16/9] bg-slate-50 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative">
                        <ThreeDemo />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
