// remote/response/auth.ts

export type AuthContextType = {
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthReady: boolean;
};

export type KakaoLoginRequest = {
  accessToken: string;
};

export type KakaoLoginResponse = {
  accessToken: string;
  userEmail?: string;
  userName?: string;
  userId?: number;
};

export type LogoutResponse = {
  id: string;
};
