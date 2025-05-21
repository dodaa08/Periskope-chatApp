import Header from "@/app/components/Landing/Header"
import Hero from "@/app/components/Landing/Hero"
import Features from "@/app/components/Landing/Features"
import Howitworks from "@/app/components/Landing/Howitworks"
import Pricing from "@/app/components/Landing/Pricing"
import Footer from "@/app/components/Landing/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <div className="mt-20">
          <Features />
        </div>
        <div className="mt-20">
          <Howitworks />
        </div>
        <div className="mt-20">
          <Pricing />
        </div>
        {/* Add more landing page sections here as needed */}
      </main>
      <Footer />
    </div>
  )
}