import Postcode from "@actbase/react-daum-postcode";
import { View, Dimensions, Alert } from "react-native";
import router from "expo-router";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SearchMyArea() {
  const router = useRouter();

  const getAddressData = (data: any) => {
    const address = data.address;
    // (1) add-info로 이동하며 파라미터 전달
    router.push({
      pathname: "/(onboarding)/add-info",
      params: { address }
    });
  };

  return (
    <View>
      <Postcode
        style={{ width: screenWidth, height: screenHeight }}
        jsOptions={{ animation: true }}
        onSelected={getAddressData}
        onError={(error) => Alert.alert("주소 검색 오류", String(error))}
      />
    </View>
  );
}
