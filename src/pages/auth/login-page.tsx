import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useAuth } from '@/lib/auth-context';
import { UserType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, Lock, User, Heart, Briefcase, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Get return url from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent, role?: UserType) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (role) {
        // Quick login for demo
        await login('', role);
      } else {
        // Standard login
        await login(email);
      }

      toast.success("Successfully logged in");
      
      // Redirect based on role if no specific return url
      if (role === UserType.ADMIN) navigate('/admin');
      else if (role === UserType.BENEFICIARY) navigate('/dashboard');
      else if (role === UserType.DONOR) navigate('/donor');
      else navigate(from);
      
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-sand-50">
      {/* Left Side - Branding (Hidden on mobile) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2c5f56] to-[#1e4139] p-12 flex-col justify-between text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold">L</span>
            </div>
            <span className="text-3xl font-bold tracking-tight">LCEO</span>
          </Link>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back to<br />Life-Changing<br />Endeavor
          </h1>
          <p className="text-xl text-teal-100 leading-relaxed">
            Continue your journey of empowering vulnerable young women and girls in Rwanda.
          </p>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-teal-200 text-sm">Lives Changed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-teal-200 text-sm">Active Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-teal-200 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-2xl font-bold text-teal-900">LCEO</span>
            </Link>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Demo Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="shadow-2xl border-0">
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="text-2xl">Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-teal-600" />
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-teal-600" />
                        Password
                      </Label>
                      <Link 
                        to="/auth/forgot-password" 
                        className="text-sm text-teal-600 hover:text-teal-800 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    className="w-full h-11 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={(e) => handleLogin(e)}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                    Sign In
                  </Button>
                  
                  <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      to="/auth/register" 
                      className="font-medium text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      Create account
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="demo">
              <Card className="shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Demo Access</CardTitle>
                  <CardDescription>
                    Select a role to explore the platform features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto py-4 px-4 border-2 hover:border-teal-500 hover:bg-teal-50 transition-all" 
                      onClick={(e) => handleLogin(e, UserType.ADMIN)}
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="font-semibold text-base">Admin / Staff</span>
                          <span className="text-xs text-gray-500">Manage programs & beneficiaries</span>
                        </div>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto py-4 px-4 border-2 hover:border-red-500 hover:bg-red-50 transition-all" 
                      onClick={(e) => handleLogin(e, UserType.DONOR)}
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="font-semibold text-base">Donor</span>
                          <span className="text-xs text-gray-500">View impact & donations</span>
                        </div>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto py-4 px-4 border-2 hover:border-blue-500 hover:bg-blue-50 transition-all" 
                      onClick={(e) => handleLogin(e, UserType.BENEFICIARY)}
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="font-semibold text-base">Beneficiary</span>
                          <span className="text-xs text-gray-500">Track progress & goals</span>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-teal-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}