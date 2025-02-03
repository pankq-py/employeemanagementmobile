import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { Url } from "../APIConstants/APIConstants";
import { commonStyles } from "../styles/commonStyles";
import CustomModal from "../components/CustomModal";
import Loader from "../components/Loader";

const EmployeeFormScreen = ({ route, navigation }) => {
  const theme = useColorScheme();
  const employee = route.params?.employee || null;

  const [employeeData, setEmployeeData] = useState({
    name: employee?.name || "",
    position: employee?.position || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    department: employee?.department || "",
    salary: employee ? String(employee.salary) : "",
    country: employee?.country || "",
    state: employee?.state || "",
    district: employee?.district || "",
  })
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    icon: "",
    title: "",
  })

  const handleChange = (key, value) => {
    setEmployeeData(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleSubmit = async () => {
    const { name, position, email, phone, department, salary, country, state, district } = employeeData

    if (!name?.trim()) {
      setModalData({ icon: "error", message: "Name is required!" })
      setModalVisible(true)
      return
    }

    if (!position?.trim()) {
      setModalData({ icon: "error", message: "Position is required!" })
      setModalVisible(true)
      return
    }

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setModalData({ icon: "error", message: "Enter a valid email!" })
      setModalVisible(true)
      return
    }

    if (!phone?.trim() || !/^\d{10}$/.test(phone)) {
      setModalData({ icon: "error", message: "Phone number must be 10 digits!" })
      setModalVisible(true)
      return
    }

    if (!department?.trim()) {
      setModalData({ icon: "error", message: "Department is required!" })
      setModalVisible(true)
      return
    }

    if (!salary || isNaN(salary) || Number(salary) <= 0) {
      setModalData({ icon: "error", message: "Salary must be a positive number!" })
      setModalVisible(true)
      return
    }

    if (!country?.trim()) {
      setModalData({ icon: "error", message: "Country is required!" })
      setModalVisible(true)
      return
    }

    if (!state?.trim()) {
      setModalData({ icon: "error", message: "State is required!" })
      setModalVisible(true)
      return
    }

    if (!district?.trim()) {
      setModalData({ icon: "error", message: "District is required!" })
      setModalVisible(true)
      return
    }

    const url = employee
      ? Url.getEmployeeById.replace("{employeeId}", employee._id)
      : Url.getEmployees

    const method = employee ? "PUT" : "POST"

    const object = { ...employeeData, salary: Number(salary) }
    setIsLoading(true)
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      })

      console.log(`Employee ${employee ? "updated" : "added"} successfully!`, object)

      setModalData({
        icon: "check",
        message: `Employee ${employee ? "updated" : "added"} successfully!`
      })
      setModalVisible(true)
      // navigation.goBack()
    } catch (error) {
      console.error("Error saving employee:", error)
      setModalData({ icon: "error", message: "Failed to save employee. Please try again!" })
      setModalVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setModalVisible(false)
    modalData.icon == "check" && navigation.navigate('EmployeeList')
  }

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.form, theme === "dark" ? styles.formDark : styles.formLight]}>
              <Text style={[styles.heading, theme === "dark" ? styles.textDark : styles.textLight]}>
                {employee ? "Update Employee" : "Add Employee"}
              </Text>

              {Object.keys(employeeData).map((key, index) => (
                <View key={index}>
                  <Text style={[styles.label, theme === "dark" ? styles.textDark : styles.textLight]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Text>
                  <TextInput
                    style={[styles.input, theme === "dark" ? styles.inputDark : styles.inputLight]}
                    value={employeeData[key]}
                    onChangeText={(value) => handleChange(key, value)}
                    keyboardType={key === "email" ? "email-address" : key === "phone" || key === "salary" ? "numeric" : "default"}
                    placeholder={`Enter ${key}`}
                    placeholderTextColor={theme === "dark" ? "#bbb" : "#666"}
                    maxLength={key === "phone" ? 10 : undefined}
                  />
                </View>
              ))}

              <TouchableOpacity style={commonStyles.button} onPress={handleSubmit}>
                <Text style={commonStyles.buttonText}>{employee ? "Update Employee" : "Add Employee"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.button, { backgroundColor: "#6756d6" }]}
                onPress={() => navigation.goBack()}
              >
                <Text style={commonStyles.buttonText}>{employee ? "Cancel" : "Back"}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <CustomModal
        visible={modalVisible}
        icon={modalData?.icon}
        onClose={handleModalClose}
        title={modalData?.message}
      />
      <Loader isLoading={isLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: "#1a1a2e",
  },
  lightBackground: {
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  form: {
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  formLight: {
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  formDark: {
    backgroundColor: "#333",
    borderColor: "#555",
    borderWidth: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  inputLight: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    color: "#333",
  },
  inputDark: {
    backgroundColor: "#333",
    borderColor: "#555",
    color: "#fff",
  },
  textLight: {
    color: "#333",
  },
  textDark: {
    color: "#fff",
  },
})

export default EmployeeFormScreen;
