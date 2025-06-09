import { AuthScreen } from "./AuthScreen";
import { HomeScreen } from "./HomeScreen";

export const HomePage = () => {
  const user = false;
  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};
