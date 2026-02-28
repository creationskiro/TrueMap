import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { ProblemStatement } from "@/components/sections/problem"
import { ShieldCheck, Map, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Super Minimal Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono font-bold text-xl text-slate-900 tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Map className="w-5 h-5" />
            </div>
            TrueMap
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Platform</a>
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#enterprise" className="hover:text-blue-600 transition-colors">Enterprise</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Sign In</a>
            <a href="/register" className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-slate-900/90">
              Get API Key
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <ProblemStatement />
        <Features />

        {/* Call to Action Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-6">Ready to map the physical world?</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">Start building the future of indoor navigation today. Access our spatial SDKs, community models, and computer vision API.</p>
            <a href="/register" className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-medium text-blue-600 shadow transition-colors hover:bg-slate-50 hover:scale-105 active:scale-95 duration-200">
              Join the TrueMap Beta
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 font-mono font-bold text-xl text-slate-900">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Map className="w-5 h-5" />
                </div>
                TrueMap
              </div>
              <p className="text-sm text-slate-500 max-w-sm">
                ZTXO ARTLFY PRIVATE LIMITED<br />
                "Where Google Maps Ends, TrueMap Begins."<br />
                1st Floor, Old Argora, Ranchi, Jharkhand - 834002
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-4">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Govt. Digital India / Smart City Aligned
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">3D Indoor Mapping</a></li>
                <li><a href="#" className="hover:text-blue-600">AI Directives</a></li>
                <li><a href="#" className="hover:text-blue-600">AR/VR SDKs</a></li>
                <li><a href="#" className="hover:text-blue-600">Enterprise Solutions</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Investors</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ZTXO ARTLFY PRIVATE LIMITED. All rights reserved. CIN: U46900JH2024PTC022605
          </div>
        </div>
      </footer>
    </div>
  )
}
