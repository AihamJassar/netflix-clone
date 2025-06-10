import { useAuthStore } from "../../store/authUser";
import { AuthScreen } from "./AuthScreen";
import { HomeScreen } from "./HomeScreen";

export const HomePage = () => {
  
  const { user } = useAuthStore();
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
