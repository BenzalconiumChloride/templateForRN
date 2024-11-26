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
import { useRouter, Link, router } from "expo-router"; // Import useRouter for navigation
import { createUser } from "../../lib/appwriteConfig";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [lastName, setlastName] = useState("");

  const router = useRouter(); // Initialize router

  const Submit = async () => {
    if (!firstName === "" || !lastName === "" || !email === "" || !password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Exit early
    }

    setSubmitting(true);
    try {
      const result = await createUser(email, password, firstName, lastName);
      Alert.alert("Success", "Account created successfully!");

      // Redirect to the Sign In page
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Pulse animation for the title
  const [pulseAnimation] = useState(new Animated.Value(1));

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
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <Text style={styles.message}>
          Signup now and get full access to our app.
        </Text>
        <View style={styles.flex}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setfirstName}
              style={styles.input}
              placeholderTextColor="#777"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setlastName}
              style={styles.input}
              placeholderTextColor="#777"
            />
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
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
});

export default SignUp;
