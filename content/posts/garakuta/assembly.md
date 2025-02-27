+++
title = "어셈블리 명령어들.md"
date = "2024-11-03T12:39:11+09:00"
author = "sayoon"
tags = ["뭐했더라"]
keywords = ["assembly", "어셈블리", "x86"]
description = "x86 어셈블리 명령어들"
showFullContent = false
readingTime = false
hideComments = false
+++

## 기초적인 임플란트다

`x86` IntelMac 기준?

### 1. section

세 개의 section 존재

- `section.data` : 초기값이 있는 전역 변수, static 변수 선언
- `section.text`: 코드를 작성 공간
- `section.bbs`: 추가적 변수 선언 공간

<br/>

### 2. 문법

어셈블리어는 정해진 표준이 없고, CPU에 따라 여러 종류의 문법이 존재한다. x64 Intel 기준

`Opcode Operand1, Operand2 ; 주석`

- `[]`: 해당 메모리 주소에 있는 값을 가져온당 -> 두 번 이상 올 수 없슴

<br/>

### 3. 레지스터

**3.1 범용**

- `rax (accumulator)`: 산술, 논리 연산을 위한 레지스터, _표준 규약에 따라 return 시 rax 반환_
- `rbx (base)`: 메모리 주소 저장
- `rcx (count)`: 반복문에서 counter로 사용, loop가 진행될 때마다 하나씩 줄어든다
- `rdx (data)`: 여분의 레지스터, 맘대로 사용가능

**3.2 인덱스**

- `rsi (source index)`: 복사할 데이터의 주소 저장
- `rdi (destination index)`: 복사될 주소가 저장

> 표준 규약에 따라, 함수의 인자는 `rdi` -> `rsi` -> `rdx` -> `rcx` -> `r8` -> `r9` 순으로 저장. <br> 그 이후는 `stack` 영역에 순차적으로 저장

**3.3 포인터**

- `rsp (stack point)`: 현재 스택 주소 저장 -> `push` `pop`을 통해 스택 이동
- `rbp (base point)`: 스택의 시작 지점 주소

**3.4 플래그**

- `ZF (zero flag)`: 조건 판단시 사용

<br/>

### 4. 명령어

**4.1 조작**

- `call`: 함수 호출
- `ret`: `rax`반환 및 함수 종료
- `nop`: 아무것도 하지 않음
- `jmp`: 해당 라벨로 이동

**4.1.1 조건 jmp 명령**

- `je, jz`: `ZF`가 0일때
- `jne, jnz`: `ZF`가 0이 아닐때
- `ja`: A > B
- `jb`: A < B
- `jae`: A >= B
- `jbe`: A <= B

등등등

**4.2 산술**

- `inc`: 1 증가
- `dec`: 1 감소
- `add` `A` `B` : `A`에 `B`를 더한다
- `sub` `A` `B` : `A`에서 `B`를 뺀다
- `cmp`: 비교
- `test`: `AND`
- `xor`: `xor`
