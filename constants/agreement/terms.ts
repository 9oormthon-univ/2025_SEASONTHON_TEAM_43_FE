export const AGREEMENT_TERMS = {
  service: {
    title: "서비스 이용약관 동의",
    content: `빵생빵사 서비스를 이용하기 위한 기본 약관입니다.
    - 본 서비스는 빵집 정보 및 코스 공유 플랫폼입니다
    - 사용자는 정확한 정보를 제공해야 합니다
    - 부적절한 콘텐츠 게시 시 이용이 제한될 수 있습니다
    - 서비스 이용 중 발생하는 문제에 대해서는 관련 법령에 따라 처리됩니다`,
    isRequired: true
  },
  privacy: {
    title: "개인정보 처리방침 동의",
    content: `개인정보 수집 및 이용에 대한 안내입니다.
    수집하는 개인정보:
      - 카카오 계정 정보 (닉네임, 프로필 사진)
      - 서비스 이용 기록 (작성한 코스, 조회한 빵집)
      - 위치 정보 (현재 위치 기반 빵집 검색 시)

    이용 목적:
      - 서비스 제공 및 운영
      - 사용자 맞춤 콘텐츠 제공
      - 고객 지원

    보유 기간:서비스 탈퇴 시까지`,
    isRequired: true
  },
  location: {
    title: "위치정보 이용 동의",
    content: `위치 정보 수집 및 이용에 대한 약관입니다.
  위치정보 수집 목적:
    - 현재 위치 주변 빵집 검색
    - 빵집까지의 거리 및 경로 제공
    - 코스 경로 안내
  
  수집 방식: GPS, 네트워크 기반 위치 정보
  이용 기간: 서비스 이용 중
  제3자 제공: 지도 서비스 제공을 위한 카카오맵 API 연동 시에만 제공`,
    isRequired: true
  },
  marketing: {
    title: "마케팅 정보 수신 동의 (선택)",
    content: `새로운 빵집 정보, 이벤트 소식 등을 받아보시겠습니까?
  수신 방법: 앱 푸시 알림
  수신 내용: 신규 빵집 정보, 추천 코스, 이벤트 안내`,
    isRequired: false
  }
} as const;

export type AgreementKey = keyof typeof AGREEMENT_TERMS;
