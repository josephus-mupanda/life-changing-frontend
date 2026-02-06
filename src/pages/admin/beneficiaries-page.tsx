import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Plus, 
  FileText,
  UserCheck,
  UserX
} from 'lucide-react';
import { mockBeneficiaries, mockPrograms } from '@/lib/mock-data';
import { BeneficiaryStatus, Program } from '@/lib/types';
import { toast } from 'sonner';

export function BeneficiariesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  // Filtering logic
  const filteredBeneficiaries = mockBeneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          beneficiary.location.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || beneficiary.status === statusFilter;
    const matchesProgram = programFilter === 'all' || beneficiary.program.id === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const handleExport = () => {
    toast.success("Exporting beneficiary data to CSV...");
    // Mock export
  };

  const handleStatusChange = (id: string, newStatus: BeneficiaryStatus) => {
    toast.success(`Updated status for beneficiary ${id} to ${newStatus}`);
    // In a real app, this would call an API
  };

  const formatDate = (date: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Beneficiaries</h1>
          <p className="text-gray-600 mt-1">Manage and track beneficiary information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#4c9789] hover:bg-[#3d7a6e]" onClick={() => navigate('/admin/beneficiaries/add')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name or district..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Status" />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={BeneficiaryStatus.ACTIVE}>Active</SelectItem>
                <SelectItem value={BeneficiaryStatus.GRADUATED}>Graduated</SelectItem>
                <SelectItem value={BeneficiaryStatus.INACTIVE}>Inactive</SelectItem>
            </SelectContent>
            </Select>

            <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {mockPrograms.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name.en}</SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Tracking</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeneficiaries.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        No beneficiaries found matching your criteria.
                    </TableCell>
                </TableRow>
            ) : (
                filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                    <Avatar className="h-9 w-9 border border-gray-200">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-teal-100 text-teal-800 text-xs">
                            {beneficiary.fullName.split(' ').map(n => n[0]).join('').substring(0,2)}
                        </AvatarFallback>
                    </Avatar>
                    </TableCell>
                    <TableCell className="font-medium text-teal-900">
                        {beneficiary.fullName}
                        <div className="text-xs text-gray-500 font-normal">{beneficiary.user.phone}</div>
                    </TableCell>
                    <TableCell>{beneficiary.program.name.en}</TableCell>
                    <TableCell>
                        <span className="capitalize">{beneficiary.location.district}</span>
                        <span className="text-xs text-gray-400 ml-1">({beneficiary.location.sector})</span>
                    </TableCell>
                    <TableCell>{formatDate(beneficiary.enrollmentDate)}</TableCell>
                    <TableCell>
                    <Badge 
                        variant="outline" 
                        className={
                            beneficiary.status === BeneficiaryStatus.ACTIVE ? 'bg-green-50 text-green-700 border-green-200' :
                            beneficiary.status === BeneficiaryStatus.GRADUATED ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'
                        }
                    >
                        {beneficiary.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                        {beneficiary.lastTrackingDate ? formatDate(beneficiary.lastTrackingDate) : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(beneficiary.id)}>
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" /> Verify Progress
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleStatusChange(beneficiary.id, BeneficiaryStatus.INACTIVE)}
                        >
                            <UserX className="mr-2 h-4 w-4" /> Deactivate
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-gray-500 text-center">
        Showing {filteredBeneficiaries.length} of {mockBeneficiaries.length} records
      </div>
    </div>
  );
}