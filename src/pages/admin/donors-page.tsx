import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';
import { 
  Heart, 
  Mail, 
  Phone, 
  Globe, 
  TrendingUp, 
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Eye,
  Download,
  UserPlus
} from 'lucide-react';
import { mockDonors } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Currency, ReceiptPreference } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function DonorsPage() {
  const navigate = useNavigate();
  const totalDonors = mockDonors.length;
  const recurringDonors = mockDonors.filter(d => d.isRecurringDonor).length;
  const totalDonated = mockDonors.reduce((sum, d) => sum + d.totalDonated, 0);
  const avgDonation = totalDonated / totalDonors;

  const donorsByCountry = [
    { name: 'USA', value: 5, color: '#4c9789' },
    { name: 'UK', value: 2, color: '#6fb3a6' },
    { name: 'Canada', value: 1, color: '#eacfa2' },
    { name: 'Rwanda', value: 2, color: '#3a7369' },
  ];

  const monthlyDonations = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 6000 },
    { month: 'Mar', amount: 7500 },
    { month: 'Apr', amount: 6500 },
    { month: 'May', amount: 8000 },
    { month: 'Jun', amount: 9000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Management</h1>
          <p className="text-gray-600">Manage and engage with your donor community</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => navigate('/admin/donors/add')}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Donor
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalDonors}</div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Active supporters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Recurring Donors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-600">{recurringDonors}</div>
              <Heart className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Monthly supporters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">${totalDonated.toLocaleString()}</div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-teal-600">${avgDonation.toFixed(0)}</div>
              <TrendingUp className="w-8 h-8 text-teal-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Per donor</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Donations</CardTitle>
            <CardDescription>Donation trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="amount" fill="#4c9789" name="Amount ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Donors by Country</CardTitle>
            <CardDescription>Geographic distribution of donors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={donorsByCountry}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donorsByCountry.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Donors</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Donors</TabsTrigger>
          <TabsTrigger value="major">Major Donors</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search donors by name, email, or country..." 
              className="w-full"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="rwanda">Rwanda</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* All Donors Tab */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Donors</CardTitle>
              <CardDescription>Complete list of all donors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Total Donated</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDonors.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">
                        {donor.anonymityPreference ? 'Anonymous' : donor.fullName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {donor.user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          {donor.country}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${donor.totalDonated.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {donor.lastDonationDate 
                          ? new Date(donor.lastDonationDate).toLocaleDateString()
                          : 'Never'
                        }
                      </TableCell>
                      <TableCell>
                        {donor.isRecurringDonor ? (
                          <Badge className="bg-blue-100 text-blue-700">Recurring</Badge>
                        ) : (
                          <Badge variant="outline">One-Time</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Donor Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              {/* Personal Information */}
                              <div>
                                <h3 className="font-semibold mb-3">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium">{donor.fullName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{donor.user.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{donor.user.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Country</p>
                                    <p className="font-medium">{donor.country}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Preferred Currency</p>
                                    <p className="font-medium">{donor.preferredCurrency}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium">
                                      {new Date(donor.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Donation Summary */}
                              <div>
                                <h3 className="font-semibold mb-3">Donation Summary</h3>
                                <div className="grid grid-cols-3 gap-4">
                                  <Card>
                                    <CardContent className="pt-4">
                                      <p className="text-sm text-gray-500">Total Donated</p>
                                      <p className="text-2xl font-bold text-teal-600">
                                        ${donor.totalDonated.toLocaleString()}
                                      </p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="pt-4">
                                      <p className="text-sm text-gray-500">Total Donations</p>
                                      <p className="text-2xl font-bold">{donor.donations.length}</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="pt-4">
                                      <p className="text-sm text-gray-500">Recurring</p>
                                      <p className="text-2xl font-bold text-blue-600">
                                        {donor.recurringDonations.length}
                                      </p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>

                              {/* Preferences */}
                              <div>
                                <h3 className="font-semibold mb-3">Preferences</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm">Receipt Preference</span>
                                    <Badge variant="outline">{donor.receiptPreference}</Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm">Newsletter Subscription</span>
                                    <Badge className={donor.receiveNewsletter ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                      {donor.receiveNewsletter ? 'Subscribed' : 'Not Subscribed'}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm">Anonymous Giving</span>
                                    <Badge className={donor.anonymityPreference ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>
                                      {donor.anonymityPreference ? 'Yes' : 'No'}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2 pt-4 border-t">
                                <Button variant="outline" size="sm">
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Export Data
                                </Button>
                                <Button variant="outline" size="sm">
                                  View Donations
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recurring Donors Tab */}
        <TabsContent value="recurring">
          <Card>
            <CardHeader>
              <CardTitle>Recurring Donors</CardTitle>
              <CardDescription>Donors with active recurring donations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Monthly Amount</TableHead>
                    <TableHead>Active Since</TableHead>
                    <TableHead>Total Contributed</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDonors.filter(d => d.isRecurringDonor).map((donor) => {
                    const recurringDonation = donor.recurringDonations[0];
                    return (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.fullName}</TableCell>
                        <TableCell>{donor.country}</TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          ${recurringDonation?.amount.toFixed(2)} / {recurringDonation?.frequency}
                        </TableCell>
                        <TableCell>
                          {new Date(donor.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${donor.totalDonated.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Major Donors Tab */}
        <TabsContent value="major">
          <Card>
            <CardHeader>
              <CardTitle>Major Donors</CardTitle>
              <CardDescription>Donors with contributions over $500</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Total Donated</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead>Impact Level</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDonors
                    .filter(d => d.totalDonated >= 500)
                    .sort((a, b) => b.totalDonated - a.totalDonated)
                    .map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.fullName}</TableCell>
                        <TableCell>{donor.country}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          ${donor.totalDonated.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {donor.lastDonationDate 
                            ? new Date(donor.lastDonationDate).toLocaleDateString()
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-700">Gold</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}