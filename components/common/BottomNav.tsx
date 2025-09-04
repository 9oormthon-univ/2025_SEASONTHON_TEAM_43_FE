import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';

// 각 탭의 아이콘과 라벨을 커스텀하는 컴포넌트
const TabBarIcon = ({ focused, activeIcon, inactiveIcon, label }) => {
  const iconSource = focused ? activeIcon : inactiveIcon;
  const textColor = focused ? '#D97706' : '#9CA3AF'; // 활성: 주황색, 비활성: 회색

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
      <Image
        source={iconSource}
        style={{ width: 24, height: 24, resizeMode: 'contain' }}
      />
      <Text style={{ color: textColor, fontSize: 12 }}>{label}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 모든 탭 화면의 헤더(상단 제목)를 숨깁니다.
        tabBarShowLabel: false, // 기본 라벨을 숨기고 커스텀 라벨을 사용합니다.
        tabBarStyle: {
          height: 90, // 탭 바의 높이
          backgroundColor: '#FFFFFF', // 탭 바 배경색
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tabs.Screen
        name="map" // `app/(tabs)/map.tsx` 파일과 연결됩니다.
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('../../assets/icons/map_active.png')}
              inactiveIcon={require('../../assets/icons/map_inactive.png')}
              label="빵지도"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="course" // `app/(tabs)/course.tsx` 파일과 연결됩니다.
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('../../assets/icons/course_active.png')}
              inactiveIcon={require('../../assets/icons/course_inactive.png')}
              label="빵코스"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diary" // `app/(tabs)/diary.tsx` 파일과 연결됩니다.
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('../../assets/icons/diary_active.png')}
              inactiveIcon={require('../../assets/icons/diary_inactive.png')}
              label="빵일기"
            />
          ),
        }}
      />
    </Tabs>
  );
}