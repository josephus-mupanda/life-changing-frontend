import { Users, Target, Heart, Lightbulb, Shield, HandHeart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We believe in the inherent potential of every young woman and girl.',
      color: 'bg-red-100 text-red-700',
    },
    {
      icon: Shield,
      title: 'Protection',
      description: 'Creating safe spaces where girls can heal, grow, and thrive.',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Using evidence-based approaches to create lasting change.',
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      icon: HandHeart,
      title: 'Compassion',
      description: 'Walking alongside beneficiaries with empathy and respect.',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building networks of support and sustainable transformation.',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to measurable impact and continuous improvement.',
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  const team = [
    {
      name: 'Sarah Mugabo',
      role: 'Executive Director',
      bio: 'Passionate about empowering young women with over 15 years of experience in development work.',
      image: '👩🏾‍💼',
    },
    {
      name: 'Jean Paul Uwimana',
      role: 'Program Manager',
      bio: 'Expert in education and youth development programs across Rwanda.',
      image: '👨🏾‍💼',
    },
    {
      name: 'Grace Mutesi',
      role: 'Finance Director',
      bio: 'Ensuring financial transparency and accountability in all operations.',
      image: '👩🏾‍💼',
    },
    {
      name: 'Emmanuel Nkusi',
      role: 'M&E Specialist',
      bio: 'Data-driven approach to measuring and improving program impact.',
      image: '👨🏾‍💼',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'LCEO Founded',
      description: 'Established in Bugesera District with a vision to transform lives.',
    },
    {
      year: '2021',
      title: 'First Program Launch',
      description: 'Girls School Retention program reaches 50 beneficiaries.',
    },
    {
      year: '2022',
      title: 'IkiraroBiz Initiative',
      description: 'Entrepreneurship program launched, supporting 30 young women.',
    },
    {
      year: '2023',
      title: 'Major Expansion',
      description: 'Programs scaled to reach 200+ beneficiaries across multiple sectors.',
    },
    {
      year: '2024',
      title: 'Recognition & Growth',
      description: 'Partnership with FAWE Rwanda, now serving 312 beneficiaries.',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              About LCEO
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Lives Through Empowerment
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Life-Changing Endeavor Organization (LCEO) is a non-governmental organization
              dedicated to empowering vulnerable young women and girls in Bugesera District, Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 border-primary/20 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Society where young women and girls are mentally strong, Educated and
                economically empowered - free to lead and thrive.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/30 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To walk alongside girls and women as they heal, grow and thrive - through
                mindset shift and mental resilience, education and economic empowerment.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision and action we take
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-14 h-14 rounded-lg ${value.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated professionals working to create lasting change
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member) => (
            <Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center text-5xl">
                  {member.image}
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones & Achievements</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/20 mt-4" />
                    )}
                  </div>
                  <Card className="flex-1 mb-4">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
          <CardContent className="py-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">312+</div>
                <p className="text-white/80">Lives Transformed</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">4</div>
                <p className="text-white/80">Active Programs</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">5+</div>
                <p className="text-white/80">Years of Impact</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <p className="text-white/80">Commitment to Change</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
