// app/(onboarding)/_layout.tsx
import { Stack, router } from "expo-router";
import { Pressable } from "react-native";
import BackIcon from "../../assets/images/ic_back.svg";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="allow-permission"
        options={{
          title: "이용약관 동의",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SUITBold",
            fontSize: 20,
            fontWeight: "bold",
            color: "#282625"
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.replace("/(auth)/login");
              }}
              className="items-center justify-center h-7 w-7"
            >
              <BackIcon className="item-center" />
            </Pressable>
          )
        }}
      />
      <Stack.Screen
        name="add-info"
        options={{
          title: "회원정보 입력",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SUITBold",
            fontSize: 20,
            fontWeight: "bold",
            color: "#282625"
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.replace("/(auth)/login");
              }}
              className="items-center justify-center h-7 w-7"
            >
              <BackIcon className="item-center" />
            </Pressable>
          )
        }}
      />
      <Stack.Screen
        name="search-myarea"
        options={{
          title: "내 지역 찾기",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SUITBold",
            fontSize: 20,
            fontWeight: "bold",
            color: "#282625"
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
              className="items-center justify-center h-7 w-7"
            >
              <BackIcon className="item-center" />
            </Pressable>
          )
        }}
      />
    </Stack>
  );
}
