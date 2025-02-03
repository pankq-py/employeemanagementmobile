import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, useColorScheme } from "react-native";

const Loader = ({ isLoading }) => {
  const theme = useColorScheme(); // Detect system theme (dark or light)

  if (!isLoading) return null;

  return (
    <Modal transparent={true} animationType="fade" visible={isLoading}>
      <View style={styles.overlay}>
        <View style={[styles.loaderContainer, theme === "dark" ? styles.loaderDark : styles.loaderLight]}>
          <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#007bff"} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Default semi-transparent background for dark mode
  },
  loaderContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  loaderDark: {
    backgroundColor: "#333", // Dark background for loader in dark mode
  },
  loaderLight: {
    backgroundColor: "#fff", // White background for loader in light mode
  },
});

export default Loader;
