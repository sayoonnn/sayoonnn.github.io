+++
title = "우당탕탕블로그만들기 (1) - 환경 구축"
date = "2025-01-28T12:00:09+09:00"
author = "sayoon"
tags = ["블로그제작기"]
keywords = ["github.io", "블로그", "hugo", "기술 블로그", "re-terminal"]
description = "블로그 만들기 힘들엉"
+++

**Github Pages**로 블로그를 만들어보자 **_`wsl` 기준_**

## 1. golang 설치

### 1) 다운

[go.dev](https://go.dev/doc/install)

위의 페이지에서 `go` 최신 버전을 다운 받는다  
`hugo` 설치를 위해서 `go`의 최신버전이 필요하다  
다운 받은 후 `/usr/local/`에 압축을 풀어준다

```bash
rm -rf /usr/local/go && \
tar -C /usr/local -xzf <다운받은 파일 위치>

```

### 2) 환경변수 등록

환경변수에 `go` 디렉토리를 등록해준다

`wsl` 환경에서는 로그인 쉘을 열지 않아서  
`/etc/profile`에 등록해도 `go`를 인식하지 못했다  
_`~/.zshrc`에 등록해야함_

```bash
export PATH=$PATH:/usr/local/go/bin
```

버전이 잘 나온다면 설치완료

```bash
go version
```

<br/>

## 2. hugo 설치

[link](https://gohugo.io/installation/linux/)

```bash
sudo snap install hugo
```

`wsl`은 뭔가 환경이 특이한 것 같다..?  
`snap`으로 설치해도 `scss`에 필요한 `extended`버전을 가져오질 못한다

```bash
CGO_ENABLED=1 go install -tags extended,withdeploy github.com/gohugoio/hugo@latest
```

직접 설치한 다음, 설치 파일 위치를 환경변수에 등록하는 방법을 사용했다

<br/>

## 3. 테마 설치

지독한 홍대병에 컨셉충으로서 평범한 테마는 용납못한다

![alt text](image.webp)

[re-terminal](https://themes.gohugo.io/themes/hugo-theme-re-terminal/) 터미널 테마 굳

`git submodule`로 까는 게 제일 편하고, 테마가 업데이트 될 때마다 최신화 하기도 편한 것 같다

하지만 커스텀 하고 싶어 복사 한 다음 수정했다

`git clone` 받은 다음 `archetypes`, `assets`, `content`, `layouts`, `static`을 복붙

디렉토리 최상단에 `config.toml`을 만들고 설치 페이지의 [설정파일](https://themes.gohugo.io/themes/hugo-theme-re-terminal/#how-to-configure)을 복붙한다

<br>

### 설정파일

1. `html` 언어 설정

   ```toml
   defaultContentLanguage = "ko"
   languageCode = "ko-KR"
   ```

2. 빌드 설정 추가

   ```toml
   enableRobotsTXT = true		# robots.txt 자동생성
   enableGitInfo = true			# git 연동 -> 마지막 수정시간 체크
   cleanDestinationDir = true	# 빌드 시 기존 파일 삭제 후 재생성
   forceSyncStatic = true		# static 폴더 자동 sync

   ```

3. `sitemap.xml` content type 설정

   ```toml
   [mediaTypes]
   	[mediaTypes."application/xml"]
    		suffixes = ["xml"]
   ```

## 기본설정은 완료!

### local 빌드

```bash
hugo server -D
```

### 페이지 생성

```bash
hugo new conent content/posts/<블라블라>
```
