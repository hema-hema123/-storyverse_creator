import { Bell, Search, User, LogOut, Sparkles, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import NotificationPanel from "./NotificationPanel";
import StoryChatSheet from "./StoryChatSheet";
import SearchOverlay from "./SearchOverlay";
import { useFirestoreShows } from "@/hooks/useFirestoreShows";

const Navbar = () => {
  const navigate = useNavigate();
  const { shows } = useFirestoreShows();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (path: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    if (sectionId) {
      // If already on /browse, scroll; otherwise navigate first
      if (window.location.pathname === "/browse") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { label: "Home", path: "/browse" },
    { label: "Your Stories", path: "/browse", sectionId: "your-stories" },
    { label: "New & Popular", path: "/browse", sectionId: "new-on-storyverse" },
    { label: "Sentiment", path: "/sentiment" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setShowUserMenu(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between bg-background h-14 px-4 md:px-10">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link to="/browse" className="flex items-center group">
            <img
              src="/logo.png"
              alt="STORYVERSE Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path, link.sectionId)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setChatOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/70 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="hidden md:inline">AI Story Lab</span>
          </button>

          <button
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-accent transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>

            {showNotifications && (
              <NotificationPanel onClose={() => setShowNotifications(false)} />
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="p-1 rounded-full hover:ring-2 ring-primary/60 transition-all"
              aria-label="User menu"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">
                <Link
                  to="/stats"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="pt-20 px-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path, link.sectionId)}
                className="text-left text-lg font-medium py-3 px-4 rounded-xl hover:bg-accent transition-colors"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}
              className="text-left text-lg font-medium py-3 px-4 rounded-xl hover:bg-accent transition-colors flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              AI Story Lab
            </button>

            <button
              onClick={() => { navigate("/stats"); setMobileMenuOpen(false); }}
              className="text-left text-lg font-medium py-3 px-4 rounded-xl hover:bg-accent transition-colors"
            >
              Creator Stats
            </button>

            <div className="border-t border-border my-4" />

            <button
              onClick={handleLogout}
              className="text-left text-lg font-medium py-3 px-4 rounded-xl text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-3"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>
      )}

      {/* AI Story Lab Chat Sheet */}
      <StoryChatSheet
        open={chatOpen}
        onOpenChange={setChatOpen}
        initialPrompt=""
      />

      {/* Search Overlay */}
      <SearchOverlay shows={shows} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
