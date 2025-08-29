import React from "react";
import { Text, View } from "react-native";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View className="flex-1">
      <View className="mt-3 items-center">
        <Text className="text-lg font-medium">Open up the code for this screen:</Text>
        <View>
          <Text className="text-sm">{path}</Text>
        </View>
        <Text className="text-sm">Change any of the text, save the file, and your app will automatically update.</Text>
      </View>
    </View>
  );
}

