# childcare-records

Telegram Web App 기반 육아기록 입력 UI 저장소.

## 현재 MVP
- 수유 기록 Web App
- 자연 텍스트 명령 전송 포맷
  - 예: `수유기록 120ml 분유 16:30 잠결수유`
- GitHub Pages 정적 배포 전제

## 디렉토리
- `webapp/` — Telegram Web App 프론트엔드 MVP

## 배포 방향
GitHub Pages로 `webapp/` 정적 파일을 배포한다.

## 현재 상태
정식 Telegram `web_app_data` structured payload 수신 전까지는,
Web App이 사람이 봐도 덜 어색한 자연 텍스트 명령을 생성하고,
홈봇이 그 텍스트를 파싱해 저장하는 방향으로 운용한다.
