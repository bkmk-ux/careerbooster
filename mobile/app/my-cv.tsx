import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../src/services/api";

export default function MyCV() {
  const [cv, setCV] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCV();
  }, []);

  const fetchCV = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        console.log("User not found");
        return;
      }

      const user = JSON.parse(storedUser);

      const res = await API.get(`/cv/${user.id}`);

      setCV(res.data);

    } catch (error: any) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // No CV found
  if (!cv) {
    return (
      <View style={styles.center}>
        <Text>No CV found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{cv.fullName}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.text}>{cv.email}</Text>

      <Text style={styles.label}>Phone</Text>
      <Text style={styles.text}>{cv.phone}</Text>

      <Text style={styles.label}>Professional Summary</Text>
      <Text style={styles.text}>{cv.summary}</Text>

      <Text style={styles.label}>Skills</Text>
      {cv.skills.map((skill: string, index: number) => (
        <Text key={index} style={styles.item}>
          • {skill}
        </Text>
      ))}

      <Text style={styles.label}>Education</Text>
      {cv.education.map((edu: string, index: number) => (
        <Text key={index} style={styles.item}>
          • {edu}
        </Text>
      ))}

      <Text style={styles.label}>Experience</Text>
      {cv.experience.map((exp: string, index: number) => (
        <Text key={index} style={styles.item}>
          • {exp}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
  },

  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});