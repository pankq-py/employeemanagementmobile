import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, useColorScheme, Image, Animated } from "react-native"

const SplashScreen = ({ navigation }) => {
    const theme = useColorScheme()
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()

        const timer = setTimeout(() => {
            navigation.replace("EmployeeList")
        }, 3000)
        return () => clearTimeout(timer)
    }, [navigation])

    return (
        <View style={[styles.container, theme === "dark" ? styles.darkMode : styles.lightMode]}>
            {/* Background Image */}
            {/* <Image source={require("../assets/landingImageLight.png")} style={styles.backgroundImage} /> */}
            <Animated.Image
                source={require("../assets/LandingPageImage.png")
                }
                style={[styles.logo, { opacity: fadeAnim }]}
            />

            <Text style={[styles.text, theme === "dark" ? styles.textDark : styles.textLight]}>
                Employee Management Application
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    logo: {
        width: 220,
        height: 220,
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1.5,
    },
    lightMode: {
        backgroundColor: "#fff",
    },
    darkMode: {
        backgroundColor: "#000",
    },
    textLight: {
        color: "#333",
    },
    textDark: {
        color: "#fff",
    },
})

export default SplashScreen
