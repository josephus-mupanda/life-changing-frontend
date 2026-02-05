import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  GraduationCap, 
  Briefcase, 
  HeartPulse, 
  Shield, 
  DollarSign, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Target,
  Lightbulb,
  PackageOpen
} from 'lucide-react';
import { mockPrograms } from '../lib/mock-data';

export function HowWeWorkPage() {
  const programs = [
    {
      id: 1,
      title: "Girls' School Retention & Protection",
      description: "Comprehensive support to keep vulnerable girls in school and protected from harm",
      icon: GraduationCap,
      color: "bg-blue-500",
      subPrograms: [
        {
          name: "Pad Box Initiative",
          description: "Providing menstrual hygiene products to keep girls in school during their periods"
        },
        {
          name: "School Facilitation",
          description: "Covering school fees, materials, and uniforms for vulnerable girls"
        },
        {
          name: "Girl's Safe Spaces",
          description: "Creating protected environments for healing, learning, and growth"
        }
      ]
    },
    {
      id: 2,
      title: "IkiraroBiz – Skills Development & Entrepreneurship",
      description: "A graduation approach helping beneficiaries transition from dependence to self-sufficiency",
      icon: Briefcase,
      color: "bg-green-500",
      subPrograms: [
        {
          name: "Business Skills Training",
          description: "Teaching foundational business management and financial literacy"
        },
        {
          name: "Seed Capital Support",
          description: "Providing startup funds to launch sustainable businesses"
        },
        {
          name: "Mentorship & Coaching",
          description: "Ongoing guidance from successful entrepreneurs and business coaches"
        }
      ]
    },
    {
      id: 3,
      title: "Human Capital Development & Mental Resilience",
      description: "Building inner strength, confidence, and psychological wellbeing",
      icon: HeartPulse,
      color: "bg-pink-500",
      subPrograms: [
        {
          name: "Mindset Transformation",
          description: "Shifting limiting beliefs to unlock potential and agency"
        },
        {
          name: "Psychosocial Support",
          description: "Trauma-informed counseling and mental health services"
        },
        {
          name: "Leadership Development",
          description: "Cultivating confident leaders and change agents"
        }
      ]
    }
  ];

  const interventionAreas = [
    {
      title: "Education & School Retention",
      description: "Ensuring girls complete their education through financial support, mentoring, and safe learning environments",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "SRHR & Menstrual Health",
      description: "Providing sexual and reproductive health education, menstrual hygiene products, and healthcare access",
      icon: HeartPulse,
      color: "bg-pink-100 text-pink-700"
    },
    {
      title: "Gender & Protection",
      description: "Creating safe spaces, addressing gender-based violence, and challenging harmful norms",
      icon: Shield,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Economic Empowerment & Livelihoods",
      description: "Skills training, business incubation, seed capital, and market linkages for sustainable income",
      icon: DollarSign,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Human Capital & Resilience",
      description: "Mindset shift programs, psychosocial support, and leadership development",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Emergency Response",
      description: "Rapid assistance during crises including food aid, medical support, and protection services",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-700"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              How We Work
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Approach to Lasting Change
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We combine proven methodologies with community-driven solutions to create sustainable 
              transformation in the lives of vulnerable young women and girls.
            </p>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
            Our Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Program Approach</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each program is designed to address specific needs while contributing to holistic transformation
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card key={program.id} className="hover:shadow-xl transition-shadow border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 ${program.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                      <CardDescription className="text-base">{program.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    {program.subPrograms.map((sub, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-sm">{sub.name}</h4>
                        <p className="text-xs text-muted-foreground">{sub.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-6 w-full sm:w-auto" asChild>
                    <Link to="/programs">
                      View Program Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Areas of Intervention */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Areas of Intervention
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where We Focus Our Efforts</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Addressing root causes through targeted, evidence-based interventions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {interventionAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Card key={area.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-14 h-14 rounded-lg ${area.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Our Methodology
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The LCEO Process</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-[#4c9789]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#4c9789]" />
                  Needs Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We begin by deeply understanding the context, challenges, and aspirations of our beneficiaries 
                  through community consultations and baseline surveys.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#4c9789]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4c9789]" />
                  Participatory Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Programs are co-created with beneficiaries and communities to ensure relevance, 
                  ownership, and cultural appropriateness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#4c9789]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PackageOpen className="w-5 h-5 text-[#4c9789]" />
                  Integrated Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Multiple interventions work together - education support, mental health services, 
                  and economic empowerment - addressing interconnected challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#4c9789]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#4c9789]" />
                  Continuous Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regular tracking, feedback loops, and adaptive management ensure programs stay 
                  effective and responsive to changing needs.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-[#4c9789] hover:bg-[#3d7a6e]" asChild>
              <Link to="/strategic-direction">
                Learn About Our Strategic Framework <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowWeWorkPage;