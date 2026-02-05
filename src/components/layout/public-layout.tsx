import { Footer } from "@/components/landing/Footer";
import { Link, Outlet, useLocation } from "react-router";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
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
import { ScrollToTop } from "@/components/scroll-to-top";
import { motion, AnimatePresence } from "motion/react";

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/how-we-work", label: "How We Work" },
    { to: "/strategic-direction", label: "Strategic Direction" },
    { to: "/impact", label: "Impact & Stories" },
    { to: "/resources", label: "Resources" },
    { to: "/get-involved", label: "Get Involved" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-b sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-sm">L</span>
            </motion.div>
            <span className="text-2xl font-bold text-teal-900 tracking-tight group-hover:text-teal-700 transition-colors">LCEO</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`hover:text-teal-600 transition-all duration-200 relative group ${
                  location.pathname === link.to ? 'text-teal-600' : ''
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full ${
                  location.pathname === link.to ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50 hidden md:flex transition-all duration-200">
              <Link to="/login">Login</Link>
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-gradient-to-r from-sand-600 to-sand-700 text-teal-900 hover:from-sand-700 hover:to-sand-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/donate">Donate</Link>
              </Button>
            </motion.div>
            
            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-teal-50">
                  <Menu className="h-6 w-6 text-teal-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-b from-white to-teal-50/30">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        to={link.to} 
                        className={`text-lg font-medium hover:text-teal-600 transition-colors block py-2 px-3 rounded-lg hover:bg-teal-50 ${
                          location.pathname === link.to ? 'text-teal-600 bg-teal-50' : 'text-gray-700'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="border-t pt-4 mt-4 space-y-3">
                    <Link 
                      to="/login" 
                      className="text-lg font-medium text-gray-700 hover:text-teal-600 transition-colors block py-2 px-3 rounded-lg hover:bg-teal-50" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Button asChild className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg">
                      <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                        Donate Now
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}