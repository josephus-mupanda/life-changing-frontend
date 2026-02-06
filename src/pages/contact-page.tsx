import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    enquiry: '',
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', location: '', enquiry: '' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Successfully subscribed to our newsletter!');
    setNewsletterEmail('');
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bugesera District, Eastern Province',
      details: 'Nyamata Sector, Rwanda',
      color: 'bg-red-100 text-red-700',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+250 788 123 456',
      details: 'Mon-Fri: 8:00 AM - 5:00 PM',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+250 788 123 456',
      details: 'Quick response available',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@lceo.org',
      details: 'We reply within 24 hours',
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'hover:text-blue-700' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We'd Love to Hear From You
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you want to support our mission, partner with us, or learn more about our programs,
              we're here to connect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <Card key={info.label} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className={`w-14 h-14 rounded-lg ${info.color} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold mb-2">{info.label}</h3>
                  <p className="font-semibold text-[#4c9789]">{info.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{info.details}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Contact Form & Map */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-2 border-[#4c9789]/20">
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+250 ..."
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <Label htmlFor="enquiry">Your Message/Enquiry *</Label>
                  <Textarea
                    id="enquiry"
                    value={formData.enquiry}
                    onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-[#4c9789] hover:bg-[#3d7a6e]">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            {/* Google Map Embed */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127267.34374094!2d30.0445524!3d-2.1289774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6f2bb3b3b3b%3A0x1234567890abcdef!2sBugesera%20District%2C%20Rwanda!5e0!3m2!1sen!2s!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="LCEO Location"
                    className="absolute inset-0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="bg-[#4c9789]/5 border-[#4c9789]/20">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center transition-colors ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-br from-[#4c9789] to-[#3d7a6e] py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-0 bg-white">
            <CardContent className="pt-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground">
                  Stay updated with our latest programs, success stories, and impact reports
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" className="bg-[#4c9789] hover:bg-[#3d7a6e]">
                  Subscribe
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Emergency Support Line</h3>
                <p className="text-muted-foreground mb-2">
                  If you or someone you know needs immediate assistance regarding safety, 
                  protection, or urgent support:
                </p>
                <p className="font-bold text-xl text-[#4c9789]">+250 788 EMERGENCY (24/7)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Available for beneficiaries and community members in crisis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}