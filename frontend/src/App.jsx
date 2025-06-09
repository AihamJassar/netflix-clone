import { Route, Routes } from "react-router";
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { HomePage } from "./pages/Home/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
