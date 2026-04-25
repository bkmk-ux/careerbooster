import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import API from "../../src/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        email,
        password
      });

      console.log(res.data);
      alert("Login successful!");
    } catch (err:any) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "white"
    }}>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}