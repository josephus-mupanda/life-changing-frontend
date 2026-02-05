import { Footer } from "@/components/landing/Footer";
import { Link, Outlet } from "react-router";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="border-b sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#4c9789] flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-2xl font-bold text-[#4c9789] tracking-tight">LCEO</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-[#4c9789] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#4c9789] transition-colors">About Us</Link>
            <Link to="/how-we-work" className="hover:text-[#4c9789] transition-colors">How We Work</Link>
            <Link to="/strategic-direction" className="hover:text-[#4c9789] transition-colors">Strategic Direction</Link>
            <Link to="/impact" className="hover:text-[#4c9789] transition-colors">Impact & Stories</Link>
            <Link to="/resources" className="hover:text-[#4c9789] transition-colors">Resources</Link>
            <Link to="/get-involved" className="hover:text-[#4c9789] transition-colors">Get Involved</Link>
            <Link to="/contact" className="hover:text-[#4c9789] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-[#4c9789] hover:text-[#3d7a6e] hover:bg-[#4c9789]/10 hidden md:flex">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-[#eacfa2] text-[#4c9789] hover:bg-[#d4b886] font-semibold">
              <Link to="/donate">Donate</Link>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/about" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </Link>
                  <Link to="/how-we-work" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    How We Work
                  </Link>
                  <Link to="/strategic-direction" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Strategic Direction
                  </Link>
                  <Link to="/programs" className="text-lg font-medium hover:text-[#4c9789] transition-colors ml-4" onClick={() => setMobileMenuOpen(false)}>
                    Programs
                  </Link>
                  <Link to="/impact" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Impact & Stories
                  </Link>
                  <Link to="/resources" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Resources
                  </Link>
                  <Link to="/get-involved" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Get Involved
                  </Link>
                  <Link to="/contact" className="text-lg font-medium hover:text-[#4c9789] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Link>
                  <div className="border-t pt-4 mt-4">
                    <Link to="/login" className="text-lg font-medium hover:text-[#4c9789] transition-colors block mb-3" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}