import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Heart, 
  Users, 
  Briefcase, 
  GraduationCap, 
  HandHeart,
  Share2,
  DollarSign,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router';

export function GetInvolvedPage() {
  const ways = [
    {
      icon: Heart,
      title: 'Join Our Impact Circle',
      description: 'Become a monthly donor and provide sustained support that transforms lives.',
      benefits: [
        'Regular impact updates',
        'Annual beneficiary progress reports',
        'Invitation to exclusive events',
        'Tax-deductible receipts',
      ],
      cta: 'Start Monthly Giving',
      link: '/donate',
      color: 'bg-red-100 text-red-700',
    },
    {
      icon: DollarSign,
      title: 'Make a One-Time Donation',
      description: 'Every contribution, big or small, makes a real difference in the lives of vulnerable girls.',
      benefits: [
        'Choose specific programs to support',
        'Immediate impact',
        'Transparent fund allocation',
        'Digital receipt',
      ],
      cta: 'Donate Now',
      link: '/donate',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: Briefcase,
      title: 'Corporate Partnership',
      description: 'Partner with LCEO to amplify your CSR impact and empower the next generation.',
      benefits: [
        'Co-branded initiatives',
        'Employee engagement opportunities',
        'Impact measurement & reporting',
        'Brand visibility',
      ],
      cta: 'Explore Partnership',
      link: '/contact',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Users,
      title: 'Volunteer Your Time',
      description: 'Share your skills and expertise to mentor, train, or support our programs.',
      benefits: [
        'Mentorship opportunities',
        'Skills-based volunteering',
        'Training facilitation',
        'Community engagement',
      ],
      cta: 'Apply to Volunteer',
      link: '/contact',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: GraduationCap,
      title: 'Sponsor a Beneficiary',
      description: 'Directly support a girl\'s education, business, or personal development journey.',
      benefits: [
        'Personal connection with beneficiary',
        'Progress updates & photos',
        'Letter exchanges',
        'Lasting impact',
      ],
      cta: 'Sponsor a Girl',
      link: '/contact',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      icon: Share2,
      title: 'Spread the Word',
      description: 'Amplify our mission by sharing our story on social media and in your networks.',
      benefits: [
        'Social media toolkit',
        'Shareable content',
        'Ambassador program',
        'Community building',
      ],
      cta: 'Become an Advocate',
      link: '/contact',
      color: 'bg-teal-100 text-teal-700',
    },
  ];

  const impactLevels = [
    {
      amount: '$25/month',
      impact: 'Provides menstrual hygiene kits for 5 girls for a month',
      supporters: 124,
    },
    {
      amount: '$50/month',
      impact: 'Supports one girl\'s school fees and supplies for a term',
      supporters: 89,
    },
    {
      amount: '$100/month',
      impact: 'Provides seed capital for one woman entrepreneur',
      supporters: 56,
    },
    {
      amount: '$250/month',
      impact: 'Fully sponsors one beneficiary through our complete program',
      supporters: 23,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Be Part of the Change
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              There are many ways to support LCEO's mission to empower vulnerable young women 
              and girls in Rwanda. Find the perfect way for you to make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ways to Support Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the way that resonates with you most
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ways.map((way) => {
            const Icon = way.icon;
            return (
              <Card key={way.title} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-lg ${way.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{way.title}</h3>
                  <p className="text-muted-foreground mb-4">{way.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {way.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4c9789] mt-1.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full bg-[#4c9789] hover:bg-[#3d7a6e]">
                    <Link to={way.link}>{way.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Impact Levels */}
      <section className="bg-gradient-to-br from-[#4c9789]/5 to-[#eacfa2]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
                Monthly Giving
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Monthly Impact
              </h2>
              <p className="text-xl text-muted-foreground">
                See how your recurring support transforms lives
              </p>
            </div>

            <div className="space-y-6">
              {impactLevels.map((level) => (
                <Card key={level.amount} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-[#4c9789]">{level.amount}</span>
                          <Badge className="bg-[#eacfa2] text-[#4c9789]">
                            {level.supporters} supporters
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{level.impact}</p>
                      </div>
                      <Button asChild className="bg-[#4c9789] hover:bg-[#3d7a6e]">
                        <Link to="/donate">Select</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" variant="outline" className="border-[#4c9789] text-[#4c9789] hover:bg-[#4c9789] hover:text-white">
                <Link to="/donate">Custom Amount</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-[#4c9789]/20 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#4c9789] text-white p-8 flex flex-col justify-center">
                <HandHeart className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Volunteer With Us</h3>
                <p className="mb-4">
                  We're looking for passionate individuals to volunteer in:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Mentorship & coaching</li>
                  <li>• Business training & development</li>
                  <li>• Educational support</li>
                  <li>• Community outreach</li>
                  <li>• Data & M&E support</li>
                </ul>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h4 className="font-bold text-lg mb-3">Requirements:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Minimum 3-month commitment</li>
                  <li>• Relevant skills or experience</li>
                  <li>• Passion for women's empowerment</li>
                  <li>• Fluency in English or Kinyarwanda</li>
                </ul>
                <Button asChild className="bg-[#4c9789] hover:bg-[#3d7a6e]">
                  <Link to="/contact">Apply Now</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Corporate Partnerships */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Corporate Social Responsibility
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Partner with LCEO to create meaningful impact while achieving your CSR goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4c9789]/10 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-[#4c9789]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Strategic Partnerships</h3>
                  <p className="text-muted-foreground text-sm">
                    Long-term collaborations aligned with your business values and impact goals
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4c9789]/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#4c9789]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Employee Engagement</h3>
                  <p className="text-muted-foreground text-sm">
                    Volunteer days, skills-sharing, and team-building activities with purpose
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4c9789]/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-[#4c9789]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Event Sponsorship</h3>
                  <p className="text-muted-foreground text-sm">
                    Support graduations, workshops, and community events with brand visibility
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-[#4c9789] hover:bg-[#3d7a6e]">
                <Link to="/contact">Discuss Partnership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#4c9789] to-[#3d7a6e] text-white border-0">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join hundreds of supporters transforming lives in Rwanda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#eacfa2] text-[#4c9789] hover:bg-[#d4b886]">
                <Link to="/donate">Donate Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}