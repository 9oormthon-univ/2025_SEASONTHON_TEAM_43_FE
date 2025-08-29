import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View>
      <Text>Tab Two</Text>
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

