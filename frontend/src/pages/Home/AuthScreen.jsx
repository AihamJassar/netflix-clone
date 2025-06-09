import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export const AuthScreen = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="hero-bg relative">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        </Link>

        <Link
          to={"/signup"}
          className="text-white bg-red-600 py-1 px-2 rounded"
        >
          Sign Up
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited Movies, TV Shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart membership.
        </p>
        <form className="flex flex-col md:flex-row gap-4 w-1/2">
          <input
            type="email"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            placeholder="you@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-lx lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex items-center justify-center">
            Get started
            <ChevronRight />
          </button>
        </form>
      </div>
    </div>
  );
};
