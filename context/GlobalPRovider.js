import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [isLoading, setIsLoading] = useState(true); // Loading state during initialization

  // Function to log in a user
  const login = async (userData) => {
    try {
      // Save user data to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Function to log out a user
  const logout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  // Restore user state from AsyncStorage when the app starts
  const restoreUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error restoring user data:", error);
    } finally {
      setIsLoading(false); // Finished loading
    }
  };

  // Effect to restore user on app start
  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoading, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
