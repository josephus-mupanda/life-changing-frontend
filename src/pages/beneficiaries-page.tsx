import { useState } from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mockBeneficiaries } from '../lib/mock-data';
import { BeneficiaryStatus } from '../lib/types';

export function BeneficiariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBeneficiaries = mockBeneficiaries.filter((ben) => {
    const matchesSearch =
      ben.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ben.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ben.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ben.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getStatusBadge = (status: BeneficiaryStatus) => {
    const variants = {
      [BeneficiaryStatus.ACTIVE]: 'bg-green-100 text-green-700',
      [BeneficiaryStatus.GRADUATED]: 'bg-blue-100 text-blue-700',
      [BeneficiaryStatus.INACTIVE]: 'bg-gray-100 text-gray-700',
    };
    return variants[status];
  };

  const calculateAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Beneficiaries</h1>
          <p className="text-muted-foreground">
            Manage and track all beneficiaries in the system
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add Beneficiary
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">
              {mockBeneficiaries.filter(b => b.status === BeneficiaryStatus.ACTIVE).length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-700">
              {mockBeneficiaries.filter(b => b.status === BeneficiaryStatus.GRADUATED).length}
            </div>
            <p className="text-sm text-muted-foreground">Graduated</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-700">
              {mockBeneficiaries.filter(b => b.status === BeneficiaryStatus.INACTIVE).length}
            </div>
            <p className="text-sm text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {mockBeneficiaries.length}
            </div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Beneficiaries Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Beneficiaries ({filteredBeneficiaries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {beneficiary.firstName[0]}{beneficiary.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">
                          {beneficiary.firstName} {beneficiary.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {beneficiary.phoneNumber || 'No phone'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{calculateAge(beneficiary.dateOfBirth)} yrs</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {beneficiary.sector}, {beneficiary.district}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {beneficiary.village}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{beneficiary.educationLevel || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">
                      {beneficiary.schoolName || ''}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{beneficiary.guardianName || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">
                      {beneficiary.guardianContact || ''}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(beneficiary.enrollmentDate)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(beneficiary.status)} variant="secondary">
                      {beneficiary.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
