import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import HomePage from '@/pages/home-page';
import { PublicLayout } from '@/components/layout/public-layout';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AdminDashboard } from '@/pages/admin-dashboard';
import { BeneficiariesPage } from '@/pages/admin/beneficiaries-page';
import { ProgramsPage } from '@/pages/programs-page';
import ProgramDetailsPage from '@/pages/program-details-page';
import BeneficiaryDashboard from '@/pages/dashboard/BeneficiaryDashboard';
import DonorDashboard from '@/pages/dashboard/DonorDashboard';
import DonationPage from '@/pages/donation-page';
import LoginPage from '@/pages/auth/login-page';
import RegisterPage from '@/pages/auth/register-page';
import ForgotPasswordPage from '@/pages/auth/forgot-password-page';
import ResetPasswordPage from '@/pages/auth/reset-password-page';
import VerifyEmailPage from '@/pages/auth/verify-email-page';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { UserType } from '@/lib/types';
import { ScrollToTopOnRoute } from '@/components/scroll-to-top-route';

// Import new pages
import GoalsPage from '@/pages/beneficiary/goals-page';
import TrackingPage from '@/pages/beneficiary/tracking-page';
import ResourcesPage from '@/pages/beneficiary/resources-page';
import DonationsPage from '@/pages/donor/donations-page';
import ImpactReportsPage from '@/pages/donor/impact-reports-page';
import DonorsPage from '@/pages/admin/donors-page';
import FinancialPage from '@/pages/admin/financial-page';
import ReportsPage from '@/pages/admin/reports-page';
import SettingsPage from '@/pages/admin/settings-page';
import AddBeneficiaryPage from '@/pages/admin/add-beneficiary-page';
import AddDonorPage from '@/pages/admin/add-donor-page';
import { AboutPage } from '@/pages/about-page';
import HowWeWorkPage from '@/pages/how-we-work-page';
import StrategicDirectionPage from '@/pages/strategic-direction-page';
import { ImpactStoriesPage } from '@/pages/impact-stories-page';
import { ContactPage } from '@/pages/contact-page';
import { ResourcesPage as PublicResourcesPage } from '@/pages/resources-page';
import { GetInvolvedPage } from '@/pages/get-involved-page';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTopOnRoute />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/strategic-direction" element={<StrategicDirectionPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:id" element={<ProgramDetailsPage />} />
            <Route path="/impact" element={<ImpactStoriesPage />} />
            <Route path="/resources" element={<PublicResourcesPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonationPage />} />
          </Route>

          {/* Authentication Routes (No Layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserType.ADMIN]} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="beneficiaries" element={<BeneficiariesPage />} />
              <Route path="beneficiaries/add" element={<AddBeneficiaryPage />} />
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="donors" element={<DonorsPage />} />
              <Route path="donors/add" element={<AddDonorPage />} />
              <Route path="financial" element={<FinancialPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Beneficiary Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserType.BENEFICIARY]} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<BeneficiaryDashboard />} />
              <Route path="goals" element={<GoalsPage />} />
              <Route path="tracking" element={<TrackingPage />} />
              <Route path="resources" element={<ResourcesPage />} />
            </Route>
          </Route>

          {/* Donor Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserType.DONOR]} />}>
            <Route path="/donor" element={<DashboardLayout />}>
              <Route index element={<DonorDashboard />} />
              <Route path="donations" element={<DonationsPage />} />
              <Route path="reports" element={<ImpactReportsPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}