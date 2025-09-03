import { router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AgreementItem from "../../components/allow-permission/AgreementItem";
import { AGREEMENT_TERMS, AgreementKey } from "../../constants/terms";

export default function AllowPermissionScreen() {
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
    <View className="flex-1 bg-white">
      {/* 상단 고정 영역 */}
      <View className="bg-white pt-16 px-4 pb-4">
        {/* 모두 동의 버튼 */}
        <TouchableOpacity
          className="bg-gray-800 p-4 rounded-2xl"
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
          <Text className="text-white text-center text-lg font-bold">약관에 모두 동의</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 가능한 동의 항목들 */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="space-y-4">
          {/* 서비스 이용약관 */}
          <AgreementItem
            title={AGREEMENT_TERMS.service.title}
            value={agreements.service}
            onValueChange={(value) => toggleSwitch("service")}
            isRequired={AGREEMENT_TERMS.service.isRequired}
            content={AGREEMENT_TERMS.service.content}
          />

          {/* 개인정보 처리방침 */}
          <AgreementItem
            title={AGREEMENT_TERMS.privacy.title}
            value={agreements.privacy}
            onValueChange={(value) => toggleSwitch("privacy")}
            isRequired={AGREEMENT_TERMS.privacy.isRequired}
            content={AGREEMENT_TERMS.privacy.content}
          />

          {/* 위치정보 이용 */}
          <AgreementItem
            title={AGREEMENT_TERMS.location.title}
            value={agreements.location}
            onValueChange={(value) => toggleSwitch("location")}
            isRequired={AGREEMENT_TERMS.location.isRequired}
            content={AGREEMENT_TERMS.location.content}
          />

          {/* 마케팅 정보 수신 */}
          <AgreementItem
            title={AGREEMENT_TERMS.marketing.title}
            value={agreements.marketing}
            onValueChange={(value) => toggleSwitch("marketing")}
            isRequired={AGREEMENT_TERMS.marketing.isRequired}
            content={AGREEMENT_TERMS.marketing.content}
          />
        </View>
      </ScrollView>

      {/* 하단 고정 영역 */}
      <View className="bg-white px-4 pb-8 pt-4">
        <TouchableOpacity
          className={`p-4 rounded-2xl ${
            agreements.service && agreements.privacy && agreements.location ? "bg-gray-800" : "bg-gray-300"
          }`}
          onPress={() => {
            // 필수 동의 항목 3개가 모두 동의되었을 때만 다음 화면으로 이동
            if (agreements.service && agreements.privacy && agreements.location) {
              router.push("/(onboarding)/add-info");
            }
          }}
          disabled={!(agreements.service && agreements.privacy && agreements.location)}
          activeOpacity={agreements.service && agreements.privacy && agreements.location ? 0.7 : 1}
        >
          <Text
            className={`text-center text-lg font-bold ${
              agreements.service && agreements.privacy && agreements.location ? "text-white" : "text-gray-500"
            }`}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
