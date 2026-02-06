import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-[#2c5f56] to-[#1e4139] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-white/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="mb-6 text-white/90">
              Subscribe to our newsletter for updates, impact stories, and ways to get involved
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
              />
              <Button type="submit" className="bg-[#eacfa2] text-[#2c5f56] hover:bg-[#d4b886] font-semibold">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-6">LCEO</h3>
            <p className="mb-6 text-white/90 leading-relaxed">
              Empowering vulnerable young women and girls in Rwanda through education, entrepreneurship, and health programs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#eacfa2] hover:text-[#4c9789] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#eacfa2] hover:text-[#4c9789] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#eacfa2] hover:text-[#4c9789] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#eacfa2] hover:text-[#4c9789] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-[#eacfa2] transition-colors">About Us</Link></li>
              <li><Link to="/how-we-work" className="hover:text-[#eacfa2] transition-colors">How We Work</Link></li>
              <li><Link to="/strategic-direction" className="hover:text-[#eacfa2] transition-colors">Strategic Direction</Link></li>
              <li><Link to="/impact" className="hover:text-[#eacfa2] transition-colors">Impact & Stories</Link></li>
              <li><Link to="/resources" className="hover:text-[#eacfa2] transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-[#eacfa2] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-bold mb-6">Get Involved</h4>
            <ul className="space-y-3">
              <li><Link to="/donate" className="hover:text-[#eacfa2] transition-colors">Donate</Link></li>
              <li><Link to="/get-involved" className="hover:text-[#eacfa2] transition-colors">Monthly Giving</Link></li>
              <li><Link to="/get-involved" className="hover:text-[#eacfa2] transition-colors">Volunteer</Link></li>
              <li><Link to="/get-involved" className="hover:text-[#eacfa2] transition-colors">Partner With Us</Link></li>
              <li><Link to="/programs" className="hover:text-[#eacfa2] transition-colors">Our Programs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#eacfa2] mt-1 flex-shrink-0" />
                <span className="text-sm">Bugesera District, Nyamata Sector<br />Eastern Province, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#eacfa2] flex-shrink-0" />
                <span className="text-sm">+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#eacfa2] flex-shrink-0" />
                <span className="text-sm">info@lceo.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} Life-Changing Endeavor Organization. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}