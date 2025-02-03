import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  useColorScheme,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Url } from "../APIConstants/APIConstants";
import { commonStyles } from "../styles/commonStyles";
import CustomModal from "../components/CustomModal";
import Loader from "../components/Loader";

const EmployeeListScreen = ({ navigation }) => {
  const theme = useColorScheme();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    icon: "",
    title: "",
  })

  let searchTimeout

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(Url.getEmployees)
      const data = await response.json()
      setEmployees(data)
      setFilteredEmployees(data)
    } catch (error) {
      setModalData({ icon: "error", message: "Failed to fetch employees. Please try again!" })
      console.error("Error fetching employees:", error)
    } finally {
      setIsLoading(false)
    }
  };

  const handleSearch = (text) => {
    setSearchText(text)
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      const filtered = employees.filter((emp) =>
        emp.name.toLowerCase().includes(text.toLowerCase()) ||
        emp.position.toLowerCase().includes(text.toLowerCase()) ||
        emp.department.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredEmployees(filtered)
    }, 700)
  }

  const handleDeletePress = (id) => {
    setSelectedId(id)
    setModalVisible(true)
    setModalData({
      icon: "delete",
      message: "Are you sure you want to delete?",
    })
  }

  const deleteEmployee = async () => {
    setIsLoading(true)
    try {
      await fetch(Url.getEmployeeById.replace("{employeeId}", selectedId), {
        method: "DELETE",
      })
      setEmployees((prev) => prev.filter((emp) => emp._id !== selectedId))
      setFilteredEmployees((prev) => prev.filter((emp) => emp._id !== selectedId))
      setModalVisible(false)
    } catch (error) {
      setModalData({ icon: "delete", message: "Failed to delete employee. Please try again!" })
      console.error("Error deleting employee:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={[styles.mainContainer, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={[commonStyles.button, { width: '80%', marginTop: 0 }]} onPress={() => navigation.navigate("EmployeeForm")}>
          <Text style={commonStyles.buttonText}>Add Employee</Text>
        </TouchableOpacity>
        <View style={[styles.viewSwitch, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
          <TouchableOpacity onPress={() => setIsListView((prev) => !prev)}>
            <Icon name={isListView ? "grid-view" : "list"} size={35} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
        <TextInput
          style={[styles.searchInput, theme === "dark" ? styles.inputDark : styles.inputLight]}
          placeholder="Search Employees..."
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor={theme === "dark" ? "#bbb" : "#666"}
        />
      </View>

      {isListView ? (
        <View style={[styles.tableContainer, theme === "dark" ? styles.tableContainerDark : styles.tableContainerLight]}>
          <View style={[styles.tableHeader, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
            <Text style={styles.tableHeaderTextSrNo}>Sr.No.</Text>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Position</Text>
            <Text style={styles.tableHeaderTextCenter}>Actions</Text>
          </View>
          <FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCellSrNo, theme === "dark" ? styles.textDark : styles.textLight]}>{index + 1}</Text>
                <Text style={[styles.tableCell, theme === "dark" ? styles.textDark : styles.textLight]}>{item.name}</Text>
                <Text style={[styles.tableCell, theme === "dark" ? styles.textDark : styles.textLight]}>{item.position}</Text>
                <View style={[styles.actions, theme === "dark" ? styles.textDark : styles.textLight]}>
                  <Icon name="edit" size={24} color="#3498db" onPress={() => navigation.navigate("EmployeeForm", { employee: item })} />
                  <Icon name="visibility" size={24} color="#2ecc71" onPress={() => navigation.navigate("EmployeeDetail", { employee: item })} />
                  <Icon name="delete" size={24} color="#e74c3c" onPress={() => handleDeletePress(item._id)} />
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{ flex: 1, gap: 25 }}>
          <FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={[styles.gridItem, theme === "dark" ? styles.cardDark : styles.cardLight]}>
                <View style={[styles.avatarContainer, theme === "dark" ? styles.cardDark : styles.cardLight]}>
                  <Image style={styles.avatar} source={{ uri: `https://avatar.iran.liara.run/public/boy?username=${item.name.replaceAll(" ", "") || "default"}.png` }} resizeMode="contain" />
                </View>
                <Text style={[styles.name, theme === "dark" ? styles.textDark : styles.textLight]}>{item.name}</Text>
                <Text style={styles.label}>{item.position}</Text>
                <View style={styles.actionsGrid}>
                  <Icon style={styles.editIcon} name="edit" size={24} color="#3498db" onPress={() => navigation.navigate("EmployeeForm", { employee: item })} />
                  <Icon style={styles.viewIcon} name="visibility" size={24} color="#2ecc71" onPress={() => navigation.navigate("EmployeeDetail", { employee: item })} />
                  <Icon style={styles.deleteIcon} name="delete" size={24} color="#e74c3c" onPress={() => handleDeletePress(item._id)} />
                </View>
              </View>
            )}
          />
        </View>
      )}
      <Loader isLoading={isLoading} />
      <CustomModal
        visible={modalVisible}
        icon={modalData?.icon}
        onClose={() => setModalVisible(false)}
        title={modalData?.message}
        yesButtonFunction={deleteEmployee}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 16 },
  lightBackground: {
    backgroundColor: "#f8f9fa",
  },
  darkBackground: {
    backgroundColor: "#1a1a2e",
  },
  headerButtons: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 2, borderRadius: 5, marginTop: 5 },
  viewSwitch: { justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 10 },
  lightHeader: {
    backgroundColor: "#2980b9",
  },
  darkHeader: {
    backgroundColor: "#34495e",
  },
  searchInput: { flex: 1, borderRadius: 5, padding: 14 },
  inputLight: {
    backgroundColor: "#fff",
    color: "#333",
  },
  inputDark: {
    backgroundColor: "#333",
    color: "#fff",
  },
  tableContainer: { marginTop: 10, borderRadius: 10, elevation: 5 },
  tableContainerLight: {
    backgroundColor: "#fff",
  },
  tableContainerDark: {
    backgroundColor: "#333",
  },
  tableHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderRadius: 5, borderBottomWidth: 1, borderBottomColor: "#bdc3c7" },
  tableHeaderTextSrNo: { flex: .4, fontWeight: "bold", color: "#fff", textAlign: "left" },
  tableHeaderTextCenter: { flex: 1, fontWeight: "bold", color: "#fff", textAlign: "center" },
  tableHeaderText: { flex: 1, fontWeight: "bold", color: "#fff", textAlign: "center" },
  tableRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#bdc3c7" },
  tableCellSrNo: { flex: .3, textAlign: "right", color: "#fff" },
  tableCell: { flex: 1, textAlign: "left", color: "#fff", marginLeft: 10 },
  actions: { flexDirection: "row", justifyContent: "space-around", width: 80 },
  actionsGrid: { flexDirection: "row", justifyContent: "center", marginTop: 20, gap: 15 },
  gridItem: {
    flex: 1,
    padding: 16,
    marginTop: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
    textAlign: "center",
  },
  // editIcon: { marginRight: 10 },
  // viewIcon: { marginRight: 10 },
  // deleteIcon: { marginRight: 10 },
  name: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  label: { fontSize: 14, color: "#999", textAlign: "center" },
  textLight: {
    color: "#000",
  },
  textDark: {
    color: "#fff",
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
  modalView: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
    borderRadius: 10,
    elevation: 10
  },
})

export default EmployeeListScreen;
