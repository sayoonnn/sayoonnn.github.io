#!/bin/bash

# 변환 대상 디렉토리 설정
target_dir="content/posts"

# 디렉토리가 존재하지 않는 경우
if [[ ! -d "$target_dir" ]]; then
  echo "Error: The directory 'assets' does not exist."
  exit 1
fi

# 변환할 파일 확장자 지정
extensions=("jpg" "jpeg" "png" "bmp" "tiff")

# assets 디렉토리 아래 모든 하위 디렉토리를 포함하여 변환
for ext in "${extensions[@]}"; do
  find "$target_dir" -type f -iname "*.$ext" | while read -r file; do
    output="${file%.*}.webp"
    echo "Converting $file to $output"
    cwebp "$file" -o "$output"
	rm $file
  done
done

echo "Conversion complete."
