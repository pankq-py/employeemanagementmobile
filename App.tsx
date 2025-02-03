import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeListScreen from "./src/screens/EmployeeListScreen";
import EmployeeFormScreen from "./src/screens/EmployeeFormScreen";
import EmployeeDetailScreen from "./src/screens/EmployeeDetailScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { useColorScheme } from "react-native";

const Stack = createStackNavigator()

const App = () => {
  const theme = useColorScheme()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="EmployeeList"
          component={EmployeeListScreen}
          options={{
            title: "Employees",
            headerShown: true,
            headerStyle: {
              backgroundColor: theme === "dark" ? "#34495e" : "#2980b9",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="EmployeeForm"
          component={EmployeeFormScreen}
          options={{
            title: "Add / Update Employee",
            headerStyle: {
              backgroundColor: theme === "dark" ? "#34495e" : "#2980b9",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetailScreen}
          options={{
            title: "Employee Details",
            headerStyle: {
              backgroundColor: theme === "dark" ? "#34495e" : "#2980b9",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
