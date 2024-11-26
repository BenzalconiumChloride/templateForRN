import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser } from "../lib/appwriteConfig";
import { Storage, Databases, ID } from "appwrite"; // Import necessary Appwrite classes
import { icons } from "../constants";
import { client } from "../lib/appwriteConfig";
import { appwriteConfig } from "../lib/appwriteConfig";

const ProfileInfo = () => {
  const capitalizeName = (name) => {
    if (!name) return ""; // Handle empty strings
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const [avatar, setAvatar] = useState(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          throw new Error("No user data found.");
        }

        setFirstName(currentUser.firstName);
        setLastName(currentUser.lastName);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  // Function to pick an image
  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled && result.uri) {
        const localUri = result.uri;

        // Ensure the URI is valid before proceeding
        if (!localUri) {
          alert("No image selected!");
          return;
        }

        // Convert local URI to a file object
        const uriParts = localUri.split(".");
        if (uriParts.length < 2) {
          alert("Invalid file type");
          return;
        }

        const fileType = uriParts[uriParts.length - 1]; // Get the file extension (e.g., "jpg")
        const file = {
          uri: localUri,
          name: `avatar.${fileType}`,
          type: `image/${fileType}`,
        };

        // Initialize Appwrite Storage and Databases
        const storage = new Storage(client); // Initialize the storage service
        const databases = new Databases(client); // Initialize the databases service

        // Get current user
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.$id) {
          throw new Error("User not found. Please log in again.");
        }

        // Upload the image to storage
        const avatarFile = await storage.createFile(
          appwriteConfig.storageId,
          ID.unique(),
          file // Pass the file object here
        );

        if (!avatarFile || !avatarFile.$id) {
          throw new Error("Failed to upload avatar.");
        }

        // Get the file URL
        const avatarUrl = storage.getFilePreview(
          appwriteConfig.storageId,
          avatarFile.$id
        ).href;

        // Update user's avatar in the database
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          currentUser.$id,
          { avatar: avatarUrl }
        );

        setAvatar(avatarUrl); // Update avatar state
        alert("Avatar updated successfully!");
      } else {
        alert("Image selection cancelled or invalid");
      }
    } catch (error) {
      console.error("Error picking image or updating avatar:", error);
      alert(error.message || "Failed to update avatar.");
    }
  };

  return (
    <View
      className="flex-row mt-1"
      style={{ backgroundColor: "#e0e1e2", padding: 10 }}
    >
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              avatar ? { uri: avatar } : require("../assets/icons/profile.png") // Fallback to default avatar
            }
            style={styles.avatar}
          />
          <View style={styles.editIcon}>
            <Image source={icons.edit} style={{ width: 20, height: 20 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>
          {firstName && lastName
            ? `${capitalizeName(firstName)} ${capitalizeName(lastName)}`
            : "User not found"}
        </Text>
        <Text style={styles.infoText}>alishaparker@mail.com</Text>
        <Text style={styles.infoText}>+01 234 567 8899</Text>
        <Text style={styles.infoText}>Date of registration: 8/8/2024</Text>
        <Text style={styles.infoText}>Acct # 123456789</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  detailsContainer: {
    alignItems: "start",
    marginLeft: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default ProfileInfo;
