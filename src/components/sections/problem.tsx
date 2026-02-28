"use client"

import { motion } from "framer-motion"
import { ScanFace, Target, Navigation } from "lucide-react"
import { CrossSectionDemo } from "@/components/ui/cross-section-demo"

export function ProblemStatement() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl md:text-5xl font-mono font-bold text-slate-900 mb-6 leading-tight">
                                99% of global indoor spaces remain <span className="text-blue-600 underline decoration-blue-200">unmapped</span>.
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Traditional mapping platforms drop you at the front door. At complex venues like airports, hospitals, university campuses, and smart cities, getting to the building is only half the journey.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex items-start"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100">
                                        <Target className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-xl font-bold font-mono text-slate-900">The Core Problem</h3>
                                    <p className="mt-2 text-slate-600">Reliance on physical signage and fragmented digital solutions causes immense time wastage, patient distress in hospitals, and missed retail opportunities.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-start"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                                        <Navigation className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-xl font-bold font-mono text-slate-900">The TrueMap Solution</h3>
                                    <p className="mt-2 text-slate-600">A community-driven pipeline capable of instantly mapping and sharing 3D environments, bypassing the need for expensive hardware or enterprise infrastructure.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-[4/3] bg-slate-100 border border-slate-200 shadow-xl"
                        >
                            <CrossSectionDemo />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
