import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/login");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}