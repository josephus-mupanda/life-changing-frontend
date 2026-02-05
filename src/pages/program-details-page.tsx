import { useParams, useNavigate } from 'react-router';
import { mockPrograms, mockStories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Users, DollarSign, CheckCircle2, Heart } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function ProgramDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = mockPrograms.find(p => p.id === id);

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Program Not Found</h2>
        <Button onClick={() => navigate('/programs')}>Back to Programs</Button>
      </div>
    );
  }

  const stories = mockStories.filter(s => s.program?.id === program.id);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full bg-teal-900">
        <div className="absolute inset-0 opacity-40">
           {program.coverImage && (
             <ImageWithFallback 
                src={program.coverImage} 
                alt={program.name.en}
                className="w-full h-full object-cover"
             />
           )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 text-white">
          <Button 
            variant="ghost" 
            className="text-white hover:text-teal-200 hover:bg-white/10 w-fit mb-6 absolute top-6 left-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Badge className="w-fit mb-4 bg-teal-500 hover:bg-teal-600 text-white border-none">
            {program.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">{program.name.en}</h1>
          <p className="text-xl text-teal-100 max-w-2xl mb-6">{program.description.en}</p>
          
          <div className="flex gap-4">
            <Button size="lg" className="bg-[#eacfa2] text-teal-900 hover:bg-[#d4b886]" onClick={() => navigate('/donate')}>
              Donate to this Program
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Become a Partner
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Overview */}
            <Card>
              <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Date().getFullYear() - program.startDate.getFullYear()}+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Years Active</div>
                </div>
                <div className="text-center border-l">
                  <div className="flex justify-center mb-2">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    120+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Beneficiaries</div>
                </div>
                 <div className="text-center border-l">
                  <div className="flex justify-center mb-2">
                    <CheckCircle2 className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    85%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Success Rate</div>
                </div>
                 <div className="text-center border-l">
                  <div className="flex justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(program.budget)}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Budget</div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent py-3 px-1">Overview</TabsTrigger>
                <TabsTrigger value="approach" className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent py-3 px-1">Our Approach</TabsTrigger>
                <TabsTrigger value="stories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent py-3 px-1">Stories</TabsTrigger>
                <TabsTrigger value="financials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent py-3 px-1">Financials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6 space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-teal-900 mb-4">The Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Many young women in rural Rwanda face significant barriers to economic independence. 
                        Limited access to education, lack of capital, and societal expectations often constrain their potential. 
                        This program specifically targets these systemic issues by providing a comprehensive support structure.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-teal-900 mb-4">Our Solution</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {program.description.en} We implement a holistic model that combines technical training, 
                        soft skills development, and direct financial support. By addressing both the hard and soft constraints, 
                        we ensure sustainable outcomes for our beneficiaries.
                    </p>
                </div>
              </TabsContent>

              <TabsContent value="approach" className="pt-6">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-teal-900">Methodology</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">1. Identification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Working with local leaders to identify the most vulnerable yet potential-filled candidates.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">2. Training</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Intensive bootcamp focusing on specific skills aligned with market needs.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">3. Resourcing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Providing necessary tools, seed capital, or technology to start.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">4. Mentorship</CardTitle>
                            </CardHeader>
                            <CardContent>
                                12 months of guided mentorship to navigate early challenges.
                            </CardContent>
                        </Card>
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="stories" className="pt-6">
                <div className="grid gap-6">
                    {stories.length > 0 ? stories.map(story => (
                        <Card key={story.id} className="overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/3 h-48 md:h-auto relative">
                                    <ImageWithFallback src={story.media?.[0]?.url || ''} alt={story.title.en} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 md:w-2/3">
                                    <h4 className="text-xl font-bold mb-2">{story.title.en}</h4>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{story.content.en}</p>
                                    <Button variant="outline" size="sm">Read Full Story</Button>
                                </div>
                            </div>
                        </Card>
                    )) : (
                        <p className="text-muted-foreground italic">No stories published for this program yet.</p>
                    )}
                </div>
              </TabsContent>

              <TabsContent value="financials" className="pt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Budget Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">Funds Utilized</span>
                                <span className="text-teal-600 font-bold">
                                    {formatCurrency(program.fundsUtilized)} / {formatCurrency(program.budget)}
                                </span>
                            </div>
                            <Progress value={(program.fundsUtilized / program.budget) * 100} className="h-3" />
                            <p className="text-xs text-muted-foreground mt-2 text-right">
                                {((program.fundsUtilized / program.budget) * 100).toFixed(1)}% of budget used
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                             <div>
                                <h4 className="font-semibold mb-2">Funding Sources</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex justify-between"><span>Grants</span> <span>60%</span></li>
                                    <li className="flex justify-between"><span>Individual Donors</span> <span>30%</span></li>
                                    <li className="flex justify-between"><span>Corporate Partners</span> <span>10%</span></li>
                                </ul>
                             </div>
                             <div>
                                <h4 className="font-semibold mb-2">Expense Allocation</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex justify-between"><span>Direct Beneficiary Costs</span> <span>75%</span></li>
                                    <li className="flex justify-between"><span>Program Management</span> <span>15%</span></li>
                                    <li className="flex justify-between"><span>Admin & Overhead</span> <span>10%</span></li>
                                </ul>
                             </div>
                        </div>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-teal-50 border-teal-100">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-teal-900 mb-2">Support This Program</h3>
                    <p className="text-teal-700 mb-6 text-sm">
                        Your contribution directly impacts the lives of women in this program.
                    </p>
                    <div className="space-y-3">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => navigate('/donate')}>
                            Donate Now <Heart className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full border-teal-600 text-teal-700 hover:bg-teal-100">
                            Start a Fundraiser
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Program Manager</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                            JS
                        </div>
                        <div>
                            <p className="font-medium">Jean Staff</p>
                            <p className="text-sm text-gray-500">Program Manager</p>
                            <p className="text-xs text-teal-600 mt-1">jean@lceo.org</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-400">
                        Map View
                    </div>
                    <p className="text-sm text-gray-600">
                        Operating in Gasabo and Nyarugenge districts, Kigali City.
                    </p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
