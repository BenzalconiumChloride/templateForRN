import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser } from "../lib/appwriteConfig";
import { Storage, Databases, ID } from "appwrite";
import { icons } from "../constants";
import { client } from "../lib/appwriteConfig";
import { appwriteConfig } from "../lib/appwriteConfig";
import  base64 from "base-64";

// // Helper function to convert file to Base64
// const fileToBase64 = async (uri) => {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64 string
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

// Helper function to create FormData for file upload
const createFormData = (base64File, filename) => {
  const formData = new FormData();
  formData.append("file", {
    uri: `data:image/png;base64,${base64File}`, // Adjust MIME type as needed
    name: filename,
    type: "image/png", // Adjust MIME type as needed
  });
  return formData;
};

const ProfileInfo = () => {
  const capitalizeName = (name) => {
    if (!name) return "";
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

        // Fetch existing avatar if available
        if (currentUser.avatar) {
          setAvatar(currentUser.avatar);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  // Function to pick an image
const pickImage = async () => {
  try {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Image picker result:", result); // Log the result for debugging

    // Check if the user canceled or if the result is not as expected
    if (result.canceled) {
      alert("Image selection was canceled.");
      return;
    }

    if (!result.assets || result.assets.length === 0) {
      alert("No image selected!");
      return;
    }

    const localUri = result.assets[0].uri;
    const fileName = result.assets[0].fileName;

    // Prepare data for upload
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.$id) {
      throw new Error("User not found. Please log in again.");
    }

    // Convert the local file URI to a Blob
    const response = await fetch(localUri);
    const blob = await response.blob();

    // Create a new File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });

    // Prepare form data for the upload
    const formData = new FormData();
    formData.append("file", file);

    // Perform the file upload to Appwrite Storage
    const uploadResponse = await fetch(
      `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files`,
      {
        method: "POST",
        headers: {
          "X-Appwrite-Project": appwriteConfig.projectId,
          "X-Appwrite-Key": "YOUR_API_KEY", // Replace with your Appwrite API Key
          "Content-Type": "multipart/form-data", // Add this header for the multipart request
        },
        body: formData,
      }
    );

    const uploadResult = await uploadResponse.json();
    console.log("Upload Response:", uploadResult); // Log the response

    if (!uploadResult.$id) {
      throw new Error("File upload failed");
    }

    const avatarUrl = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files/${uploadResult.$id}/preview?project=${appwriteConfig.projectId}`;

    // Update avatar in the database
    const databases = new Databases(client);
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id,
      { avatar: avatarUrl }
    );

    setAvatar(avatarUrl);
    alert("Avatar updated successfully!");
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
