import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  DollarSign,
  Briefcase,
  GraduationCap,
  User,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { mockBeneficiaries } from '@/lib/mock-data';
import { GoalType, GoalStatus } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function GoalsPage() {
  const { user } = useAuth();
  const currentBeneficiary = mockBeneficiaries.find(b => b.user.id === user?.id) || mockBeneficiaries[0];
  const [openDialog, setOpenDialog] = useState(false);

  const getGoalIcon = (type: GoalType) => {
    switch (type) {
      case GoalType.FINANCIAL:
        return DollarSign;
      case GoalType.BUSINESS:
        return Briefcase;
      case GoalType.EDUCATION:
        return GraduationCap;
      case GoalType.PERSONAL:
        return User;
      case GoalType.SKILLS:
        return Lightbulb;
      default:
        return Target;
    }
  };

  const getStatusBadge = (status: GoalStatus) => {
    switch (status) {
      case GoalStatus.ACHIEVED:
        return <Badge className="bg-green-100 text-green-700">Achieved</Badge>;
      case GoalStatus.IN_PROGRESS:
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case GoalStatus.NOT_STARTED:
        return <Badge className="bg-gray-100 text-gray-700">Not Started</Badge>;
      case GoalStatus.ABANDONED:
        return <Badge className="bg-red-100 text-red-700">Abandoned</Badge>;
      default:
        return null;
    }
  };

  const activeGoals = currentBeneficiary.goals.filter(g => g.status === GoalStatus.IN_PROGRESS);
  const achievedGoals = currentBeneficiary.goals.filter(g => g.status === GoalStatus.ACHIEVED);
  const notStartedGoals = currentBeneficiary.goals.filter(g => g.status === GoalStatus.NOT_STARTED);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
          <p className="text-gray-600">Track and achieve your personal and business goals</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new goal to track your progress and stay motivated
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-description">Goal Description</Label>
                <Textarea 
                  id="goal-description" 
                  placeholder="Describe your goal..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-type">Goal Type</Label>
                  <Select>
                    <SelectTrigger id="goal-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="skills">Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount (RWF)</Label>
                  <Input 
                    id="target-amount" 
                    type="number" 
                    placeholder="100000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-date">Target Date</Label>
                <Input 
                  id="target-date" 
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="action-plan">Action Plan (Optional)</Label>
                <Textarea 
                  id="action-plan" 
                  placeholder="What steps will you take to achieve this goal?"
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setOpenDialog(false)}>
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBeneficiary.goals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeGoals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{achievedGoals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">
              {currentBeneficiary.goals.length > 0 
                ? Math.round((achievedGoals.length / currentBeneficiary.goals.length) * 100)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Active Goals
        </h2>
        {activeGoals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active goals. Start by creating a new goal!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {activeGoals.map((goal) => {
              const Icon = getGoalIcon(goal.type);
              const progress = (goal.currentProgress / goal.targetAmount) * 100;
              const daysUntil = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <Card key={goal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{goal.description}</CardTitle>
                          <CardDescription className="mt-1">
                            Target: {goal.targetAmount.toLocaleString()} RWF by{' '}
                            {new Date(goal.targetDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(goal.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {goal.currentProgress.toLocaleString()} / {goal.targetAmount.toLocaleString()} RWF
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% complete</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {daysUntil > 0 ? `${daysUntil} days remaining` : 'Overdue'}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">Update Progress</Button>
                    </div>

                    {goal.milestones && goal.milestones.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium mb-2">Milestones</p>
                        <div className="space-y-2">
                          {goal.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              {milestone.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                              )}
                              <span className={milestone.completed ? 'text-gray-400 line-through' : ''}>
                                {milestone.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Achieved Goals */}
      {achievedGoals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Achieved Goals
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {achievedGoals.map((goal) => {
              const Icon = getGoalIcon(goal.type);
              
              return (
                <Card key={goal.id} className="bg-green-50 border-green-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{goal.description}</CardTitle>
                          <CardDescription className="mt-1">
                            Achieved on {goal.completedAt ? new Date(goal.completedAt).toLocaleDateString() : 'N/A'}
                          </CardDescription>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Target Achieved:</span> {goal.targetAmount.toLocaleString()} RWF
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Not Started Goals */}
      {notStartedGoals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            Planned Goals
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {notStartedGoals.map((goal) => {
              const Icon = getGoalIcon(goal.type);
              
              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{goal.description}</CardTitle>
                          <CardDescription className="mt-1">
                            Target: {goal.targetAmount.toLocaleString()} RWF
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(goal.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Working on This Goal
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
