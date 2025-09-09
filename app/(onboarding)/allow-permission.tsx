import { router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AgreementItem from "../../components/allow-permission/AgreementItem";
import { AGREEMENT_TERMS, AgreementKey } from "../../constants/terms";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllowPermissionScreen() {
  const insets = useSafeAreaInsets();

  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  const toggleSwitch = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = async () => {
    // 필수 3개 동의 체크
    if (!(agreements.service && agreements.privacy && agreements.location))
      return;

    try {
      // 1) 온보딩 완료 플래그
      await AsyncStorage.setItem("onboarding_done", "true");

      // 2) (선택) 동의 상세값 저장: 나중에 설정화면/서버전송에 활용 가능
      await AsyncStorage.setItem(
        "agreement_prefs",
        JSON.stringify({
          ...agreements,
          updatedAt: new Date().toISOString(),
        }),
      );

      // 3) 다음 화면으로 이동
      router.push("/(onboarding)/add-info");
    } catch (e) {
      console.warn("[AllowPermission] 저장 실패:", e);
      // 필요하면 토스트/알럿 처리
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* 스크롤 가능한 동의 항목들 */}
      <ScrollView
        className="flex-1 px-4 pt-6"
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
      <View
        className="bg-white px-4"
        style={{ paddingBottom: insets.bottom + 40 }}
      >
        <TouchableOpacity
          className={`rounded-lg px-20 py-3 ${
            agreements.service && agreements.privacy && agreements.location
              ? "bg-point-3"
              : "bg-gray-300"
          }`}
          onPress={handleNext}
          disabled={
            !(agreements.service && agreements.privacy && agreements.location)
          }
          activeOpacity={
            agreements.service && agreements.privacy && agreements.location
              ? 0.7
              : 1
          }
        >
          <Text
            className={`text-center font-bold body3 ${
              agreements.service && agreements.privacy && agreements.location
                ? "text-point-1"
                : "text-gray-500"
            }`}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
