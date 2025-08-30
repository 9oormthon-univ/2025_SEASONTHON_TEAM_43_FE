import { router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, Switch } from "react-native";

export default function AgreementScreen() {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    location: false,
    marketing: false
  });

  const toggleSwitch = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* 상단 여백 */}
      <View className="h-16" />

      {/* 모두 동의 버튼 */}
      <TouchableOpacity
        className="bg-gray-800 p-4 rounded-2xl mb-8"
        onPress={() => {
          // 모든 동의 항목을 true로 설정
          setAgreements({
            service: true,
            privacy: true,
            location: true,
            marketing: true
          });
        }}
      >
        <Text className="text-white text-center text-lg font-medium">약관에 모두 동의</Text>
      </TouchableOpacity>

      {/* 동의 항목들 */}
      <View className="space-y-4">
        {/* 서비스 이용약관 */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-base">서비스 이용약관 동의</Text>
            <Switch
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={agreements.service ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#e5e7eb"
              onValueChange={() => toggleSwitch("service")}
              value={agreements.service}
            />
          </View>
        </View>

        {/* 개인정보 처리방침 */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-base">개인정보 처리방침 동의</Text>
            <Switch
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={agreements.privacy ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#e5e7eb"
              onValueChange={() => toggleSwitch("privacy")}
              value={agreements.privacy}
            />
          </View>
        </View>

        {/* 위치정보 이용 */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-base">위치정보 이용 동의</Text>
            <Switch
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={agreements.location ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#e5e7eb"
              onValueChange={() => toggleSwitch("location")}
              value={agreements.location}
            />
          </View>
        </View>

        {/* 마케팅 정보 수신 */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-base">마케팅 정보 수신 동의 (선택)</Text>
            <Switch
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={agreements.marketing ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#e5e7eb"
              onValueChange={() => toggleSwitch("marketing")}
              value={agreements.marketing}
            />
          </View>
        </View>
      </View>
      <View className="h-16" />
      <TouchableOpacity 
        className="bg-gray-800 p-4 rounded-2xl" 
        onPress={() => {
          // 필수 동의 항목 3개가 모두 동의되었을 때만 다음 화면으로 이동
          if (agreements.service && agreements.privacy && agreements.location) {
            router.push("/addinfo");
          }
        }}
      >
        <Text className="text-white text-center text-lg font-medium">다음</Text>
      </TouchableOpacity>
    </View>
  );
}
