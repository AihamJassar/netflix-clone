import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

export const AuthScreen = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handelFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };
  return (
    <div className="hero-bg relative">
      {/* Header */}
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

      {/*Hero */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited Movies, TV Shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart membership.
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handelFormSubmit}
        >
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

      {/*Separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true"></div>

      {/*1st Section */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2 ">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, Playstation, Xbox, Chromecase, Apply TV,
              Blu-ray players, and more.
            </p>
          </div>
          <div className="flex-1 relative">
            <img src="/tv.png" alt="TV image" className="mt-4 relative z-20" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/*Separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true"></div>

      {/*2nd Section */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2 ">
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things image"
                className="mt-4"
              />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-20 border border-slate-500 rounded-md px-2">
                <img
                  src="stranger-things-sm.png"
                  alt="Stranger Things image"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="Download image"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/*Separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true"></div>

      {/*3rd Section */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2 ">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet, laptop
              and TV.
            </p>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Device image"
              className="mt-4 relative z-20"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/*Separator */}
      <div className="h-2 w-full bg-[#232323] aria-hidden:true"></div>

      {/*4th Section */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2 ">
          {/* Lift side */}
          <div className="flex-1 relative">
            <img src="kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* Right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kikes
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventure with favorite characters in a space made
              just fro them-time with your membership.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};
