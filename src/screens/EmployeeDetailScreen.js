import React from "react";
import { View, Text, Button, StyleSheet, Image, useColorScheme, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";

const EmployeeDetailScreen = ({ route, navigation }) => {
  const theme = useColorScheme()
  const employee = route.params.employee || {}

  const avatarUrl = `https://avatar.iran.liara.run/public/boy?username=${employee.name.replaceAll(" ", "") || "default"}.png`

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
      <View style={[styles.avatarContainer, theme === "dark" ? styles.cardDark : styles.cardLight]}>
        <Image style={styles.avatar} source={{ uri: avatarUrl }} resizeMode="contain" />
      </View>

      <Text style={[styles.title, theme === "dark" ? styles.textDark : styles.textLight]}>
        {employee.name || "N/A"}
      </Text>

      <View style={[styles.infoContainer, theme === "dark" ? styles.cardDark : styles.cardLight]}>
        {[
          { label: "Position", value: employee.position },
          { label: "Email", value: employee.email },
          { label: "Phone", value: employee.phone },
          { label: "Department", value: employee.department },
          { label: "Salary", value: `₹${employee.salary || "0"}` },
          { label: "Location", value: `${employee.district || "N/A"}, ${employee.state || "N/A"}, ${employee.country || "N/A"}` }
        ].map((item, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={[styles.label, theme === "dark" ? styles.textDark : styles.textLight]}>
              {item.label}:
            </Text>
            <Text style={[styles.value, theme === "dark" ? styles.textDark : styles.textLight]}>
              {item.value || "N/A"}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={commonStyles.button}
        onPress={() => navigation.navigate("EmployeeForm", { employee })}
      >
        <Text style={commonStyles.buttonText}>Edit Employee</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[commonStyles.button, { backgroundColor: "#6756d6" }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={commonStyles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // justifyContent: "center",
    alignItems: "center",
  },
  darkBackground: {
    backgroundColor: "#1a1a2e",
  },
  lightBackground: {
    backgroundColor: "#f8f9fa",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
  },
  cardLight: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  cardDark: {
    backgroundColor: "#333",
    borderColor: "#555",
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
  },
  textLight: {
    color: "#333",
  },
  textDark: {
    color: "#fff",
  },
})

export default EmployeeDetailScreen;
