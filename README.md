# GazeroTube(유튜브 프로젝트)

## 스택

- React
- mui css

## 설정

```
npx create-react-app ./
```

## 실행

```
npm start
```

## 라이브러리

```
npm i @emotion/react
npm i @emotion/styled
npm i @mui/icons-material
npm i @mui/material
npm i axios
npm i react-player
npm i react-router-dom
```

cf) 최신버전 업데이트

```
npm install --legacy-peer-deps
```

1. @emotion/react: https://www.npmjs.com/package/@emotion/react
2. @emotion/styled: https://www.npmjs.com/package/@emotion/styled
3. @mui/icons-material: https://www.npmjs.com/package/@mui/icons-material
4. @mui/material: https://www.npmjs.com/package/@mui/material
5. axios: https://www.npmjs.com/package/axios
6. react-player: https://www.npmjs.com/package/react-player
7. react-router-dom: https://www.npmjs.com/package/react-router-dom

## API

![iShot_2023-09-25_16 53 59](https://github.com/gayoung106/gazero-tube/assets/98731537/687aad19-a278-4021-9899-4ec1b401abd8)

https://rapidapi.com/ytdlfree/api/youtube-v31

![iShot_2023-09-25_17 28 46](https://github.com/gayoung106/gazero-tube/assets/98731537/0eebbf07-7fbd-45bf-9d2f-d068c3dab937)

## 구조

![iShot_2023-09-25_17 21 15](https://github.com/gayoung106/gazero-tube/assets/98731537/86d188e3-9640-4495-8548-70709104587f)

1. NavBar
2. Feed - Sidebar & Videos

### 특이사항 정리(주로 material ui관련)

- 피드 영역의 백그라운드 컬러를 지정해주 않았는데, 자동으로 백그라운드 컬러가 #000으로 설정됨
  ![iShot_2023-09-25_14 29 46](https://github.com/gayoung106/gazero-tube/assets/98731537/34cce9c7-00ef-47ab-b4b9-c8f55111ca16)
- 현재까지 화면 구조: App컴포넌트-Navbar컴포넌트(안에는 로고와 검색창이 있음) - 이하가 Feed컴포넌트
  ![iShot_2023-09-25_14 32 11](https://github.com/gayoung106/gazero-tube/assets/98731537/7bfae04f-4ea1-4fa2-a957-bd9906fe03d0)
- 일단 혹시 모르니까 Navbar컴포넌트 현재까지 코드 확인

```js
const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: " space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
```

- 잘못생각한 점 Navbar 컴포넌트가 Feed 컴포넌트 보다 상위 컴포넌트에 해당하기 때문에 Navbar에 Stack 태그의 백그라운드 컬러를 상속받는 건가?
- 그래서 찾아봤더니, 자동 상속은 되지 않는다고 함. 무슨 조치를 했기 때문임
- 정답은 App 컴포넌트

```js
const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);
```

- 저 Box태그에 백그라운드 색상을 지정해둔걸 잊음
- 즉, Box컴포넌트의 default 배경색을 #000으로 지정해둔 상태임
