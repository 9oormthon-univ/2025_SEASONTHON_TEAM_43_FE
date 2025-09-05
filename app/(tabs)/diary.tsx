// 예시: app/(tabs)/diary.tsx 파일

import React from "react";
import { SafeAreaView, View } from "react-native";
import List from "@/components/common/List"; // 1. List 컴포넌트를 불러옵니다.

export default function DiaryScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <View>
        {/* 2. imageSource prop에 require()를 사용해 이미지 경로를 전달합니다. */}
        <List
          imageSource={require("../../assets/images/bread.png")}
          name="성심당"
          description="갓 구운 빵이 일품인 동네 빵집입니다."
          onPress={() => console.log("List 아이템이 눌렸습니다!")}
        />
        <List
          imageSource={require("../../assets/images/bread.png")}
          name="태극당"
          description="갓 구운 빵이 일품인 동네 빵집입니다."
          onPress={() => console.log("List 아이템이 눌렸습니다!")}
        />
        <List
          imageSource={require("../../assets/images/bread.png")}
          name="맛있는 빵집"
          description="갓 구운 빵이 일품인 동네 빵집입니다."
          onPress={() => console.log("List 아이템이 눌렸습니다!")}
        />
        <List
          imageSource={require("../../assets/images/bread.png")}
          name="그냥 빵집"
          description="갓 구운 빵이 일품인 동네 빵집입니다."
          onPress={() => console.log("List 아이템이 눌렸습니다!")}
        />
      </View>
    </SafeAreaView>
  );
}
