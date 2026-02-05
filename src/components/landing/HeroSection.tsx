import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="African students in classroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4c9789]/90 to-[#4c9789]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
            <span className="text-2xl font-bold tracking-wider">LCEO</span>
          </div>
        </div>

        {/* Bold Mission Statement */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Unlocking Potential,<br />
          Empowering Lives
        </h1>
        
        {/* Introduction */}
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/95 leading-relaxed">
          Life-Changing Endeavor Organization (LCEO) is a non-governmental organization based in 
          Bugesera District, Rwanda, dedicated to transforming the lives of vulnerable young women 
          and girls by addressing the root causes of poverty, exploitation, and social exclusion.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="bg-[#eacfa2] text-[#4c9789] hover:bg-[#d4b886] font-semibold text-lg px-8 py-6 rounded-full shadow-xl">
            <Link to="/donate">
              <span className="flex items-center gap-2">
                Join Our Impact Circle
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-sm">
            <Link to="/about">
              Learn More
              <ChevronDown className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </div>
    </div>
  );
}