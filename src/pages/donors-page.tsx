import { useState } from 'react';
import { Plus, Search, Heart, TrendingUp, DollarSign } from 'lucide-react';
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
import { mockDonors, mockDonations, mockUsers } from '../lib/mock-data';
import { StatsCard } from '../components/stats-card';

export function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getDonorName = (donorId: string) => {
    const donor = mockDonors.find(d => d.id === donorId);
    if (!donor) return 'Unknown';
    if (donor.organizationName) return donor.organizationName;
    const user = mockUsers.find(u => u.id === donor.userId);
    return user?.name || 'Anonymous';
  };

  const totalDonations = mockDonations.reduce((sum, d) => sum + d.amount, 0);
  const recurringDonors = mockDonors.filter(d => d.isRecurring).length;
  const avgDonation = totalDonations / mockDonations.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Donors</h1>
          <p className="text-muted-foreground">
            Manage donor relationships and track contributions
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add Donor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard
          title="Total Donors"
          value={mockDonors.length}
          icon={Heart}
          description="Active supporters"
        />
        <StatsCard
          title="Total Donations"
          value={formatCurrency(totalDonations)}
          icon={DollarSign}
          description="Lifetime contributions"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Recurring Donors"
          value={recurringDonors}
          icon={TrendingUp}
          description="Monthly supporters"
        />
        <StatsCard
          title="Avg. Donation"
          value={formatCurrency(avgDonation)}
          icon={DollarSign}
          description="Per contribution"
        />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Donors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Donors ({mockDonors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Total Donated</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDonors.map((donor) => {
                const user = mockUsers.find(u => u.id === donor.userId);
                return (
                  <TableRow key={donor.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <Heart className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {donor.organizationName || user?.name || 'Anonymous'}
                          </div>
                          {donor.organizationName && user && (
                            <div className="text-xs text-muted-foreground">
                              {user.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {donor.donorType}
                      </Badge>
                    </TableCell>
                    <TableCell>{donor.country || 'N/A'}</TableCell>
                    <TableCell className="font-medium text-primary">
                      {formatCurrency(donor.totalDonated)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {donor.lastDonationDate ? formatDate(donor.lastDonationDate) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {donor.isRecurring ? (
                        <Badge className="bg-green-100 text-green-700" variant="secondary">
                          Recurring
                        </Badge>
                      ) : (
                        <Badge variant="secondary">One-time</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {donor.phoneNumber || 'No phone'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="text-sm">{formatDate(donation.date)}</TableCell>
                  <TableCell className="font-medium">
                    {donation.isAnonymous ? 'Anonymous' : getDonorName(donation.donorId)}
                  </TableCell>
                  <TableCell className="font-medium text-primary">
                    {formatCurrency(donation.amount)} {donation.currency}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {donation.donationType.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        donation.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                      variant="secondary"
                    >
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {donation.message || 'No message'}
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
