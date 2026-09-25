# 프로젝트 대시보드

노션 DB 테이블 뷰처럼 여러 프로젝트를 한곳에서 보는 GitHub Pages 사이트입니다.
(Vite + React + TypeScript)

## 프로젝트 추가/수정

1. `content/projects.json` 에 항목 추가

   ```json
   {
     "id": "my-project",          // 영문/숫자/하이픈. 상세 페이지 주소와 md 파일명에 사용
     "icon": "🚀",                 // 선택
     "name": "내 프로젝트",
     "url": "https://...",        // 없으면 ""
     "env": ["PC", "Mobile"],     // 자유 입력 (예: "Tablet")
     "year": 2026,
     "type": "팀"                  // 자유 입력 (팀, 개인, 미니 등)
   }
   ```

2. `content/projects/my-project.md` 에 상세 내용을 Markdown으로 작성
   (표, 체크리스트, 이미지 등 GFM 문법 지원. 파일이 없으면 안내 문구가 표시됩니다.)

3. 대시보드 제목/설명/아이콘은 `content/site.json` 에서 수정합니다.
   태그 색상을 지정하려면 `"tagColors": { "해커톤": "red" }` 를 추가하세요.
   (gray, brown, orange, yellow, green, blue, purple, pink, red)

이미지는 `public/images/` 에 넣고 Markdown에서 `![설명](images/파일명.png)` 로 쓰면 됩니다.

## 로컬 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # dist/ 에 빌드
```

## GitHub Pages 배포

1. GitHub에 저장소를 만들고 `master` 브랜치로 푸시
2. 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 변경
3. 이후 `master` 에 푸시할 때마다 `.github/workflows/deploy.yml` 이 자동으로 빌드·배포합니다.

주소는 `https://<사용자명>.github.io/<저장소명>/` 이며, 상세 페이지는 `#/project/<id>` 형태입니다.
