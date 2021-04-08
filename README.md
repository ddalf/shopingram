<h1 align="center">Selluvgram</h1>

## 프로젝트 소개

### 주제 선정 이유

"개인 판매자들을 위한 SNS"

최근 sns가 크게 활성화되면서 sns를 통한 개인 사업자의 판매가 다양하게 이루어 지고 있는 것을 볼 수 있다. 그 중에서, 개인 홈페이지나 판매 플랫폼을 지니지 못한 판매자들의 공구 방식은sns –> 블로그 -> 구글/네이버 폼 등을 거쳐 복잡하고 여러 플랫폼을 넘나들며 판매자와 구매자 에게 모두 불편함을 준다. 또한 구매자는 자신이 구입한 상품에 대해 작성한 주문서 정보를 제대로 확인 할 수 없는 불편한 점이 있다. 이런 불편한 점을 개선하고자, ‘Shopingram'은 홈페이지가 없는 개인 사업자들이 기존 Sns에서 진행하는 공구방식을 간단하고 빠르게 판매, 구매할 수 있는 기능을 제공한다.

### 개발 환경

![개발환경](https://user-images.githubusercontent.com/42609000/113991423-62c7bd00-988d-11eb-8bd8-ef994c2dd3dc.png)

### 개발일정

개발기간 : 2019-03 ~ 2019-06

| 일정      | 진행 사항                                 |
| --------- | ----------------------------------------- |
| 1,2주차   | 주제 선정, 유즈케이스 정의서 작성         |
| 3,4주차   | 유즈케이스 다이어그램, 데이터베이스 설계  |
| 5주차     | 클래스 다이어그램, 시퀀스 다이어그램 설계 |
| 6주차     | 스토리보드, UI/UX 디자인                  |
| 7주차     | 웹 구현                                   |
| 8주차     | AWS 서버 구축, Google Cloud API 연동      |
| 9주차     | AWS서버 DB 연동, 웹 구현                  |
| 10,11주차 | 웹 구현                                   |

## Block 설계

![image](https://user-images.githubusercontent.com/42609000/113987387-4de92a80-9889-11eb-866f-dd73e55fb252.png)

## DB 설계

![image](https://user-images.githubusercontent.com/42609000/113991209-32801e80-988d-11eb-9f60-40e04889dbac.png)

## 화면 구성

<table>
  <tr>
    <th><img width="1067" src="https://user-images.githubusercontent.com/42609000/113989261-3b6ff080-988b-11eb-9fde-064577658ec2.png"></th>
    <th><img width="1067" src="https://user-images.githubusercontent.com/42609000/113989414-61959080-988b-11eb-8db3-26b59a444ef4.png"></th>
  </tr>
  <tr>
    <td>회원 가입 페이지</td>
    <td>로그인 페이지</td>
  </tr>
  <tr>
    <td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113989577-8c7fe480-988b-11eb-9ab3-d3458564848b.png"></td>
    <td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113989683-a4efff00-988b-11eb-9676-2d545ee5633b.png"></td>
  </tr>
  <tr>
    <td>추천 사용자 페이지(첫 로그인 시)</td>
    <td>추천 사용자 페이지(팔로우/팔로우 취소)</td>
  </tr> 
  <tr>
    <td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113989912-dc5eab80-988b-11eb-94db-39cb7abbf8a7.png"></td>
    <td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113990013-fe582e00-988b-11eb-949d-47cc51fdb2b3.png"></td>
  </tr>
   <tr>
    <td>메인 페이지</td>
    <td>게시글 작성 페이지</td>
  </tr> 
      <tr>
	<td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113990332-4d05c800-988c-11eb-9f3c-27e9447088f8.png"></td>
    <td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113990180-2a73af00-988c-11eb-8e73-92718b9e15b7.png"></td>
  </tr>
   <tr>
    <td>개인 피드 페이지</td>
    <td>프로필 수정 페이지</td>
  </tr> 
   <tr>
	<td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113990521-80485700-988c-11eb-8ca0-b9f8165586a6.png"></td>
    <td><img width="1067" src="https://user-images.githubusercontent.com/42609000/113990612-9a823500-988c-11eb-803f-8807a2d14d55.png"></td>
  </tr>
   <tr>
    <td>주문서 페이지</td>
    <td>주문서 생성 페이지</td>
  </tr> 
</table>



## 향후 계획(보완 사항)

* 앱과 연동해서 개발한다.

* 휴대폰 인증 서비스를 도입해서 계정 서비스의 보안을 강화한다.

* 위치 기반 서비스를 도입해서 위치 검색을 통해 현재 장소 태그, 근처 마켓 위치 파악, 사용자의 현 위치 정보등을 제공해 줄 수 있다.

*  문자 발송 시스템을 도입해 사용자에게 마켓 정보를 보낼수 있다. 어플 서비스를 제공하여 사용자의 서비스 접근성을 높인다.
