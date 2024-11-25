import { ID, Account, Client, Databases, Storage, Avatars } from "react-native-appwrite";

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

  export const createUser = async (email, password, name) => {
    // Register User
     try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(name).href;

      await signIn(email, password);

       const newUser = await databases.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         ID.unique(),
         {
           accountId: newAccount.$id,
           email: email,
           name: name,
           avatar: avatarUrl,
         }
       );

        console.log("User created successfully:", newUser);
       return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Invalid credentials");
 }
}
  
// Sign In
export async function signIn(email, password) {
  try {
    // Authenticate using email and password
    const session = await account.createEmailSession(email, password);
 console.log("User signed in successfully:", session);
 
    return session;
  } catch (error) {
    throw new Error(error);
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
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// // Sign Out
// export async function signOut() {
//   try {
//     const session = await account.deleteSession("current");

//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Upload File
// export async function uploadFile(file, type) {
//   if (!file) return;

//   const { mimeType, ...rest } = file;
//   const asset = { type: mimeType, ...rest };

//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       asset
//     );

//     const fileUrl = await getFilePreview(uploadedFile.$id, type);
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
