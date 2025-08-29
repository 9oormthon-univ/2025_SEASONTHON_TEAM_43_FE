import React from "react";
import { Text, View } from "react-native";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View className="p-4 border border-dashed border-gray-400 rounded-md">
      <Text>Open up the code for this screen:</Text>
      <Text className="text-sm">{path}</Text>
      <Text className="text-sm">Change any of the text, save the file, and your app will automatically update.</Text>
    </View>
  );
}

