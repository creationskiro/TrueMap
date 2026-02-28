"use client"

import { motion } from "framer-motion"
import { Smartphone, Users, MessageSquareText, Layers, Cuboid, MonitorSmartphone } from "lucide-react"

const features = [
    {
        icon: <Smartphone className="h-8 w-8 text-blue-500" />,
        title: "3D Indoor Mapping by Users",
        description: "Users can scan and map any indoor space in 3D using their smartphone camera, creating publicly available maps similar to Google Maps but for indoor spaces.",
        problemSolved: "Solves the lack of publicly available indoor navigation systems causing time wastage and confusion in new places like railway stations, airports, and shopping malls."
    },
    {
        icon: <MessageSquareText className="h-8 w-8 text-purple-500" />,
        title: "Community Question-Answer",
        description: "Reddit-style community chat feature where users can ask navigation questions and receive step-by-step guides with integrated indoor maps.",
        problemSolved: "Traditional review systems don't provide practical navigation solutions for real-world problems."
    },
    {
        icon: <MonitorSmartphone className="h-8 w-8 text-indigo-500" />,
        title: "AI-Powered Guides",
        description: "Personal AI assistant for instant queries about locations, providing 3D pinpoint directions and visual guidance.",
        problemSolved: "Enabling quick and accurate location finding through natural language queries."
    },
    {
        icon: <Cuboid className="h-8 w-8 text-cyan-500" />,
        title: "AR/VR Integration",
        description: "Augmented and virtual reality support for real-time navigation visualization on AR devices and automotive systems.",
        problemSolved: "Providing immersive navigation experiences for next-generation devices and autonomous vehicles."
    },
    {
        icon: <Users className="h-8 w-8 text-emerald-500" />,
        title: "Review System",
        description: "Comprehensive rating and review system for places and services to build trust and credibility.",
        problemSolved: "Establishing trust factor and quality assurance for community-generated content."
    },
    {
        icon: <Layers className="h-8 w-8 text-orange-500" />,
        title: "Community Add-ons",
        description: "Third-party app development ecosystem including service booking platforms and digital notice boards for specific locations.",
        problemSolved: "Replacing fragmented local business platforms and providing centralized solutions for location-specific services."
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
                            <p className="relative z-10 text-slate-600 leading-relaxed mb-4">
                                {item.description}
                            </p>
                            <div className="relative z-10 pt-4 border-t border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Problem Solved:</span>
                                <p className="text-sm text-slate-500 italic">"{item.problemSolved}"</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
