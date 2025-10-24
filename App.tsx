import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./src/screens/LoginScreen";

// Prevent Expo from automatically showing a splash
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  useEffect(() => {
    // Immediately hide splash if it appears at all
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return <LoginScreen />;
}
