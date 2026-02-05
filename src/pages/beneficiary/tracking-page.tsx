import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { mockBeneficiaries } from '@/lib/mock-data';
import { AttendanceStatus, TaskStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TrackingPage() {
  const { user } = useAuth();
  const currentBeneficiary = mockBeneficiaries.find(b => b.user.id === user?.id) || mockBeneficiaries[0];
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Weekly tracking submitted successfully!');
    }, 1500);
  };

  const getAttendanceBadge = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return <Badge className="bg-green-100 text-green-700">Present</Badge>;
      case AttendanceStatus.ABSENT:
        return <Badge className="bg-red-100 text-red-700">Absent</Badge>;
      case AttendanceStatus.LATE:
        return <Badge className="bg-yellow-100 text-yellow-700">Late</Badge>;
    }
  };

  const getTaskStatusBadge = (status: TaskStatus | null) => {
    if (!status) return <Badge className="bg-gray-100 text-gray-700">N/A</Badge>;
    
    switch (status) {
      case TaskStatus.COMPLETED:
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case TaskStatus.IN_PROGRESS:
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case TaskStatus.NOT_DONE:
        return <Badge className="bg-red-100 text-red-700">Not Done</Badge>;
    }
  };

  // Calculate some stats from tracking history
  const totalIncome = currentBeneficiary.weeklyTrackings.reduce((sum, t) => sum + t.incomeThisWeek, 0);
  const totalExpenses = currentBeneficiary.weeklyTrackings.reduce((sum, t) => sum + t.expensesThisWeek, 0);
  const avgWeeklyIncome = currentBeneficiary.weeklyTrackings.length > 0 
    ? totalIncome / currentBeneficiary.weeklyTrackings.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Weekly Tracking</h1>
        <p className="text-gray-600">Submit your weekly business progress and view past entries</p>
      </div>

      {/* Alert for due tracking */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800 font-semibold">Weekly Report Due</AlertTitle>
        <AlertDescription className="text-amber-700">
          Your tracking report for the week ending{' '}
          {currentBeneficiary.nextTrackingDate 
            ? new Date(currentBeneficiary.nextTrackingDate).toLocaleDateString()
            : 'this Friday'
          } is due. Please submit it before the deadline.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Capital</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBeneficiary.currentCapital.toLocaleString()} RWF</div>
            <p className="text-xs text-gray-500 mt-1">
              From {currentBeneficiary.startCapital.toLocaleString()} RWF
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg Weekly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgWeeklyIncome.toLocaleString()} RWF</div>
            <p className="text-xs text-gray-500 mt-1">Last 4 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBeneficiary.weeklyTrackings.length}</div>
            <p className="text-xs text-gray-500 mt-1">Weekly reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">95%</div>
            <p className="text-xs text-gray-500 mt-1">Last 4 weeks</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">New Submission</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* New Submission Tab */}
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Weekly Tracking</CardTitle>
              <CardDescription>
                Please fill out your business activities for the week ending{' '}
                {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Week Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="week-ending">Week Ending</Label>
                    <Input 
                      id="week-ending" 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendance">Attendance Status</Label>
                    <Select required>
                      <SelectTrigger id="attendance">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-teal-600" />
                    Financial Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income">Income This Week (RWF)</Label>
                      <Input 
                        id="income" 
                        type="number" 
                        placeholder="50000"
                        min="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expenses">Expenses This Week (RWF)</Label>
                      <Input 
                        id="expenses" 
                        type="number" 
                        placeholder="30000"
                        min="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-capital">Current Capital (RWF)</Label>
                      <Input 
                        id="current-capital" 
                        type="number" 
                        placeholder="100000"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sales Data */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Sales Information (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="units-sold">Units Sold</Label>
                      <Input 
                        id="units-sold" 
                        type="number" 
                        placeholder="50"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avg-price">Average Price (RWF)</Label>
                      <Input 
                        id="avg-price" 
                        type="number" 
                        placeholder="1000"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="best-product">Best Selling Product</Label>
                      <Input 
                        id="best-product" 
                        type="text" 
                        placeholder="Product name"
                      />
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Task Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-given">Task Given Last Week</Label>
                      <Input 
                        id="task-given" 
                        type="text" 
                        placeholder="E.g., Increase customer base by 10%"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-status">Task Completion Status</Label>
                      <Select>
                        <SelectTrigger id="task-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="not_done">Not Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="challenges">Challenges Faced This Week</Label>
                    <Textarea 
                      id="challenges" 
                      placeholder="Describe any challenges or problems you encountered..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="solutions">Solutions Implemented</Label>
                    <Textarea 
                      id="solutions" 
                      placeholder="What did you do to address these challenges?"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Notes & Next Week Plan */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any other information you'd like to share..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="next-week">Plan for Next Week</Label>
                    <Textarea 
                      id="next-week" 
                      placeholder="What are your goals and plans for next week?"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button type="button" variant="outline">Save as Draft</Button>
                  <Button 
                    type="submit" 
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Weekly Tracking'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
              <CardDescription>View all your past weekly submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week Ending</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Expenses</TableHead>
                    <TableHead>Capital</TableHead>
                    <TableHead>Task Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentBeneficiary.weeklyTrackings.map((tracking) => (
                    <TableRow key={tracking.id}>
                      <TableCell className="font-medium">
                        {new Date(tracking.weekEnding).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getAttendanceBadge(tracking.attendance)}</TableCell>
                      <TableCell className="text-green-600">
                        +{tracking.incomeThisWeek.toLocaleString()} RWF
                      </TableCell>
                      <TableCell className="text-red-600">
                        -{tracking.expensesThisWeek.toLocaleString()} RWF
                      </TableCell>
                      <TableCell>{tracking.currentCapital.toLocaleString()} RWF</TableCell>
                      <TableCell>{getTaskStatusBadge(tracking.taskCompletionStatus)}</TableCell>
                      <TableCell>
                        {tracking.verifiedAt ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
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
