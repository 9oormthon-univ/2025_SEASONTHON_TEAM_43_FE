import React from 'react';
import { SvgProps } from 'react-native-svg';

type TabBarIconProps = {
  focused: boolean;
  activeIcon: React.FC<SvgProps>;   
  inactiveIcon: React.FC<SvgProps>; 
  label: string;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  activeIcon,
  inactiveIcon,
  label,
}) => {
  const Icon = focused ? activeIcon : inactiveIcon;
  
  return <Icon width={24} height={24} />;
};

export default TabBarIcon;