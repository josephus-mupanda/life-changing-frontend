import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Target, 
  Users, 
  Globe, 
  TrendingUp, 
  Heart, 
  Scale,
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';

export function StrategicDirectionPage() {
  const sdgs = [
    { number: 1, title: "No Poverty", color: "bg-red-500" },
    { number: 3, title: "Good Health", color: "bg-green-500" },
    { number: 4, title: "Quality Education", color: "bg-red-600" },
    { number: 5, title: "Gender Equality", color: "bg-orange-500" },
    { number: 8, title: "Decent Work", color: "bg-red-700" },
    { number: 10, title: "Reduced Inequalities", color: "bg-pink-500" }
  ];

  const changeModel = [
    {
      phase: "Individual Level",
      description: "Building agency, confidence, and skills in girls and young women",
      elements: [
        "Mindset transformation and mental resilience",
        "Education access and skills development",
        "Economic literacy and entrepreneurship training"
      ]
    },
    {
      phase: "Relational Level",
      description: "Transforming relationships and social networks",
      elements: [
        "Engaging male champions and family support systems",
        "Peer networks and mentorship circles",
        "Community dialogue on gender norms"
      ]
    },
    {
      phase: "Structural Level",
      description: "Addressing systemic barriers and power dynamics",
      elements: [
        "Partnership with local leaders and institutions",
        "Policy advocacy and systems change",
        "Creating enabling environments for women's empowerment"
      ]
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Strategic Direction
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Path to Sustainable Impact
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              LCEO's strategic direction defines how we understand change, design programs, 
              and align with national and global priorities for sustainable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Our Philosophy
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Foundation for Transformation</h2>
          </div>

          <Card className="border-2 border-[#4c9789]/20 bg-gradient-to-br from-[#4c9789]/5 to-[#eacfa2]/10">
            <CardContent className="pt-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#4c9789] rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg leading-relaxed text-foreground mb-4">
                    LCEO believes that <strong>lasting transformation starts with mindset, identity, and mental resilience</strong>. 
                    We prioritize human capital development through integrated interventions that strengthen confidence, 
                    psychosocial wellbeing, education access, and economic empowerment.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    This approach enables girls and young women to pursue education, achieve economic independence, 
                    and emerge as leaders in their communities. We don't just provide services—we walk alongside 
                    our beneficiaries as partners in their journey of transformation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gender-Transformative Change Model */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Our Change Model
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rugero Rwiza Community Change Model (RR-CCM)
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A gender-transformative framework that addresses root causes of inequality and 
              creates sustainable community-owned change
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="mb-8 border-2 border-[#4c9789]/20">
              <CardContent className="pt-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#4c9789]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-[#4c9789]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">What Makes RR-CCM Different?</h3>
                    <p className="text-muted-foreground">
                      The model actively engages girls and young women alongside local leaders, women and men, 
                      to challenge harmful gender norms, shift power dynamics, and build supportive community environments. 
                      RR-CCM strengthens agency, leadership, and accountability, ensuring that change is owned by 
                      communities and sustained beyond project cycles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              {changeModel.map((phase, index) => (
                <Card key={phase.phase} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-[#4c9789] text-white flex items-center justify-center font-bold text-xl shadow-md">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{phase.phase}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.elements.map((element, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{element}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* National and Global Alignment */}
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
              Strategic Alignment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">National & Global Partnerships</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our work contributes to Rwanda's development goals and global sustainability commitments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-[#4c9789]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4c9789]/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#4c9789]" />
                  </div>
                  Rwanda Vision 2050
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Contributing to Rwanda's long-term development aspirations through:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Human capital development and skills training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Gender equality and women's economic empowerment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Youth employment and entrepreneurship</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#4c9789]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4c9789]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#4c9789]" />
                  </div>
                  NST2 Priorities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Aligned with the National Strategy for Transformation:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Quality education and skills development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Economic transformation and job creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#4c9789] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Social protection and inclusive growth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* SDG Alignment */}
          <Card className="border-2 border-[#4c9789]/20 bg-gradient-to-br from-[#4c9789]/5 to-[#eacfa2]/10">
            <CardHeader>
              <div className="text-center">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl mb-2">
                  <Globe className="w-6 h-6 text-[#4c9789]" />
                  Sustainable Development Goals
                </CardTitle>
                <p className="text-muted-foreground">
                  Our programs directly contribute to achieving these global goals
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sdgs.map((sdg) => (
                  <div key={sdg.number} className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 ${sdg.color} rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-2 shadow-lg`}>
                      {sdg.number}
                    </div>
                    <p className="text-xs font-medium">{sdg.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="bg-gradient-to-br from-[#4c9789] to-[#3d7a6e] text-white border-0 max-w-4xl mx-auto">
          <CardContent className="py-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Join Us in Creating Lasting Change</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Your support enables us to continue implementing evidence-based programs that transform lives 
              and build stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-[#4c9789] hover:bg-white/90" asChild>
                <Link to="/donate">
                  Support Our Work
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/get-involved">
                  Get Involved <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default StrategicDirectionPage;