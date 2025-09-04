import React from "react";
import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
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
	variant?: 'short' | 'long';
	placeholderText?: string;
	onSearch: (text: string) => void;
}


export default function SearchBar({
  variant = 'long',
  placeholderText = "원하는 빵집을 찾아보세요",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(''); // 입력된 검색어 상태
  const [isFocused, setIsFocused] = useState(false); // 입력창 포커스 상태

  // 검색어 초기화
  const clearQuery = () => {
    setQuery('');
  };

  // 검색을 실행하는 함수 (예: 엔터 키를 눌렀을 때)
  const handleSearch = () => {
    onSearch(query);
    // 필요하다면 여기에 "빵집 검색중..." 상태로 변경하는 로직 추가
  };

  const widthClass = variant === 'short' ? 'w-[271px]' : 'w-[327px]';
  
  // 입력 상태에 따른 안내 문구 색상을 결정
  const placeholderColor = isFocused && !query ? '#787878' : '#222222';

  return (
    <View
      className={`
        flex-row items-center bg-white h-11 rounded-full px-5
        ${widthClass}
        border border-gray-200
      `}
      style={{
        // iOS를 위한 그림자 설정
        shadowColor: '#222222',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        
        // Android를 위한 그림자 설정
        elevation: 8,
      }}
    >
      <Ionicons name="search" size={20} color="#787878" />

      <TextInput
        className="flex-1 ml-3 text-base text-black"
        placeholder={placeholderText}
        placeholderTextColor={placeholderColor}
        value={query}
        onChangeText={setQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      {query.length > 0 && (
        <TouchableOpacity onPress={clearQuery}>
          <Ionicons name="close-circle" size={20} color="#787878" />
        </TouchableOpacity>
      )}
    </View>
  );
}