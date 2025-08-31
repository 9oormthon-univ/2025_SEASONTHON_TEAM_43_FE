import React, { useState } from "react";
import { Text, View, Switch, TouchableOpacity, Animated, ScrollView } from "react-native";

interface AgreementItemProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isRequired?: boolean;
  content?: string;
}

export default function AgreementItem({
  title,
  value,
  onValueChange,
  isRequired = false,
  content = ""
}: AgreementItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-2">
      {/* 헤더 부분 */}
      <View className="p-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={toggleExpanded} className="flex-1 mr-4" activeOpacity={0.7}>
            <Text className="text-black text-base font-bold">
              {title}
              {isRequired && <Text className="text-red-500 font-bold"> *</Text>}
            </Text>
          </TouchableOpacity>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
            thumbColor={value ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#e5e7eb"
            onValueChange={onValueChange}
            value={value}
          />
        </View>

        {/* 드롭다운 화살표 */}
        <TouchableOpacity onPress={toggleExpanded} className="mt-2" activeOpacity={0.7}>
          <Text className="text-gray-500 text-sm font-bold">
            {isExpanded ? "▼ 약관 내용 접기" : "▶ 약관 내용 보기"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 드롭다운 내용 */}
      {content && (
        <Animated.View style={{ maxHeight }}>
          <View className="px-4 pb-4">
            <View className="border-t border-gray-100 pt-4">
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} className="max-h-48">
                <Text className="text-gray-600 text-sm leading-5 font-bold">{content}</Text>
              </ScrollView>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
