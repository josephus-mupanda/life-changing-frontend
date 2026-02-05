import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Auto-verify after a delay for demo purposes
    const timer = setTimeout(() => {
      setVerificationStatus('success');
      toast.success("Email verified successfully!");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsResending(false);
    toast.success("Verification email resent!");
  };

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-sand-50 flex items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Email Verified!</h2>
              <p className="text-gray-600 mb-8">
                Your email has been successfully verified. You can now access your account and start making an impact.
              </p>
              <Button 
                onClick={() => navigate('/login')}
                className="w-full bg-teal-600 hover:bg-teal-700 h-12"
              >
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-sand-50 flex items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h2>
              <p className="text-gray-600 mb-8">
                The verification link is invalid or has expired. Please request a new verification email.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleResendEmail}
                  className="w-full bg-teal-600 hover:bg-teal-700 h-12"
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    'Resend Verification Email'
                  )}
                </Button>
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full h-12"
                >
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-sand-50 flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Verify Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a verification email to <strong className="text-teal-600">{email}</strong>
            </p>
            <div className="bg-teal-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                Please check your inbox and click the verification link to activate your account.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Didn't receive the email?
              </p>
              <Button 
                onClick={handleResendEmail}
                variant="outline"
                className="w-full border-teal-600 text-teal-700 hover:bg-teal-50"
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Resending...
                  </>
                ) : (
                  'Resend Verification Email'
                )}
              </Button>
              
              <p className="text-sm text-gray-600 pt-4">
                Wrong email?{' '}
                <Link 
                  to="/auth/register" 
                  className="font-medium text-teal-600 hover:text-teal-800 hover:underline"
                >
                  Register again
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
