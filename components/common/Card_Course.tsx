import React from "react";
import { View, Image, Text, ImageSourcePropType, TouchableOpacity } from "react-native";
/*
W(327) H(218) R(12) C(#FFFFFF)
텍스트는 맛도리 빵 코스 | 빵집 2개 후 바로 밑줄에 한 줄 소개 
텍스트는 (295*46) 왼오(16) 위(152) 밑(20) -> 175-150까지 텍스트 
재사용을 위해 index에서 각 컴포넌트를 Import한다
*/
interface CardViewProps {
	imageSource: ImageSourcePropType;
	name: string;
	address: string;
	onPress?: ()=> void;
}

const CardView = ({imageSource, name, address, onPress }: CardViewProps) => (
	<TouchableOpacity
		onPress={onPress}
		activeOpacity={0.8}
		className="bg-white rounded-xl m-5 shadow-lg">
		<Image 
			source={imageSource}
			className="w-full h-52 rounded-t-xl"/>

		<View className="p-4">
			<Text className="font-bold text-xl mb-1 text-gray-800">{name}</Text>
			<Text className="text-base text-gray-600">{address}</Text>
		</View>
	</TouchableOpacity>

);


export default CardView;
