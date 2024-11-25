import { ID, Account, Client, Databases, Storage, Avatars, Query } from "react-native-appwrite";


export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.trident.onehome",
  projectId: "673fe45b001e91b5e1d9",
  databaseId: "673fe6b1001d2c3e4d85",
  userCollectionId: "673fe6f3002e3c0c67ef",
  storageId: "673fe9c3001afb02ee15",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

  const account = new Account(client);
//   const storage = new Storage(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);

 export const createUser = async (email, password, username) => {
  try {
    // Step 1: Create an account for the user
    const newAccount = await account.create(ID.unique(), email, password, username);
    console.log("New Account Created:", newAccount); // Debugging

    if (!newAccount || !newAccount.$id) {
      throw new Error("User creation failed: Missing user ID.");
    }

    // Step 2: Generate avatar URL based on user initials (optional)
    const avatarUrl = avatars.getInitials(username).href;

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        AccountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        username: username.toLowerCase().replace(/\s+/g, "_"),
        userBalance: 0, //Initialize user balance
      }
    );

    console.log("User created successfully:", newUser);
    return {newAccount, newUser};
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message || "Failed to create user.");
  }
};

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error.message || "Sign-in failed");
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("AccountId", currentAccount.$id)]
    );

    if (currentUser.documents.length === 0) {
      throw new Error("User data not found");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error fetching current user:", error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    await account.deleteSession("current"); // Deletes the current session
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message || "Unknown error");
    throw new Error(error.message || "Log out failed");
  }
}

