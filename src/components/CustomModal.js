import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomModal = ({ visible, onClose, icon, title, yesButtonFunction, children }) => {
    const theme = useColorScheme(); // Detect system theme
    const isDarkMode = theme === "dark";

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, isDarkMode ? styles.modalDark : styles.modalLight]}>
                    <Text style={[styles.modalIcon, isDarkMode ? styles.modalTextDark : styles.modalTextLight]}>
                        {icon == "error" && <Icon name="error-outline" size={50} color="#ffcc00" />}
                        {icon == "check" && <Icon name="check-circle-outline" size={50} color="#2ecc71" />}
                        {icon == "delete" && <Icon name="delete-outline" size={50} color="#e74c3c" />}
                    </Text>
                    <Text style={[styles.modalTitle, isDarkMode ? styles.modalTextDark : styles.modalTextLight]}>
                        {title}
                    </Text>
                    {children}
                    <View style={styles.modalButtonContainer}>
                        {yesButtonFunction && (
                            <TouchableOpacity style={[styles.modalButtons, styles.modalYesButton]} onPress={yesButtonFunction}>
                                <Text style={styles.modalCloseText}>Yes</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={[styles.modalButtons, styles.modalNoButton]} onPress={onClose}>
                            <Text style={styles.modalCloseText}>{yesButtonFunction ? "No" : "OK"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalLight: {
        backgroundColor: "#fff",
    },
    modalDark: {
        backgroundColor: "#2C2C2C",
    },
    modalIcon: {
        fontSize: 18,
        fontWeight: "bold",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBlock: 10,
    },
    modalTextLight: {
        color: "#000",
    },
    modalTextDark: {
        color: "#fff",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "50%",
        gap: 50,
    },
    modalButtons: {
        width: "45%",
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        fontWeight: "bold",
    },
    modalYesButton: {
        backgroundColor: "#e74c3c",
    },
    modalNoButton: {
        backgroundColor: "#3498db",
    },
    modalCloseText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CustomModal;
