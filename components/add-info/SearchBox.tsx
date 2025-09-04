import React from "react";
import router from "expo-router";
import { View, TextInput, StyleSheet, Pressable } from "react-native";

export default function SearchBox({
  onPress,
  interestArea,
  setInterestArea
}: {
  onPress: () => void;
  interestArea: string;
  setInterestArea: (text: string) => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-white px-5 py-[13px] rounded-[25px] items-center flex-row" style={styles.shadow}>
        <TextInput
          className="flex-1 body4 font-suit-regular font-normal text-grey-4"
          placeholder="내 지역을 찾아보세요"
          placeholderTextColor="#9ca3af"
          value={interestArea}
          editable={false} // 표시용
          pointerEvents="none" // 터치 이벤트는 Pressable이 받도록
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    // iOS
    shadowColor: "#222222",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Android
    elevation: 25
  }
});
