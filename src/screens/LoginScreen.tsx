import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authenticateUser } from "../services/authService";
import ForgotPasswordModal from "@/src/components/ForgotPasswordModal";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const success = await authenticateUser(username, password);
      if (success) {
        Alert.alert("Login Successful", `Welcome, ${username}!`);
        // navigation.navigate('Dashboard'); // later
      } else {
        setError("Invalid Username or Password.");
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Ionicons name="log-in-outline" size={18} color="#fff" />
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowForgot(true)}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <ForgotPasswordModal
          visible={showForgot}
          onClose={() => setShowForgot(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", justifyContent: "center" },
  form: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#00a0e4",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#00a0e4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 10,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 6 },
  forgotPassword: { color: "#00a0e4", marginTop: 10, textAlign: "right" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});
