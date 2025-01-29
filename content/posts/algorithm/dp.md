+++
title = "분할정복 (Devide and Conquer)"
date = "2024-11-02T11:57:18Z"
author = "sayoon"
tags = ["알고리즘"]
keywords = ["그리디", "분할정복", "dp"]
description = "DP 알고리즘을 연습해보자"
showFullContent = false
readingTime = false
hideComments = false
+++

## 특징

: 문제를 두 단계 `1) 분할` 과 `2) 정복`으로 나눠서 해결하는 것

1. `분할`

   - 주어진 문제를 여러개의 부분 문제로 나눈다
   - 문제가 작아지면 작아질수록 풀기 쉬워지는 성질을 이용

2. `정복`
   - 분할한 문제를 이용하여 문제를 해결
   - 문제의 크기가 줄어든다면(`N=1`)? 바로 답을 구할 수 있음  
     → 재귀 호출의 `base case(탈출조건)`과 같다
   - 더 큰 케이스에서 `base case`를 이용하여 문제의 답을 구함

<br/>

## 조건

- 문제를 부분으로 쪼갤 수 있을 때
- 쪼갠 문제를 합치는 것이 월등하게 빠를 때

ex) 병합정렬, 이분탐색, 거듭제곱연산...

<br/>

## 예시: 히스토그램에서 가장 큰 직사각형 구하기

![dp](dp_01.webp)

<br/>

## 문제

<a href="/posts/probs/2104" class="button">2104: 부분배열 고르기</a>  
<a href="/posts/probs/1463" class="button">1463: 1로 만들기</a>  
<a href="/posts/probs/1149" class="button">1149: RGB 거리</a>

업데이트 중...
