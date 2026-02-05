import { Users, Heart, FolderKanban, TrendingUp, Award, DollarSign } from 'lucide-react';
import { StatsCard } from '../components/stats-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getDashboardStats, mockBeneficiaries, mockPrograms, mockDonors } from '../lib/mock-data';
import { ProgramCategory, ProgramStatus, BeneficiaryStatus } from '../lib/types';

export function AdminDashboard() {
  const stats = getDashboardStats();

  const programDistribution = [
    { name: 'Education', value: 127, color: '#4c9789' },
    { name: 'Entrepreneurship', value: 85, color: '#eacfa2' },
    { name: 'Health', value: 175, color: '#6fb3a6' },
    { name: 'Cross-Cutting', value: 45, color: '#3a7369' },
  ];

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

  const getCategoryBadge = (category: ProgramCategory) => {
    const variants: Record<ProgramCategory, string> = {
      [ProgramCategory.EDUCATION]: 'bg-blue-100 text-blue-700',
      [ProgramCategory.ENTREPRENEURSHIP]: 'bg-green-100 text-green-700',
      [ProgramCategory.HEALTH]: 'bg-pink-100 text-pink-700',
      [ProgramCategory.CROSS_CUTTING]: 'bg-purple-100 text-purple-700',
    };
    return variants[category];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with LCEO today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Beneficiaries"
          value={stats.totalBeneficiaries}
          icon={Users}
          description={`${stats.activeBeneficiaries} currently active`}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Active Programs"
          value={stats.activePrograms}
          icon={FolderKanban}
          description="Across 3 categories"
        />
        <StatsCard
          title="Total Donations"
          value={formatCurrency(stats.totalDonations)}
          icon={DollarSign}
          description={`From ${stats.totalDonors} donors`}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Graduated"
          value={stats.graduatedBeneficiaries}
          icon={Award}
          description="Successfully completed programs"
          trend={{ value: 15.3, isPositive: true }}
        />
        <StatsCard
          title="Active Donors"
          value={stats.totalDonors}
          icon={Heart}
          description="Supporting our mission"
        />
        <StatsCard
          title="Growth Rate"
          value="8.2%"
          icon={TrendingUp}
          description="Month over month"
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Beneficiaries and donations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis yAxisId="left" stroke="#4c9789" />
                <YAxis yAxisId="right" orientation="right" stroke="#eacfa2" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="beneficiaries"
                  stroke="#4c9789"
                  strokeWidth={2}
                  name="Beneficiaries"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="donations"
                  stroke="#eacfa2"
                  strokeWidth={2}
                  name="Donations ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Program Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Program Distribution</CardTitle>
            <CardDescription>Beneficiaries by program category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={programDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {programDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Donors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Donors</CardTitle>
              <CardDescription>Latest registered donors</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Total Donated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDonors.slice(0, 5).map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell className="text-sm">
                      {donor.anonymityPreference ? 'Anonymous' : donor.fullName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {donor.country}
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium">
                      {formatCurrency(donor.totalDonated)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Programs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Programs</CardTitle>
              <CardDescription>Current program status</CardDescription>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPrograms.filter(p => p.status === ProgramStatus.ACTIVE).map((program) => (
                <div
                  key={program.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{program.name.en}</h4>
                      <Badge className={getCategoryBadge(program.category)} variant="secondary">
                        {program.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                       Funds Utilized: {((program.fundsUtilized / program.budget) * 100).toFixed(0)}%
                    </p>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${(program.fundsUtilized / program.budget) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Beneficiaries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Beneficiaries</CardTitle>
            <CardDescription>Newly enrolled beneficiaries</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBeneficiaries.slice(0, 5).map((beneficiary) => (
                <TableRow key={beneficiary.id}>
                  <TableCell className="font-medium">
                    {beneficiary.fullName}
                  </TableCell>
                  <TableCell>{beneficiary.location.sector}, {beneficiary.location.district}</TableCell>
                  <TableCell>{beneficiary.program.name.en}</TableCell>
                  <TableCell>{formatDate(beneficiary.enrollmentDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={beneficiary.status === BeneficiaryStatus.ACTIVE ? 'default' : 'secondary'}
                      className={beneficiary.status === BeneficiaryStatus.ACTIVE ? 'bg-primary' : ''}
                    >
                      {beneficiary.status}
                    </Badge>
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
