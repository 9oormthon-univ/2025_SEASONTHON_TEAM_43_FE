import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";

export default function TabExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Tab Explore</Text>
      <EditScreenInfo path="app/(tabs)/explore.tsx" />
    </View>
  );
}

