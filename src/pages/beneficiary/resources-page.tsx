import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Phone, 
  Mail, 
  AlertCircle,
  Search,
  ExternalLink,
  Play,
  File,
  Image as ImageIcon,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { mockBeneficiaries } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function ResourcesPage() {
  const { user } = useAuth();
  const currentBeneficiary = mockBeneficiaries.find(b => b.user.id === user?.id) || mockBeneficiaries[0];

  const trainingMaterials = [
    {
      id: 1,
      title: 'Business Planning Fundamentals',
      type: 'PDF',
      category: 'Business',
      size: '2.5 MB',
      icon: FileText,
      description: 'Learn how to create a comprehensive business plan',
    },
    {
      id: 2,
      title: 'Financial Management for Small Business',
      type: 'Video',
      category: 'Finance',
      duration: '45 min',
      icon: Video,
      description: 'Master basic accounting and financial tracking',
    },
    {
      id: 3,
      title: 'Marketing Your Products',
      type: 'PDF',
      category: 'Marketing',
      size: '1.8 MB',
      icon: FileText,
      description: 'Effective strategies to reach your customers',
    },
    {
      id: 4,
      title: 'Customer Service Excellence',
      type: 'Video',
      category: 'Skills',
      duration: '30 min',
      icon: Video,
      description: 'Build lasting relationships with customers',
    },
    {
      id: 5,
      title: 'Leadership & Personal Development',
      type: 'PDF',
      category: 'Personal',
      size: '3.2 MB',
      icon: FileText,
      description: 'Develop your leadership and communication skills',
    },
    {
      id: 6,
      title: 'Mental Health & Resilience',
      type: 'Video',
      category: 'Health',
      duration: '25 min',
      icon: Video,
      description: 'Building mental strength and wellbeing',
    },
  ];

  const documents = [
    {
      id: 1,
      name: 'Program Agreement',
      type: 'PDF',
      uploadDate: '2024-01-15',
      size: '450 KB',
      status: 'verified',
    },
    {
      id: 2,
      name: 'ID Card Copy',
      type: 'Image',
      uploadDate: '2024-01-15',
      size: '1.2 MB',
      status: 'verified',
    },
    {
      id: 3,
      name: 'Business License',
      type: 'PDF',
      uploadDate: '2024-02-10',
      size: '680 KB',
      status: 'pending',
    },
  ];

  const faqs = [
    {
      question: 'How do I submit my weekly tracking?',
      answer: 'Go to the Weekly Tracking page and fill out the form with your business activities. Submit it before the deadline each week.',
    },
    {
      question: 'What should I do if I miss a training session?',
      answer: 'Contact your program coordinator immediately. They will help you catch up with the missed content.',
    },
    {
      question: 'How can I access my capital?',
      answer: 'Capital disbursements are made according to your program schedule. Contact your coordinator for specific details.',
    },
    {
      question: 'Can I change my business type?',
      answer: 'Yes, but this requires approval from your program coordinator. Please submit a request through the support form.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources & Support</h1>
        <p className="text-gray-600">Access training materials, documents, and get help when you need it</p>
      </div>

      {/* Emergency Contacts Alert */}
      <Alert className="bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800 font-semibold">Emergency Support</AlertTitle>
        <AlertDescription className="text-red-700">
          <div className="mt-2 space-y-1">
            {currentBeneficiary.emergencyContacts.filter(c => c.isPrimary).map((contact) => (
              <div key={contact.id} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{contact.name}: {contact.phone}</span>
              </div>
            ))}
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="training" className="space-y-4">
        <TabsList>
          <TabsTrigger value="training">Training Materials</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="support">Get Support</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* Training Materials Tab */}
        <TabsContent value="training" className="space-y-4">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search training materials..." 
                className="w-full"
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingMaterials.map((material) => {
              const Icon = material.icon;
              return (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          material.type === 'Video' ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            material.type === 'Video' ? 'text-purple-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{material.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {material.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{material.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {material.type === 'Video' ? material.duration : material.size}
                      </span>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        {material.type === 'Video' ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* My Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Uploaded Documents</CardTitle>
                  <CardDescription>Your personal documents and certificates</CardDescription>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {doc.type === 'PDF' ? (
                        <File className="w-8 h-8 text-red-600" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded {new Date(doc.uploadDate).toLocaleDateString()} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={
                          doc.status === 'verified' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {doc.status === 'verified' ? 'Verified' : 'Pending'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Make sure you have uploaded all required documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <span>National ID Card - Uploaded & Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <span>Program Agreement - Uploaded & Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-600" />
                  </div>
                  <span>Business License - Pending Verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                  </div>
                  <span>Bank Account Details - Not Uploaded</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Get Support Tab */}
        <TabsContent value="support" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Program Coordinator</CardTitle>
                <CardDescription>Your primary point of contact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Sarah Mugisha</p>
                  <p className="text-sm text-gray-500">Senior Program Manager</p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    +250 780 123 456
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    sarah.mugisha@lceo.org
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>People to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentBeneficiary.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </Button>
                    {contact.isPrimary && (
                      <Badge className="bg-blue-100 text-blue-700">Primary Contact</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit Support Request */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Submit Support Request</CardTitle>
                <CardDescription>
                  Need help? Fill out this form and we'll get back to you soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="Brief description of your issue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Select category</option>
                      <option>Technical Issue</option>
                      <option>Program Question</option>
                      <option>Financial Matter</option>
                      <option>Training Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea 
                      className="w-full border rounded-md p-2 min-h-[120px]"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-4 border-b last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-7">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? Contact your program coordinator or submit a support request.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
