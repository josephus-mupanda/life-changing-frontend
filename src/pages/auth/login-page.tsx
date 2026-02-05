import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@/lib/auth-context';
import { UserType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, Lock, User, Heart, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      //Wait for state update to propagate? No, login is async but state update might be batched.
      // We can check the role we just used or let the auth context handle it.
      // Since we don't have the user object immediately available here after await (unless we return it),
      // we can infer the redirect based on the role we asked for.
      
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-teal-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or <span className="font-medium text-teal-600 hover:text-teal-500 cursor-pointer">apply for a program</span>
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="demo">Demo Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email and password to access your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700" 
                  onClick={(e) => handleLogin(e)}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                  Sign In
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card>
              <CardHeader>
                <CardTitle>Demo Access</CardTitle>
                <CardDescription>
                  Select a role to explore the platform features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12" 
                  onClick={(e) => handleLogin(e, UserType.ADMIN)}
                  disabled={isLoading}
                >
                  <Briefcase className="mr-2 h-5 w-5 text-teal-600" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Admin / Staff</span>
                    <span className="text-xs text-gray-500">Manage programs & beneficiaries</span>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12" 
                  onClick={(e) => handleLogin(e, UserType.DONOR)}
                  disabled={isLoading}
                >
                  <Heart className="mr-2 h-5 w-5 text-red-500" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Donor</span>
                    <span className="text-xs text-gray-500">View impact & donations</span>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12" 
                  onClick={(e) => handleLogin(e, UserType.BENEFICIARY)}
                  disabled={isLoading}
                >
                  <User className="mr-2 h-5 w-5 text-blue-500" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Beneficiary</span>
                    <span className="text-xs text-gray-500">Track progress & goals</span>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
