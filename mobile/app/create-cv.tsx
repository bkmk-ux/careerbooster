import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../src/services/api";

export default function CreateCV() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  const handleCreateCV = async () => {
    try {
      if (
        !fullName.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !summary.trim()
      ) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }

      // Get logged-in user
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        Alert.alert("Error", "User not found");
        return;
      }

      const user = JSON.parse(storedUser);

      // Convert comma-separated text into arrays
      const skillsArray = skills
        .split(",")
        .map((item) => item.trim());

      const educationArray = education
        .split(",")
        .map((item) => item.trim());

      const experienceArray = experience
        .split(",")
        .map((item) => item.trim());

      // API request
      const res = await API.post("/cv/create", {
        userId: user.id,
        fullName,
        email,
        phone,
        summary,
        skills: skillsArray,
        education: educationArray,
        experience: experienceArray,
      });

      console.log(res.data);

      Alert.alert("Success", "CV created successfully");

      // Optional: clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setSummary("");
      setSkills("");
      setEducation("");
      setExperience("");

    } catch (error: any) {
      console.log(error.response?.data || error.message);

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create CV"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your CV</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="Professional Summary"
        value={summary}
        onChangeText={setSummary}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TextInput
        placeholder="Skills (comma separated)"
        value={skills}
        onChangeText={setSkills}
        style={styles.input}
      />

      <TextInput
        placeholder="Education (comma separated)"
        value={education}
        onChangeText={setEducation}
        style={styles.input}
      />

      <TextInput
        placeholder="Experience (comma separated)"
        value={experience}
        onChangeText={setExperience}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateCV}
      >
        <Text style={styles.buttonText}>Create CV</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});