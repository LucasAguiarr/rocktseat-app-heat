import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Home } from "./src/screens/Home";
import AppLoading from "expo-app-loading";
import { COLORS } from "./src/theme";
import { AuthProvider } from "./src/components/hooks/useAuth";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthProvider>
      <StatusBar backgroundColor="transparent" style={"light"} translucent />
      <Home />
    </AuthProvider>
  );
};

export default App;
