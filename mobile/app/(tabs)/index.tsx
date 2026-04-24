import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import API from "../../src/services/api";

export default function HomeScreen() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    API.get("/")
      .then((res) => {
        console.log("API RESPONSE:", res.data);
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Backend not reachable");
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});