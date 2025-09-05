import React from "react";
import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* 
if나 props로 전달받은 상태에 따라서 입력중, 빵집 검색중(#787878), 원하는 빵집을 찾아보세요(#222222) 텍스트 랜더링 
Padding(13 20 13 20 10 Top,Right,Bottom,Left Color: #FEFEFE)
상단 header로 고정하는데 이때 property에서 header를 커스텀 할 수 있는 다양한 옵션 제공
headerBackImage : 헤더 왼쪽 부분을 그려주는 영역으로 뒤로가기 액션 포함 
HeaderRight : 헤더 우측에 해당하는 영역
HeaderShown : 헤더가 보여질지 아닐지에 대한 여부
search bar 
short: W(271) H(44) R(25) P(13 20 13 20 10)
long : W(327) H(44) R(25) P(13 20 13 20 10)
*/

type SearchBarProps = {
  onPress: () => void;
	variant?: 'short' | 'long';
	placeholderText?: string;
}


export default function SearchBar({
  onPress,
  placeholderText = '원하는 빵집을 찾아보세요',
  variant = 'long',
}: SearchBarProps) {
  const widthClass = variant === 'short' ? 'w-[271px]' : 'w-[327px]';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`
        flex-row items-center bg-white h-12 rounded-full px-5
        ${widthClass}
        border border-gray-200
      `}
      style={{
        shadowColor: '#222222',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Ionicons name="search" size={20} color="#787878" />
      <Text className="flex-1 ml-4 text-base text-gray-500">
        {placeholderText}
      </Text>
    </TouchableOpacity>
  );
}
