import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const logout = () => {
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
      <Text>Profile Screen 👤</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}