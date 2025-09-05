import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import MapActive from "../../assets/icons/map_active.svg";
import MapInactive from "../../assets/icons/map_inactive.svg";
import MakerActive from "../../assets/icons/maker_active.svg";
import MakerInactive from "../../assets/icons/maker_inactive.svg";
import DiaryActive from "../../assets/icons/diary_active.svg";
import DiaryInactive from "../../assets/icons/diary_inactive.svg";

// CustomTabBarIcon 컴포넌트를 SVG를 받도록 수정합니다.
const CustomTabBarIcon = ({
  focused,
  ActiveIcon,
  InactiveIcon,
  label
}: {
  focused: boolean;
  ActiveIcon: React.ElementType; // SVG 컴포넌트 타입을 받습니다.
  InactiveIcon: React.ElementType;
  label: string;
}) => {
  const textColor = focused ? "#D97706" : "#9CA3AF";
  const Icon = focused ? ActiveIcon : InactiveIcon;

  return (
    <View style={{ alignItems: "center", justifyContent: "center", gap: 4 }}>
      <Icon width={24} height={24} />
      <Text style={{ color: textColor, fontSize: 11 }}>{label}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          height: 80,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84
        }
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "빵지도",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            // active/inactive SVG 컴포넌트를 props로 전달합니다.
            <CustomTabBarIcon focused={focused} ActiveIcon={MapActive} InactiveIcon={MapInactive} label="빵지도" />
          )
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} ActiveIcon={MakerActive} InactiveIcon={MakerInactive} label="빵코스" />
          )
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} ActiveIcon={DiaryActive} InactiveIcon={DiaryInactive} label="빵일기" />
          )
        }}
      />
    </Tabs>
  );
}
