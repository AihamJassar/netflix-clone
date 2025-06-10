import { useState } from "react";
import { Link } from "react-router";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  console.log(user);
  return (
    <header className="flex flex-wrap items-center justify-between max-w-6xl mx-auto p-4 h-20">
      <div className="flex items-center gap-1- z-50">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="Logo" className="w-32 sm:w-40" />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden sm:flex items-center gap-2">
          <Link to={""} className="hover:underline">
            Movies
          </Link>
          <Link to={""} className="hover:underline">
            TV Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border border-gray-800 rounded">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};
