# 당근 코딩

> 당신 근처의 코딩 테스트 가이드

- [당근 코딩 바로가기](https://carrot-coding.vercel.app/)

## 프로젝트 소개

당근 코딩은 `당신 근처의 코딩 테스트 가이드` 라는 의미로, 코딩 테스트에 필요한 정보들을 보여주는 사이트입니다.

ChatGPT의 `gpt-3.5-turbo` 모델을 사용해 필요한 데이터를 생성하고, 데이터베이스에 저장합니다.

이후 요청에 따라 저장된 데이터를 응답합니다.

## 디렉토리 구조

```
📦src
 ┣ 📂chat-gpt           | ChatGPT 모듈
 ┣ 📂databases          | 데이터베이스 모듈
 ┣ 📂domains            | 도메인 별 라우팅
 ┃ ┣ 📂algorithm
 ┃ ┣ 📂chat-gpt
 ┃ ┗ 📂data-structure
 ┣ 📂exception-filters  | 예외 처리를 위한 필터
 ┣ 📂exceptions         | 커스텀 예외
 ┣ 📂types              | 타입
 ┣ 📂utils              | 유틸리티 함수
```

## 기술 스택

> Front-end 기술 스택은 [carrot-coding](https://github.com/shyuuuuni/carrot-coding/) 레포지토리를 참고해주세요.

- NestJS
- MongoDB
- Mongoose
- openai (ChatGPT API)

## TODOs

- 언어별 소스 코드 신고하기
- 설명 신고하기
- data-structure 도메인 코드 리팩토링
