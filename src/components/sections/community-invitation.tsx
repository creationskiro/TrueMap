"use client"

import { motion } from "framer-motion"
import { Github, Smartphone, Code2, Users2 } from "lucide-react"

export function CommunityInvitation() {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Copy: The Mission */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-400 text-sm font-mono tracking-wider mb-6">
                                OPEN SOURCE INITIATIVE
                            </span>
                            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6 leading-tight">
                                Build the Future of Spatial Computing.
                            </h2>
                            <p className="text-lg text-slate-300 mb-6">
                                The TrueMap core engine is open-source. To map the "99% of unmapped indoor spaces" globally, we need developers to put the scanning technology directly into people's hands.
                            </p>
                            <p className="text-lg text-slate-300 font-medium">
                                We are actively recruiting React Native (Expo) and iOS/Android developers to build the TrueMap Mobile Scanner.
                            </p>
                        </motion.div>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="h-10 w-10 rounded-lg bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Smartphone className="h-5 w-5" />
                                </div>
                                <span className="font-mono text-sm">Build the AR Scanner (React Three Fiber)</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="h-10 w-10 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Code2 className="h-5 w-5" />
                                </div>
                                <span className="font-mono text-sm">Contribute to the Core Mapping Engine</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="h-10 w-10 rounded-lg bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Users2 className="h-5 w-5" />
                                </div>
                                <span className="font-mono text-sm">Join the Developer Core Team</span>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="https://github.com/creationskiro/TrueMap"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                Contribute on GitHub
                            </a>
                            <a
                                href="https://github.com/creationskiro/TrueMap/blob/main/INVITATION.md"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-colors"
                            >
                                Read the Manifesto
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Visual: Code/Community Mockup */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl shadow-blue-900/20 flex flex-col h-full"
                        >
                            {/* Mac Window Header */}
                            <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                <div className="flex-1 flex justify-center">
                                    <span className="text-xs font-mono text-slate-500">truemap-mobile — App.tsx</span>
                                </div>
                            </div>

                            {/* Code Payload */}
                            <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden relative">
                                <div className="text-blue-400">import <span className="text-slate-300">&#123; Canvas, useFrame &#125;</span> from <span className="text-emerald-400">'@react-three/fiber/native'</span>;</div>
                                <div className="text-blue-400 mt-1">import <span className="text-slate-300">&#123; GLView &#125;</span> from <span className="text-emerald-400">'expo-gl'</span>;</div>
                                <br />
                                <div className="text-slate-500 italic">// Join the community to build the AR engine</div>
                                <div className="text-purple-400">export default function <span className="text-yellow-200">TrueMapScanner</span>() &#123;</div>
                                <div className="pl-4 text-slate-300">const cameraRef = <span className="text-blue-300">useRef</span>(null);</div>
                                <div className="pl-4 text-slate-300 mt-2">return (</div>
                                <div className="pl-8 text-slate-400">&lt;<span className="text-blue-400">Canvas</span>&gt;</div>
                                <div className="pl-12 text-slate-400">&lt;<span className="text-blue-400">ambientLight</span> intensity=&#123;<span className="text-orange-300">0.5</span>&#125; /&gt;</div>
                                <div className="pl-12 text-slate-400">&lt;<span className="text-blue-400">ARCameraRenderer</span> ref=&#123;cameraRef&#125; /&gt;</div>
                                <div className="pl-12 text-slate-500 italic">// TODO: Implement point-cloud generation</div>
                                <div className="pl-12 text-slate-400">&lt;<span className="text-blue-400">PointCloudMesh</span> /&gt;</div>
                                <div className="pl-8 text-slate-400">&lt;/<span className="text-blue-400">Canvas</span>&gt;</div>
                                <div className="pl-4 text-slate-300">);</div>
                                <div className="text-purple-400">&#125;</div>

                                {/* Glowing gradient overlay at bottom to imply more code */}
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
