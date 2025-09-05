import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const myLocationImage = require('../../assets/icons/location_here.png');

type MyLocationButtonProps = {
  onPress: () => void;
};

export default function MyLocationButton({ onPress }: MyLocationButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="absolute bottom-80 right-5 w-12 h-12 rounded-full bg-white justify-center items-center shadow-md z-20"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image source={myLocationImage} className="w-full h-full" resizeMode="contain" />
    </TouchableOpacity>
  );
}
