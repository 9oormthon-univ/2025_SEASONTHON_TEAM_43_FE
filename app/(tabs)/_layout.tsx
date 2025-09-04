import React from "react";
import { Tabs } from "expo-router";

import MapActive from "../../assets/images/ic_map_active.svg";
import MapInactive from "../../assets/images/ic_map_inactive.svg";
import CourseActive from "../../assets/images/ic_course_active.svg";
import CourseInactive from "../../assets/images/ic_course_inactive.svg";
import DiaryActive from "../../assets/images/ic_diary_active.svg";
import DiaryInactive from "../../assets/images/ic_diary_inactive.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // 비활성/활성 색상 지정
        tabBarActiveTintColor: "#D56E14", // point.3
        tabBarInactiveTintColor: "#999999", // 비활성 회색 (원하는 값으로 변경)

        // 라벨 공통 스타일
        tabBarLabelStyle: {
          fontFamily: "SUITSemiBold", // tailwind fontFamily에서 등록한 폰트 key
          fontSize: 12 // caption1 사이즈처럼 직접 지정 가능
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "빵지도",
          tabBarIcon: ({ focused }) =>
            focused ? <MapActive width={28} height={28} /> : <MapInactive width={28} height={28} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "빵코스",
          tabBarIcon: ({ focused }) =>
            focused ? <CourseActive width={28} height={28} /> : <CourseInactive width={28} height={28} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "빵일기",
          tabBarIcon: ({ focused }) =>
            focused ? <DiaryActive width={28} height={28} /> : <DiaryInactive width={28} height={28} />
        }}
      />
    </Tabs>
  );
}
