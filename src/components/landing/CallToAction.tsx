import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Heart, ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#4c9789] to-[#3d7a6e] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Impact Circle</h2>
        <p className="text-xl mb-4 max-w-2xl mx-auto text-white/95">
          Your monthly support provides sustained transformation for vulnerable young women and girls in Rwanda
        </p>
        <p className="text-lg mb-10 max-w-xl mx-auto text-white/80">
          Become a monthly donor and help us create lasting change through education, entrepreneurship, and empowerment
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#eacfa2] text-[#4c9789] hover:bg-[#d4b886] font-bold px-10 py-8 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all">
            <Link to="/donate">
              <span className="flex items-center gap-2">
                Start Monthly Giving
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-8 text-xl rounded-full">
            <Link to="/get-involved">
              Explore Other Ways to Help
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">$25/mo</div>
            <p className="text-sm text-white/90">Supports menstrual hygiene for 5 girls</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">$50/mo</div>
            <p className="text-sm text-white/90">Covers school fees for one girl</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">$100/mo</div>
            <p className="text-sm text-white/90">Provides seed capital for one entrepreneur</p>
          </div>
        </div>
      </div>
    </section>
  );
}