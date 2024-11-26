import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { signIn, getCurrentUser } from "../../lib/appwriteConfig";

const SignIn = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isSubmitting, setSubmitting] = useState(false);

 const Submit = async () => {
   if (email === "" || password === "") {
     Alert.alert("Error", "Please fill in all fields");
     return;
   }

   setSubmitting(true);

   try {
     console.log("Attempting sign-in...");
     const session = await signIn(email, password);
     console.log("Session created:", session);

     if (session) {
       console.log("Sign-in successful");

       const result = await getCurrentUser();
       console.log("Current user:", result);

       if (result) {
         Alert.alert("Success", "User signed in successfully" + ' ' + result.firstName);


         console.log("Navigating to /home");
         router.replace("/home");
       } else {
         Alert.alert("Error", "Failed to fetch user data");
       }
     }
   } catch (error) {
     console.error("Error during sign-in process:", error); // Log the error here as well
     Alert.alert("Error", error.message || "Something went wrong");
   } finally {
     setSubmitting(false);
   }
 };



  const [pulseAnimation] = useState(new Animated.Value(1));

  // Pulse animation for the title
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnimation]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.form}>
        <View style={styles.titleWrapper}>
          <Animated.View
            style={[
              styles.pulseCircle,
              { transform: [{ scale: pulseAnimation }] },
            ]}
          />
          <Text style={styles.title}>Sign In</Text>
        </View>
        <Text style={styles.message}>
          Signup now and get full access to our app.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#777"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#777"
          />
        </View>
        <TouchableOpacity
          style={[styles.submit, isSubmitting && { opacity: 0.5 }]}
          onPress={Submit} // No need to pass arguments
          disabled={isSubmitting}
        >
          <Text style={styles.submitText}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#022c5c",
    borderRadius: 5,
  },
  form: {
    width: 350,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  titleWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: "royalblue",
    fontWeight: "600",
    letterSpacing: -1,
    paddingLeft: 30,
    marginBottom: 10,
    marginLeft: 80,
  },
  pulseCircle: {
    position: "absolute",
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "royalblue",
    left: 0,
  },
  message: {
    color: "#000",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 25,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  inputWrapper: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#bebecb",
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
  },
  submit: {
    backgroundColor: "royalblue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
  },
  signin: {
    textAlign: "center",
    color: "#dddde8",
    fontSize: 14,
    marginTop: 10,
  },
  signinLink: {
    color: "royalblue",
    textDecorationLine: "underline",
  },
});

export default SignIn;
