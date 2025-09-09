import React, { useState } from "react";
import {
  Text,
  Switch,
  View,
  Pressable,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import ScrollDownIcon from "../../assets/images/ic_scroll_down.svg";
import ScrollUpIcon from "../../assets/images/ic_scroll_up.svg";
import { Ionicons } from "@expo/vector-icons";

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
  content = "",
}: AgreementItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View className="overflow-hidden bg-white px-6">
      <View className="border-b-[1px] border-grey-3 py-3">
        {/* 헤더 부분 */}
        <View>
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => onValueChange(!value)}
              activeOpacity={0.7}
              className="mr-4 flex-1 flex-row items-center"
            >
              <Ionicons
                name={value ? "checkbox" : "square-outline"}
                size={22}
                color={value ? "#D56E14" : "#9ca3af"}
                style={{ marginRight: 8 }}
              />
              <Text className="text-black body4">
                {title}
                {isRequired && (
                  <Text className="font-bold text-red-500"> *</Text>
                )}
              </Text>
            </TouchableOpacity>

            <Pressable onPress={toggleExpanded}>
              {isExpanded ? <ScrollUpIcon /> : <ScrollDownIcon />}
            </Pressable>
          </View>
        </View>

        {/* 드롭다운 내용 */}
        {content && (
          <Animated.View style={{ maxHeight }}>
            <View className="py-3 pb-3">
              <View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  className="max-h-48"
                >
                  <Text className="text-grey-4 caption1">{content}</Text>
                </ScrollView>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
