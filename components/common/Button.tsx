import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons'; // 아이콘 라이브러리
import clsx from 'clsx'; // 조건부 클래스네임 라이브러리


// 버튼 컴포넌트가 받을 Props 타입 정의함 이때 fab, long, short의 버튼 타입을 가지며 색상은 ts config 참고
interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'fab' | 'long' | 'short';
  icon?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'long',
  icon = false,
  className,
  ...rest
}: ButtonProps) => {
  // 버튼: 기본 스타일과 Props에 따른 동적 스타일 -> clsx 조절

  // 버튼 컨테이너랑 텍스트 스타일 둘 다  Variant, Size에 따라 구별
  const containerClasses = clsx(
    'flex-row items-center justify-center rounded-full active:opacity-80',
    {
      'bg-primary': variant === 'primary',
      'bg-secondary': variant === 'secondary',

      'px-8 py-5 rounded-3xl': size === 'fab', // FAB는 좀 더 큰 패딩과 둥근 모서리
      'w-full py-4': size === 'long',
      'px-5 py-3': size === 'short',
    },
    className, // 추가적인 스타일을 받을 수 있도록 className prop을 열어둡니다.
  );

  const textClasses = clsx('font-bold', {
    'text-white': variant === 'primary',
    'text-secondary-dark': variant === 'secondary',

    'text-lg': size === 'fab' || size === 'long',
    'text-base': size === 'short',
  });

  // 아이콘 색상
  const iconColor = variant === 'primary' ? 'white' : '#A98E71';

  return (
    <TouchableOpacity className={containerClasses} {...rest}>
      {icon && (
        <Feather
          name="plus"
          size={size === 'short' ? 18 : 22}
          color={iconColor}
          className="mr-2" 
        />
      )}
      <Text className={textClasses}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;