import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* My CV */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/my-cv")}
      >
        <Ionicons
          name="document-text"
          size={32}
          color="black"
        />

        <Text style={styles.cardText}>
          My CV
        </Text>
      </TouchableOpacity>

      {/* Create CV */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/create-cv")}
      >
        <Ionicons
          name="add-circle"
          size={32}
          color="black"
        />

        <Text style={styles.cardText}>
          Create CV
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutCard}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out"
          size={32}
          color="white"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  cardText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },

  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    justifyContent: "center",
  },

  logoutText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
});