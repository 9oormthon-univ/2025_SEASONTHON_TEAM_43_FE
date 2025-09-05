import React, { useEffect } from "react";
import { useMemo, useRef, useState } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import Constants from "expo-constants";
import { Platform } from "react-native";

// 컴포넌트가 받을 props 타입 정의
interface KakaoMapProps {
  center: {
    latitude: number;
    longitude: number;
  };
  markers?: {
    id: string; // 마커 구분을 위한 id 추가
    latitude: number;
    longitude: number;
    title: string;
  }[];
  zoomLevel?: number;
  onMarkerSelect?: (markerId: string) => void; // 마커 선택 시 호출될 함수
}

const KakaoMap: React.FC<KakaoMapProps> = ({ center, markers = [], zoomLevel = 4, onMarkerSelect }) => {
  const apiKey = Constants.expoConfig?.extra?.kakaoMapJsKey;
  const webviewRef = useRef<WebView>(null);
  console.log(apiKey);
  useEffect(() => {
    const centerScript = `map.setCenter(new kakao.maps.LatLng(${center.latitude}, ${center.longitude}));`;
    webviewRef.current?.injectJavaScript(centerScript);
  }, [center]);

  useEffect(() => {
    const markersJson = JSON.stringify(markers);
    const markerScript = `updateMarkers(${markersJson});`;
    webviewRef.current?.injectJavaScript(markerScript);
  }, [markers]);

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === "marker_select" && onMarkerSelect) {
        onMarkerSelect(message.payload.id);
      }
    } catch (e) {
      console.error("Error parsing message from WebView", e);
    }
  };

  const html = useMemo(
    () => `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services"></script>
      </head>
      <body style="margin:0;padding:0;">
        <div id="map" style="width:100vw;height:100vh;"></div>
        <script type="text/javascript">
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(${center.latitude}, ${center.longitude}),
            level: ${zoomLevel}
          };
          const map = new kakao.maps.Map(container, options);

          let currentMarkers = [];
          function updateMarkers(newMarkers) {
            currentMarkers.forEach(marker => marker.setMap(null));
            currentMarkers = [];

            newMarkers.forEach(markerInfo => {
              const markerPosition = new kakao.maps.LatLng(markerInfo.latitude, markerInfo.longitude);
              const marker = new kakao.maps.Marker({
                position: markerPosition,
                title: markerInfo.title
              });
              marker.setMap(map);
              currentMarkers.push(marker);

              kakao.maps.event.addListener(marker, 'click', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'marker_select',
                  payload: { id: markerInfo.id }
                }));
              });
            });
          }
        </script>
      </body>
    </html>
  `,
    [apiKey, zoomLevel]
  );

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={["*"]}
      source={{ html }}
      // ✅ CHANGED: style을 className으로 변경
      className="flex-1"
      javaScriptEnabled
      onMessage={handleMessage}
      onLoadEnd={() => {
        const markersJson = JSON.stringify(markers);
        webviewRef.current?.injectJavaScript(`updateMarkers(${markersJson});`);
      }}
    />
  );
};

export default KakaoMap;
