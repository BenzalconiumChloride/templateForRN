import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { getCurrentUser } from "../lib/appwriteConfig"; 

const QRCodeGenerator = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = await getCurrentUser(); // Fetch current user from Appwrite
        if (!currentUser) {
          throw new Error("No user data found.");
        }
        setUserId(currentUser.AccountId); // Use the AccountId for the QR Code
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!userId) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to fetch user ID</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QRCode
        value={userId} // The QR Code contains the user's AccountId
        size={150}
        color="black"
        backgroundColor="white"
      />
      <Text style={styles.userIdText}>User ID: {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  userIdText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default QRCodeGenerator;
