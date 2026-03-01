import { Redirect } from "expo-router";
import { useAuth } from "@/auth/AuthProvider";

export default function Index() {
  const { isLoggedIn } = useAuth();
  return <Redirect href={isLoggedIn ? "/(tabs)" : "/(auth)"} />;
}