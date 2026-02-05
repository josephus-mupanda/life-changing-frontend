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
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-teal-900 text-white transition-all duration-300 ease-in-out">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-[#eacfa2]">
            LCEO
          </Link>
          <p className="text-xs text-teal-300 mt-1 uppercase tracking-wider">{currentUserType} Portal</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-teal-800 text-white shadow-sm ring-1 ring-teal-700" 
                    : "text-teal-100 hover:bg-teal-800/50 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-teal-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar className="h-9 w-9 border-2 border-teal-600">
              <AvatarImage src="" />
              <AvatarFallback className="bg-teal-800 text-[#eacfa2] font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName || 'User'}</p>
              <p className="text-xs text-teal-400 truncate">{user?.email || 'No email'}</p>
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
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="md:hidden border-b bg-white h-16 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
           <Link to="/" className="text-xl font-bold text-teal-900">
            LCEO
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-teal-900" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-teal-900 text-white border-none w-[280px] sm:w-[350px]">
              <div className="py-6 h-full flex flex-col">
                <h2 className="text-2xl font-bold text-[#eacfa2] mb-1 px-4">LCEO</h2>
                <p className="text-xs text-teal-300 mb-8 px-4 uppercase tracking-wider">{currentUserType} Portal</p>
                
                <nav className="space-y-2 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-teal-800"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="pt-6 border-t border-teal-800 mt-auto">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <Avatar className="h-9 w-9 border border-teal-600">
                            <AvatarFallback className="bg-teal-800 text-[#eacfa2]">{initials}</AvatarFallback>
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
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
