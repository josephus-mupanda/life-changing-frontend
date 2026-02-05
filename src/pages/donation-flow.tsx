import { useState } from 'react';
import { ArrowRight, Check, Heart, CreditCard, Smartphone, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { mockPrograms } from '../lib/mock-data';

interface DonationFlowProps {
  onNavigate: (page: string) => void;
}

export function DonationFlow({ onNavigate }: DonationFlowProps) {
  const [step, setStep] = useState(1);
  const [donationData, setDonationData] = useState({
    program: '',
    type: 'recurring',
    frequency: 'monthly',
    amount: '',
    customAmount: '',
    anonymous: false,
    message: '',
    paymentMethod: '',
    email: '',
    name: '',
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateImpact = (amount: number) => {
    return {
      schoolSupplies: Math.floor(amount / 25),
      monthsOfMentorship: Math.floor(amount / 50),
      businessSeedCapital: Math.floor(amount / 200),
    };
  };

  const selectedAmount = parseInt(donationData.amount || donationData.customAmount || '0');
  const impact = calculateImpact(selectedAmount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Program Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Choose Where to Make an Impact</CardTitle>
              <CardDescription>
                Select a program to support or donate to where needed most
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  donationData.program === 'general'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setDonationData({ ...donationData, program: 'general' })}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Where Needed Most</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow us to direct your donation to areas of greatest need and impact
                    </p>
                    {donationData.program === 'general' && (
                      <Badge className="mt-2 bg-primary">Selected</Badge>
                    )}
                  </div>
                </div>
              </div>

              {mockPrograms.filter(p => p.status === 'active').map((program) => (
                <div
                  key={program.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    donationData.program === program.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setDonationData({ ...donationData, program: program.id })}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-2xl">
                      {program.category === 'education' ? '📚' : program.category === 'entrepreneurship' ? '💼' : '❤️'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{program.name.en}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {program.description.en}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{program.currentBeneficiaries} beneficiaries</span>
                        <span>
                          {Math.round((program.spent / program.budget) * 100)}% funded
                        </span>
                      </div>
                      {donationData.program === program.id && (
                        <Badge className="mt-2 bg-primary">Selected</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleNext}
                  disabled={!donationData.program}
                  className="gap-2"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Donation Type */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Donation Type</CardTitle>
              <CardDescription>
                Monthly giving creates lasting change - join our Impact Circle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={donationData.type}
                onValueChange={(value) =>
                  setDonationData({ ...donationData, type: value })
                }
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <label
                    className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      donationData.type === 'recurring'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="recurring" className="sr-only" />
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Monthly Giving</h3>
                        <Badge className="mt-1 bg-green-100 text-green-700">
                          Recommended
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Join our Impact Circle with recurring monthly support. Predictable funding allows us to plan long-term programs.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Monthly impact reports
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Exclusive beneficiary updates
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Cancel anytime
                      </li>
                    </ul>
                  </label>

                  <label
                    className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      donationData.type === 'one-time'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="one-time" className="sr-only" />
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Heart className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">One-Time Gift</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Make a single donation to support our programs. Every contribution makes a difference.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Immediate impact
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Tax-deductible receipt
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Optional email updates
                      </li>
                    </ul>
                  </label>
                </div>
              </RadioGroup>

              {donationData.type === 'recurring' && (
                <div>
                  <Label className="mb-3 block">Donation Frequency</Label>
                  <RadioGroup
                    value={donationData.frequency}
                    onValueChange={(value) =>
                      setDonationData({ ...donationData, frequency: value })
                    }
                    className="flex gap-4"
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="monthly" />
                      <span>Monthly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="quarterly" />
                      <span>Quarterly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="yearly" />
                      <span>Yearly</span>
                    </label>
                  </RadioGroup>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
                <Button onClick={handleNext} className="gap-2" size="lg">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Amount & Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Donation Amount</CardTitle>
              <CardDescription>
                See the immediate impact of your contribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block">Select Amount (USD)</Label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() =>
                        setDonationData({ ...donationData, amount: amount.toString(), customAmount: '' })
                      }
                      className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                        donationData.amount === amount.toString()
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="custom-amount" className="mb-2 block">
                    Or enter custom amount
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={donationData.customAmount}
                    onChange={(e) =>
                      setDonationData({
                        ...donationData,
                        customAmount: e.target.value,
                        amount: '',
                      })
                    }
                  />
                </div>
              </div>

              {selectedAmount > 0 && (
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-bold mb-4">Your Impact</h3>
                  <div className="space-y-3">
                    {impact.schoolSupplies > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xl">📚</span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {impact.schoolSupplies} girls
                          </div>
                          <div className="text-sm text-muted-foreground">
                            School supplies for full year
                          </div>
                        </div>
                      </div>
                    )}
                    {impact.monthsOfMentorship > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xl">👥</span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {impact.monthsOfMentorship} months
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Of mentorship support
                          </div>
                        </div>
                      </div>
                    )}
                    {impact.businessSeedCapital > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xl">💼</span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {impact.businessSeedCapital} young women
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Business seed capital
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={donationData.anonymous}
                    onCheckedChange={(checked) =>
                      setDonationData({ ...donationData, anonymous: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="anonymous"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make my donation anonymous
                  </label>
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2 block">
                    Personal Message (Optional)
                  </Label>
                  <textarea
                    id="message"
                    className="w-full min-h-24 px-3 py-2 rounded-lg border border-input bg-background"
                    placeholder="Share a message with the LCEO community..."
                    value={donationData.message}
                    onChange={(e) =>
                      setDonationData({ ...donationData, message: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAmount === 0}
                  className="gap-2"
                  size="lg"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Payment Information</CardTitle>
              <CardDescription>
                Secure payment processing - your information is protected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Donation Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${selectedAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {donationData.type === 'recurring'
                      ? `Recurring ${donationData.frequency}`
                      : 'One-time donation'}
                  </span>
                  {donationData.type === 'recurring' && (
                    <span className="text-muted-foreground">Cancel anytime</span>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Payment Method</Label>
                <div className="grid gap-3">
                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
                      donationData.paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={donationData.paymentMethod === 'card'}
                      onChange={(e) =>
                        setDonationData({ ...donationData, paymentMethod: e.target.value })
                      }
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>

                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
                      donationData.paymentMethod === 'mobile'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="mobile"
                      checked={donationData.paymentMethod === 'mobile'}
                      onChange={(e) =>
                        setDonationData({ ...donationData, paymentMethod: e.target.value })
                      }
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span className="font-medium">Mobile Money (MTN, Airtel)</span>
                  </label>

                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
                      donationData.paymentMethod === 'bank'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={donationData.paymentMethod === 'bank'}
                      onChange={(e) =>
                        setDonationData({ ...donationData, paymentMethod: e.target.value })
                      }
                      className="sr-only"
                    />
                    <Building className="w-5 h-5 text-primary" />
                    <span className="font-medium">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="donor-name">Full Name *</Label>
                  <Input
                    id="donor-name"
                    placeholder="John Doe"
                    value={donationData.name}
                    onChange={(e) =>
                      setDonationData({ ...donationData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="donor-email">Email Address *</Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="john@example.com"
                    value={donationData.email}
                    onChange={(e) =>
                      setDonationData({ ...donationData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-green-800">
                    Your payment is secure and encrypted. We never store your payment information.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!donationData.paymentMethod || !donationData.email || !donationData.name}
                  className="gap-2 bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Complete Donation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <Card className="border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Thank You for Your Generosity!</h2>
              
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your donation of <span className="font-bold text-primary">${selectedAmount}</span> will
                make a lasting impact on the lives of young women and girls in Rwanda.
              </p>

              <div className="p-6 bg-accent rounded-lg max-w-md mx-auto mb-8">
                <h3 className="font-bold mb-4">What Happens Next?</h3>
                <ul className="space-y-3 text-left text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <span>You'll receive a confirmation email with your receipt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <span>Monthly impact reports will be sent to your inbox</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <span>You can track your impact through your donor dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate('home')}
                  variant="outline"
                >
                  Return Home
                </Button>
                <Button
                  size="lg"
                  onClick={() => onNavigate('login-donor')}
                  className="gap-2 bg-primary"
                >
                  View My Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-4">Share your support:</p>
                <div className="flex gap-3 justify-center">
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Share on Facebook
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Share on Twitter
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Share via Email
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}