import { Plus, Search, MoreVertical, Users, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { mockPrograms } from '../lib/mock-data';
import { ProgramCategory, ProgramStatus } from '../lib/types';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/auth-context';
import { UserType } from '../lib/types';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function ProgramsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Check if we're in admin context
  const isAdminContext = location.pathname.startsWith('/admin');
  const canManagePrograms = user?.userType === UserType.ADMIN && isAdminContext;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getCategoryColor = (category: ProgramCategory) => {
    const colors = {
      [ProgramCategory.EDUCATION]: 'bg-blue-100 text-blue-700 border-blue-200',
      [ProgramCategory.ENTREPRENEURSHIP]: 'bg-green-100 text-green-700 border-green-200',
      [ProgramCategory.HEALTH]: 'bg-pink-100 text-pink-700 border-pink-200',
      [ProgramCategory.CROSS_CUTTING]: 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return colors[category];
  };

  const getStatusBadge = (status: ProgramStatus) => {
    const variants = {
      [ProgramStatus.PLANNING]: 'bg-yellow-100 text-yellow-700',
      [ProgramStatus.ACTIVE]: 'bg-green-100 text-green-700',
      [ProgramStatus.COMPLETED]: 'bg-blue-100 text-blue-700',
      [ProgramStatus.ARCHIVED]: 'bg-gray-100 text-gray-700',
    };
    return variants[status];
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4c9789]/10 to-[#eacfa2]/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover our comprehensive programs designed to empower vulnerable young women 
              and girls through education, entrepreneurship, and health initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with proper margins */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Programs</h1>
            <p className="text-muted-foreground">
              Manage LCEO programs and track their impact
            </p>
          </div>
          {canManagePrograms && (
            <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Create Program
            </Button>
          )}
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search programs..." className="pl-9" />
            </div>
          </CardContent>
        </Card>

        {/* Program Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Programs</p>
                  <div className="text-2xl font-bold text-primary">
                    {mockPrograms.filter(p => p.status === ProgramStatus.ACTIVE).length}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(mockPrograms.reduce((sum, p) => sum + p.budget, 0))}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Funds Utilized</p>
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(mockPrograms.reduce((sum, p) => sum + p.fundsUtilized, 0))}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockPrograms.map((program) => {
            // Calculate arbitrary progress for demo if real data is missing
            // In real app, we'd use program.beneficiaries.length / target
            // Using random target for now or kpiTargets if structured
            const target = program.kpiTargets?.graduates || program.kpiTargets?.peopleReached || 100;
            const current = 65; // Placeholder since beneficiaries array is empty in mock
            const beneficiaryProgress = (current / target) * 100;
            
            const budgetProgress = (program.fundsUtilized / program.budget) * 100;

            return (
              <Card key={program.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {/* Program Image */}
                {program.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={program.coverImage} 
                      alt={program.name.en}
                      className="w-full h-full object-cover"
                    />
                    {program.logo && (
                      <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-lg shadow-md p-2">
                        <img 
                          src={program.logo} 
                          alt={`${program.name.en} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(program.category)} variant="secondary">
                          {program.category}
                        </Badge>
                        <Badge className={getStatusBadge(program.status)} variant="secondary">
                          {program.status}
                        </Badge>
                      </div>
                      <CardTitle className="mb-2">{program.name.en}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {program.description.en}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/programs/${program.id}`)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Program</DropdownMenuItem>
                        <DropdownMenuItem>View Reports</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Archive Program
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Beneficiaries Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Beneficiaries Reached</span>
                      <span className="font-medium">
                        {current} / {target}
                      </span>
                    </div>
                    <Progress value={beneficiaryProgress} className="h-2" />
                  </div>

                  {/* Budget Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Budget Utilization</span>
                      <span className="font-medium">
                        {formatCurrency(program.fundsUtilized)} / {formatCurrency(program.budget)}
                      </span>
                    </div>
                    <Progress value={budgetProgress} className="h-2" />
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                      <p className="text-sm font-medium">{formatDate(program.startDate)}</p>
                    </div>
                  </div>

                  <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => navigate(`/programs/${program.id}`)}
                  >
                    View Program Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Create Program Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Program</DialogTitle>
              <DialogDescription>
                Add a new program to the LCEO system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category">Category</Label>
                <Select id="category" className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="cross_cutting">Cross-Cutting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status">Status</Label>
                <Select id="status" className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fundsUtilized">Funds Utilized</Label>
                <Input id="fundsUtilized" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}