import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { api } from "../services/api";
import { getToken } from "../services/auth";

export default function DashboardScreen() {
  const [message, setMessage] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setMessage("⚠️ No token found. Please login again.");
          setLoading(false);
          return;
        }

        // call your backend secured endpoint
        const res = await api.get("/Dashboard/GetSummary"); // example endpoint
        setMessage(`✅ API Response: ${JSON.stringify(res.data)}`);
      } catch (error: any) {
        setMessage("❌ Failed to fetch dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00a0e4" />
      ) : (
        <Text style={styles.text}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, textAlign: "center", paddingHorizontal: 20 },
});
