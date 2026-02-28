"use client"

import { motion } from "framer-motion"
import { Smartphone, Users, MessageSquareText, Layers, Cuboid, MonitorSmartphone } from "lucide-react"

const features = [
    {
        icon: <Smartphone className="h-8 w-8 text-blue-500" />,
        title: "3D Indoor Mapping",
        description: "Scan any indoor space in real-time using just your smartphone camera. Generate accurate 3D models instantly.",
    },
    {
        icon: <MessageSquareText className="h-8 w-8 text-purple-500" />,
        title: "Community Intelligence",
        description: "Reddit-style community chat. Ask navigation questions and receive step-by-step 3D visual guides.",
    },
    {
        icon: <MonitorSmartphone className="h-8 w-8 text-indigo-500" />,
        title: "AI-Powered Directives",
        description: "Your personal spatial AI assistant. Query natural language instructions for finding exact pinpoint locations indoors.",
    },
    {
        icon: <Cuboid className="h-8 w-8 text-cyan-500" />,
        title: "AR/VR Integration",
        description: "Augmented reality support for on-screen navigation visualization directly mapped onto your physical surroundings.",
    },
    {
        icon: <Users className="h-8 w-8 text-emerald-500" />,
        title: "Credibility & Reviews",
        description: "Establish trust with comprehensive rating systems for locations and community-generated visual maps.",
    },
    {
        icon: <Layers className="h-8 w-8 text-orange-500" />,
        title: "Enterprise Ecosystem",
        description: "Third-party app development including digital notice boards and booking platforms specifically mapped to physical coordinates.",
    }
]

export function Features() {
    return (
        <section className="py-24 bg-slate-50 relative border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-mono font-bold text-slate-900 mb-4"
                    >
                        Democratizing <span className="text-blue-600">Spatial Intelligence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600"
                    >
                        TrueMap provides the tools to solve the 'last-mile' navigation problem. By combining computer vision with community collaboration, we map the unmappable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            {/* Subtle hover gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-colors z-0"></div>

                            <div className="relative z-10 mb-6 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="relative z-10 text-xl font-bold font-mono text-slate-900 mb-3">{item.title}</h3>
                            <p className="relative z-10 text-slate-600 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
