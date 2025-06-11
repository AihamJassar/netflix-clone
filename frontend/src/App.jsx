import { Navigate, Route, Routes } from "react-router";
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { HomePage } from "./pages/Home/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { WatchPage } from "./pages/WatchPage";

function App() {
  const { user, authCheck, isLoading } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  console.log(user);
  if (isLoading)
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-span text-red-600 size-10" />
        </div>
      </div>
    );

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

export default App;
