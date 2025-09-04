import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBox({
  interestArea,
  setInterestArea
}: {
  interestArea: string;
  setInterestArea: (text: string) => void;
}) {
  return (
    <View className="bg-white px-5 py-[13px] rounded-[25px] items-center flex-row" style={styles.shadow}>
      <TextInput
        className="flex-1 body4 font-suit-regular font-normal text-grey-4"
        placeholder="내 지역을 찾아보세요"
        placeholderTextColor="#9ca3af"
        value={interestArea}
        onChangeText={setInterestArea}
        onPress={() => {
          // 검색창 클릭 시 동작 -> 검색 화면으로 이동
          console.log("검색창 클릭됨");
        }}
      />
    </View>
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
