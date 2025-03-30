import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F8F4F9",
        headerStyle: {
          backgroundColor: "#0B0C10",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#0B0C10",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rule"
        options={{
          title: "Rule",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "document-text-outline" : "document-text"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
