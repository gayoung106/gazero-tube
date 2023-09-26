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

### Youtube v3 API 사용

https://rapidapi.com/ytdlfree/api/youtube-v31

![iShot_2023-09-25_16 53 59](https://github.com/gayoung106/gazero-tube/assets/98731537/687aad19-a278-4021-9899-4ec1b401abd8)

### API 받아온 화면 1.

![iShot_2023-09-25_17 28 46](https://github.com/gayoung106/gazero-tube/assets/98731537/0eebbf07-7fbd-45bf-9d2f-d068c3dab937)

### API 받아온 화면 2.

![iShot_2023-09-25_18 25 42](https://github.com/gayoung106/gazero-tube/assets/98731537/877de92e-d58e-4556-9016-d13894bc05de)

### API 받아온 화면 3.

![iShot_2023-09-26_13 20 10](https://github.com/gayoung106/gazero-tube/assets/98731537/d22b3a62-d6fc-4dd4-87a5-0812fc297110)

## 구조

![iShot_2023-09-25_17 21 15](https://github.com/gayoung106/gazero-tube/assets/98731537/86d188e3-9640-4495-8548-70709104587f)

1. NavBar
2. Feed - Sidebar & Videos
3. Videos Feed 부분 - VideoCard & ChannelCard가 있음
4. VideoCard 누르면 - VideoDetail 화면
5. ChannelCard 누르면 - ChannelDetail 화면이 출력

### 특이사항 정리(주로 material ui관련)

1. 첫번째, 스타일 상속?

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

2. 두번째. 재사용 가능한 구성요소

- ChannelCard를 누르면, ChannelDetail 페이지로 이동

```js
 <Box
    sx={{
      boxShadow: "none",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: { xs: "356px", md: "320px" },
      height: "326px",
      margin: "auto",

    }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
  </Box>
```

- ChannelCard는 현재,
  Videos Feed내에 VideoCard들과 함께 섞여서 보여짐
  ![iShot_2023-09-26_13 55 19](https://github.com/gayoung106/gazero-tube/assets/98731537/6d595d46-24f8-4e9c-b0ad-0554259a5ea0)

그리고 ChannelDetail에서 보여짐
![iShot_2023-09-26_13 55 29](https://github.com/gayoung106/gazero-tube/assets/98731537/a3163765-9117-4a91-860d-3e4a56bbb44f)

근데, 별도의 스타일을 추가하고 싶다면?
![iShot_2023-09-26_14 01 18](https://github.com/gayoung106/gazero-tube/assets/98731537/000b9c95-0746-4ef1-8fd1-014705e095e6)

이런식으로 `prop`을 통해 스타일을 전달해주면 됨
