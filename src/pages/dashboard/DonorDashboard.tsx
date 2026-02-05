import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, FileText, ArrowRight } from 'lucide-react';
import { mockDonors } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/lib/auth-context';
import { useNavigate } from 'react-router';

export default function DonorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Find the donor record linked to the logged-in user
  const currentUser = mockDonors.find(d => d.user.id === user?.id) || mockDonors[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Portal</h1>
          <p className="text-gray-600">Thank you for your support, {currentUser.fullName}!</p>
        </div>
        <Button 
            className="bg-[#eacfa2] text-teal-900 hover:bg-[#d4b886]"
            onClick={() => navigate('/donate')}
        >
           Make a New Donation
        </Button>
      </div>

      {/* Impact Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-teal-900 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-teal-100">Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${currentUser.totalDonated.toLocaleString()}</div>
            <p className="text-xs text-teal-300 mt-1">Since {new Date(currentUser.createdAt).getFullYear()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lives Impacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">5</div>
            <p className="text-xs text-gray-500 mt-1">Beneficiaries supported directly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Scheduled Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Sep 15</div>
            <p className="text-xs text-gray-500 mt-1">Recurring Monthly ($50)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation History */}
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentUser.donations && currentUser.donations.length > 0 ? (
                            currentUser.donations.map(donation => (
                                <TableRow key={donation.id}>
                                    <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>${donation.amount.toFixed(2)}</TableCell>
                                    <TableCell><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Completed</span></TableCell>
                                    <TableCell><Button variant="ghost" size="sm"><FileText className="w-4 h-4" /></Button></TableCell>
                                </TableRow>
                            ))
                        ) : (
                             <>
                                <TableRow>
                                    <TableCell>Aug 15, 2023</TableCell>
                                    <TableCell>$50.00</TableCell>
                                    <TableCell><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Completed</span></TableCell>
                                    <TableCell><Button variant="ghost" size="sm"><FileText className="w-4 h-4" /></Button></TableCell>
                                </TableRow>
                                 <TableRow>
                                    <TableCell>Jul 15, 2023</TableCell>
                                    <TableCell>$50.00</TableCell>
                                    <TableCell><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Completed</span></TableCell>
                                    <TableCell><Button variant="ghost" size="sm"><FileText className="w-4 h-4" /></Button></TableCell>
                                </TableRow>
                             </>
                        )}
                    </TableBody>
                </Table>
                <Button variant="link" className="w-full mt-4">View All Transactions <ArrowRight className="w-4 h-4 ml-2"/></Button>
            </CardContent>
        </Card>

        {/* Impact Reports */}
        <Card className="col-span-1">
             <CardHeader>
                <CardTitle>Impact Reports</CardTitle>
                <CardDescription>See how your funds are being used</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4">
                        <div className="bg-teal-100 p-3 rounded-lg h-fit">
                            <FileText className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Q2 2023 Quarterly Report</h4>
                            <p className="text-sm text-gray-500 mb-2">Released July 2023</p>
                            <Button size="sm" variant="outline" className="h-8">Download PDF</Button>
                        </div>
                    </div>
                     <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4">
                        <div className="bg-teal-100 p-3 rounded-lg h-fit">
                            <FileText className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Annual Impact Report 2022</h4>
                            <p className="text-sm text-gray-500 mb-2">Released Jan 2023</p>
                            <Button size="sm" variant="outline" className="h-8">Download PDF</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
