import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { mockBeneficiaries } from '@/lib/mock-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth-context';

export default function BeneficiaryDashboard() {
  const { user } = useAuth();
  
  // Find the beneficiary record linked to the logged-in user
  // For demo, if we can't find it (e.g. new user), we might show a placeholder or the first one
  const currentUser = mockBeneficiaries.find(b => b.user.id === user?.id) || mockBeneficiaries[0];

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Progress Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.fullName}!</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
           New Weekly Entry
        </Button>
      </div>

      {/* Alerts */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800 font-semibold">Weekly Tracking Due</AlertTitle>
        <AlertDescription className="text-amber-700">
          You haven't submitted your tracking report for this week yet. Please submit it by Friday.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Capital</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.currentCapital.toLocaleString()} RWF</div>
            <p className="text-xs text-muted-foreground">
              +{(currentUser.currentCapital - currentUser.startCapital).toLocaleString()} RWF growth
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{currentUser.profileCompletion}%</div>
            </div>
            <Progress value={currentUser.profileCompletion} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Last 4 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Tracking</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                {currentUser.nextTrackingDate ? new Date(currentUser.nextTrackingDate).toLocaleDateString() : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Frequency: {currentUser.trackingFrequency}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>My Business</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Business Type</span>
                <span>{currentUser.businessType}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Program</span>
                <span>{currentUser.program.name.en}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Start Date</span>
                <span>{new Date(currentUser.enrollmentDate).toLocaleDateString()}</span>
              </div>
               <div className="flex justify-between">
                <span className="font-medium text-gray-500">Location</span>
                <span>{currentUser.location.sector}, {currentUser.location.district}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-teal-500" />
                <div>
                  <p className="font-medium">Submit Weekly Financial Report</p>
                  <p className="text-sm text-gray-500">Due: Friday 5:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-amber-500" />
                <div>
                  <p className="font-medium">Mentor Check-in Meeting</p>
                  <p className="text-sm text-gray-500">Monday 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-gray-300" />
                <div>
                  <p className="font-medium">Complete Business Plan Module 3</p>
                  <p className="text-sm text-gray-500">Due: Next Week</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
