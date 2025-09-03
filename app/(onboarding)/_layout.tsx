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
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <BackIcon />
            </Pressable>
          )
        }}
      />
      <Stack.Screen name="add-info" options={{ headerShown: false }} />
    </Stack>
  );
}
