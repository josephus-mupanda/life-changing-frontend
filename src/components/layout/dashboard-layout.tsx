import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  PieChart, 
  Settings, 
  LogOut, 
  Menu,
  Heart,
  Target,
  FileText,
  Calendar,
  BookOpen,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { motion } from "motion/react";

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // If no user, we might be in a public state or redirecting. 
  // ProtectedRoute handles the redirect, but for rendering:
  const currentUserType = user?.userType || UserType.ADMIN;

  const getNavItems = () => {
    switch (currentUserType) {
      case UserType.BENEFICIARY:
        return [
          { href: "/dashboard", label: "My Journey", icon: LayoutDashboard },
          { href: "/dashboard/goals", label: "My Goals", icon: Target },
          { href: "/dashboard/tracking", label: "Weekly Tracking", icon: Calendar },
          { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        ];
      case UserType.DONOR:
        return [
          { href: "/donor", label: "Impact Overview", icon: LayoutDashboard },
          { href: "/donor/donations", label: "My Donations", icon: Heart },
          { href: "/donor/reports", label: "Impact Reports", icon: PieChart },
        ];
      case UserType.ADMIN:
      default:
        return [
          { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
          { href: "/admin/beneficiaries", label: "Beneficiaries", icon: Users },
          { href: "/admin/programs", label: "Programs", icon: Target },
          { href: "/admin/donors", label: "Donors", icon: Heart },
          { href: "/admin/financial", label: "Financial", icon: DollarSign },
          { href: "/admin/reports", label: "Reports", icon: PieChart },
          { href: "/admin/settings", label: "Settings", icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for Desktop - Now Fixed */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-gradient-to-b from-[#2c5f56] to-[#1e4139] text-white fixed h-screen shadow-2xl">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <span className="text-xl font-bold text-white">L</span>
            </motion.div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-sand-100 transition-colors">LCEO</span>
          </Link>
          <p className="text-xs text-white/60 mt-2 uppercase tracking-wider font-medium">{currentUserType} Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
            return (
              <motion.div 
                key={item.href}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-white/10 text-white shadow-lg ring-1 ring-white/20" 
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white/10 text-white font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName || 'User'}</p>
              <p className="text-xs text-white/60 truncate">{user?.email || 'No email'}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 transition-all"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content Area - Now with left margin for sidebar */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-white h-16 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-teal-900">LCEO</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-teal-900" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gradient-to-b from-teal-900 to-teal-950 text-white border-none w-[280px] sm:w-[350px]">
              <div className="py-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2 px-4">
                  <div className="w-10 h-10 rounded-full bg-sand-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-sand-300">L</span>
                  </div>
                  <span className="text-2xl font-bold text-sand-200">LCEO</span>
                </div>
                <p className="text-xs text-teal-300 mb-8 px-4 uppercase tracking-wider font-medium">{currentUserType} Portal</p>
                
                <nav className="space-y-1 flex-1 overflow-y-auto px-2">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            isActive 
                              ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-lg" 
                              : "hover:bg-teal-800/60"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="pt-6 border-t border-teal-800/50 mt-auto">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <Avatar className="h-9 w-9 border border-teal-600">
                      <AvatarFallback className="bg-teal-800 text-sand-300">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-teal-300 hover:text-white hover:bg-teal-800"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}