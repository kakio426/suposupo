import "./globals.css";

export const metadata = {
  title: "수포수포 | 더하기 숲",
  description: "타이핑 없는 4지 선다형 수학 퀴즈 앱"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
