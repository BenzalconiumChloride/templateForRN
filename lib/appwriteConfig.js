import { ID, Account, Client } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.trident.onehome",
  projectId: "673fe45b001e91b5e1d9",
  databaseId: "673fe6b1001d2c3e4d85",
  userCollectionId: "673fe6f3002e3c0c67ef",
  storageId: "673fe9c3001afb02ee15",
}

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

  const account = new Account(client);

  export const createUser = async () => {
    // Register User
    try {
      const response = await account.create(ID.unique(), email, password, name);
      console.log("User created:", response);
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  
