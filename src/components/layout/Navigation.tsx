
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusSquare, label: "Create", path: "/create" },
    { icon: Heart, label: "Activity", path: "/activity" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 border-r bg-white/80 backdrop-blur-lg">
        <div className="flex flex-col w-full p-4">
          <h1 className="text-2xl font-bold mb-8 px-4">Nexus.comm</h1>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
