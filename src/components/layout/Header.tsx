import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, LogOut, User, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { isAuthenticated, username, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const prevCount = useCartStore((s) => s.items.length);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prevCount > 0) {
      setCartAnimating(true);
      const t = setTimeout(() => setCartAnimating(false), 400);
      return () => clearTimeout(t);
    }
  }, [itemCount, prevCount]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-white/90 backdrop-blur-lg shadow-md border-b border-gray-100"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-black text-xl tracking-tight text-gradient">
              Bosta Store
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-red-50 text-primary font-semibold"
                        : "text-gray-600 hover:text-primary hover:bg-red-50/60"
                    }
                `}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <Link
              to={isAuthenticated ? "/cart" : "/login"}
              className="relative p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-red-50 transition-all duration-200"
            >
              <ShoppingCart
                size={22}
                className={`${cartAnimating && "animate-cartBounce"}`}
              />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary/40 hover:bg-red-50/60 transition-all duration-200">
                    <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {username}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/create" className="cursor-pointer">
                      <Plus size={14} className="mr-2" /> Create Product
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut size={14} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={() => navigate("/login")}
                className="btn-gradient text-sm px-5"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to={isAuthenticated ? "/cart" : "/login"}
              className="relative p-2 rounded-lg text-gray-600"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-primary rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-red-50"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1 flex flex-col w-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                   ${
                     isActive
                       ? "bg-red-50 text-primary font-semibold"
                       : "text-gray-600 hover:text-primary hover:bg-red-50/60"
                   }
                  `}
                >
                  {link.label}
                </NavLink>
              );
            })}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={14} className="inline mr-2" />
                Logout ({username})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-primary"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
