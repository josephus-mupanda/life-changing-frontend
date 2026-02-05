import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, GraduationCap, Briefcase, Heart, TrendingUp, Award } from 'lucide-react';
import { Progress } from '../components/ui/progress';

export function ImpactStoriesPage() {
  const impactStats = [
    {
      icon: Users,
      label: 'Women and Girls Reached',
      value: '312+',
      color: 'bg-teal-100 text-teal-700',
      description: 'Vulnerable young women and girls supported',
    },
    {
      icon: GraduationCap,
      label: 'Girls Supported to Remain in School',
      value: '156',
      color: 'bg-blue-100 text-blue-700',
      description: 'Through school facilitation and protection programs',
    },
    {
      icon: Briefcase,
      label: 'Businesses Launched',
      value: '89',
      color: 'bg-green-100 text-green-700',
      description: 'Women entrepreneurs supported through IkiraroBiz',
    },
    {
      icon: Award,
      label: 'Change Champions Trained',
      value: '124',
      color: 'bg-purple-100 text-purple-700',
      description: 'Leaders empowered through human capital development',
    },
  ];

  const sdgGoals = [
    { number: 1, title: 'No Poverty', progress: 78 },
    { number: 3, title: 'Good Health and Well-being', progress: 85 },
    { number: 4, title: 'Quality Education', progress: 92 },
    { number: 5, title: 'Gender Equality', progress: 88 },
    { number: 8, title: 'Decent Work and Economic Growth', progress: 75 },
    { number: 10, title: 'Reduced Inequalities', progress: 82 },
  ];

  const testimonials = [
    {
      name: 'Uwera Grace',
      age: 19,
      program: 'IkiraroBiz',
      quote: 'LCEO transformed my life. From struggling to survive, I now run my own tailoring business and support my younger siblings through school. The mentorship and seed capital gave me hope and opportunity.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1080',
    },
    {
      name: 'Mukamana Sarah',
      age: 17,
      program: 'Girls School Retention',
      quote: 'Thanks to the Pad Box Initiative and safe spaces, I can attend school with dignity. LCEO didn\'t just provide supplies; they gave me confidence and a supportive community.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1080',
    },
    {
      name: 'Ineza Divine',
      age: 21,
      program: 'Human Capital Development',
      quote: 'The mindset transformation sessions helped me heal from trauma and believe in myself again. Today, I mentor younger girls and advocate for women\'s rights in my community.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1080',
    },
  ];

  const successMetrics = [
    {
      category: 'Education',
      metrics: [
        { label: 'School retention rate', value: '94%', trend: '+12%' },
        { label: 'Girls completing secondary', value: '87%', trend: '+18%' },
        { label: 'Pad boxes distributed', value: '1,240', trend: '+340' },
      ],
    },
    {
      category: 'Economic Empowerment',
      metrics: [
        { label: 'Average income increase', value: '210%', trend: '+65%' },
        { label: 'Business survival rate', value: '82%', trend: '+15%' },
        { label: 'Jobs created', value: '267', trend: '+89' },
      ],
    },
    {
      category: 'Health & Protection',
      metrics: [
        { label: 'SRHR sessions attended', value: '2,450', trend: '+620' },
        { label: 'Safe space participation', value: '95%', trend: '+8%' },
        { label: 'Mental health support', value: '312', trend: '+156' },
      ],
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#4c9789] text-white">
              Impact & Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Lives, Building Futures
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every statistic represents a life changed. Every number tells a story of 
              resilience, growth, and empowerment. See the real impact of LCEO's work.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact By The Numbers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable change across education, entrepreneurship, and empowerment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-14 h-14 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-4xl font-bold mb-2 text-[#4c9789]">{stat.value}</div>
                  <h3 className="font-bold mb-1">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Voices of Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from beneficiaries who have overcome challenges and built new futures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((story) => (
              <Card key={story.name} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#eacfa2]"
                    />
                    <h3 className="font-bold text-lg text-center">{story.name}, {story.age}</h3>
                    <Badge className="mx-auto block w-fit mt-2 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
                      {story.program}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Metrics */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Performance</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tracking key performance indicators across all program areas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {successMetrics.map((area) => (
            <Card key={area.category} className="border-2 border-[#4c9789]/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6 text-[#4c9789]">{area.category}</h3>
                <div className="space-y-4">
                  {area.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{metric.value}</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="bg-gradient-to-br from-[#4c9789]/5 to-[#eacfa2]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Global Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our work directly contributes to achieving the global 2030 Agenda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sdgGoals.map((goal) => (
              <Card key={goal.number} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#4c9789] to-[#4c9789]/70 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {goal.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-3">{goal.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Source Note */}
      <section className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-[#4c9789]/20 bg-[#4c9789]/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-[#4c9789] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Impact Measurement & Evaluation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All impact data is collected through our partnership with <strong>Kobo Toolbox</strong> 
                  and verified by our Monitoring & Evaluation team. We maintain rigorous standards for 
                  data collection, beneficiary privacy, and transparent reporting. Impact metrics are 
                  updated quarterly and reviewed by external evaluators annually.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
