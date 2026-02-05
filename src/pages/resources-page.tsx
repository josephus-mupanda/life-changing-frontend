import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  FileText, 
  Download, 
  Video, 
  BookOpen, 
  Image as ImageIcon,
  ExternalLink,
  Calendar
} from 'lucide-react';

export function ResourcesPage() {
  const resources = [
    {
      category: 'Annual Reports',
      icon: FileText,
      color: 'bg-blue-100 text-blue-700',
      items: [
        { title: '2024 Annual Impact Report', type: 'PDF', size: '2.4 MB', date: 'Feb 2025', featured: true },
        { title: '2023 Annual Report', type: 'PDF', size: '2.1 MB', date: 'Jan 2024' },
        { title: '2022 Year in Review', type: 'PDF', size: '1.8 MB', date: 'Jan 2023' },
      ],
    },
    {
      category: 'Program Briefs',
      icon: BookOpen,
      color: 'bg-green-100 text-green-700',
      items: [
        { title: 'IkiraroBiz Entrepreneurship Model', type: 'PDF', size: '1.2 MB', date: 'Jan 2025' },
        { title: 'Girls School Retention Strategy', type: 'PDF', size: '980 KB', date: 'Dec 2024' },
        { title: 'Human Capital Development Framework', type: 'PDF', size: '1.5 MB', date: 'Nov 2024' },
        { title: 'Pad Box Initiative Case Study', type: 'PDF', size: '750 KB', date: 'Oct 2024' },
      ],
    },
    {
      category: 'Research & Publications',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-700',
      items: [
        { title: 'Gender-Transformative Change in Rwanda', type: 'PDF', size: '3.2 MB', date: 'Dec 2024' },
        { title: 'Economic Empowerment Impact Study', type: 'PDF', size: '2.8 MB', date: 'Sep 2024' },
        { title: 'Mental Resilience & Mindset Shift Report', type: 'PDF', size: '2.1 MB', date: 'Jun 2024' },
      ],
    },
    {
      category: 'Multimedia',
      icon: Video,
      color: 'bg-red-100 text-red-700',
      items: [
        { title: 'LCEO Documentary 2024', type: 'Video', size: '—', date: 'Jan 2025', external: true },
        { title: 'Beneficiary Success Stories', type: 'Video', size: '—', date: 'Dec 2024', external: true },
        { title: 'Program Overview Presentation', type: 'PPT', size: '5.6 MB', date: 'Nov 2024' },
      ],
    },
    {
      category: 'Photo Gallery',
      icon: ImageIcon,
      color: 'bg-orange-100 text-orange-700',
      items: [
        { title: '2024 Program Activities', type: 'Album', size: '—', date: 'Dec 2024', external: true },
        { title: 'Community Events 2024', type: 'Album', size: '—', date: 'Nov 2024', external: true },
        { title: 'Training & Workshops', type: 'Album', size: '—', date: 'Oct 2024', external: true },
      ],
    },
  ];

  const upcomingEvents = [
    {
      title: 'Annual Stakeholder Meeting',
      date: 'March 15, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Bugesera District Office',
      type: 'In-Person',
    },
    {
      title: 'IkiraroBiz Graduation Ceremony',
      date: 'April 22, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Nyamata Community Center',
      type: 'Public Event',
    },
    {
      title: 'Girls Empowerment Workshop',
      date: 'May 8, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Safe Space Centers',
      type: 'Program Activity',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#4c9789] text-white">
              Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Reports, Research & Media
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access our latest reports, program briefs, research publications, and multimedia content 
              showcasing our impact and approach.
            </p>
          </div>
        </div>
      </section>

      {/* Resources by Category */}
      <section className="container mx-auto px-4">
        <div className="space-y-12 max-w-6xl mx-auto">
          {resources.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <Card key={item.title} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        {item.featured && (
                          <Badge className="mb-3 bg-[#eacfa2] text-[#4c9789] border-[#4c9789]/20">
                            Latest
                          </Badge>
                        )}
                        <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.size !== '—' && (
                            <>
                              <span>•</span>
                              <span>{item.size}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full gap-2"
                          disabled={!item.external && item.type === 'Video'}
                        >
                          {item.external ? (
                            <>
                              <ExternalLink className="w-4 h-4" />
                              View
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
                Events
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upcoming Events & Activities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join us at our upcoming events and see our programs in action
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-lg bg-[#4c9789]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-7 h-7 text-[#4c9789]" />
                      </div>
                      <div>
                        <Badge className="mb-2 bg-[#eacfa2] text-[#4c9789] border-[#4c9789]/20">
                          {event.type}
                        </Badge>
                        <h3 className="font-bold text-lg">{event.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">Time:</span> {event.time}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">Location:</span> {event.location}
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-[#4c9789] hover:bg-[#3d7a6e]">
                      Register Interest
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-[#4c9789]/20 bg-[#4c9789]/5">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Stay Informed</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive new resources, reports, and event notifications directly to your inbox
              </p>
              <Button size="lg" className="bg-[#4c9789] hover:bg-[#3d7a6e]">
                Subscribe to Newsletter
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
