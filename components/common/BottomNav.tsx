import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';
import TabBarIcon from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tabs.Screen
        name="map"
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
        name="course"
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
        name="diary"
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