import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View>
      <Text>Modal</Text>
      <EditScreenInfo path="app/modal.tsx" />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

