import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function AddBeneficiaryPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    location: '',
    education: '',
    program: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Beneficiary added successfully!');
      setIsLoading(false);
      navigate('/admin/beneficiaries');
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin/beneficiaries')}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Beneficiary</h1>
          <p className="text-muted-foreground">
            Create a new beneficiary account manually
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="max-w-3xl border-2 border-[#4c9789]/20">
          <CardHeader className="bg-gradient-to-br from-[#4c9789]/5 to-[#eacfa2]/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#4c9789] flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Beneficiary Information</CardTitle>
                <CardDescription>
                  Fill in the details to create a new beneficiary account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#4c9789] border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Jane Uwase"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Bugesera District, Eastern Province"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select onValueChange={(value) => handleChange('education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="vocational">Vocational Training</SelectItem>
                      <SelectItem value="tertiary">Tertiary Education</SelectItem>
                      <SelectItem value="none">No Formal Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#4c9789] border-b pb-2">
                  Contact Information
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane.uwase@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+250 788 123 456"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#4c9789] border-b pb-2">
                  Emergency Contact
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Parent/Guardian Name"
                      value={formData.emergencyContact}
                      onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="+250 788 000 000"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Program Assignment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#4c9789] border-b pb-2">
                  Program Assignment
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="program">Assign to Program</Label>
                  <Select onValueChange={(value) => handleChange('program', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school-retention">Girls School Retention & Protection</SelectItem>
                      <SelectItem value="ikirarobiz">IkiraroBiz - Skills Development</SelectItem>
                      <SelectItem value="mental-health">Human Capital & Mental Resilience</SelectItem>
                      <SelectItem value="health">Health & Wellness Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about the beneficiary..."
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                  />
                </div>
              </div>

              {/* Account Security Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#4c9789] border-b pb-2">
                  Account Security
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Password will be sent to the beneficiary via email/SMS
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/beneficiaries')}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#4c9789] hover:bg-[#3d7a6e]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Beneficiary
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
