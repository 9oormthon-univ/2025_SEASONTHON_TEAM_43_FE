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
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? <MapActive width={28} height={28} /> : <MapInactive width={28} height={28} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) =>
            focused ? <CourseActive width={28} height={28} /> : <CourseInactive width={28} height={28} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? <DiaryActive width={28} height={28} /> : <DiaryInactive width={28} height={28} />
        }}
      />
    </Tabs>
  );
}
