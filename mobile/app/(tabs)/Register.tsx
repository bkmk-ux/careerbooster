import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import API from "../../src/services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await API.post("/register", {
        name,
        email,
        password
      });

      console.log(res.data);
      alert("Registered successfully!");
    } catch (err:any) {
      console.log(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "white"
    }}>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}