document.addEventListener("DOMContentLoaded", function () {
  // 모든 <pre><code> 블록을 선택
  const codeBlocks = document.querySelectorAll(".rouge-code");

  codeBlocks.forEach(function (codeBlock) {
    // <pre> 요소 찾기
    const pre = document.querySelector("div.highlighter-rouge");
    console.log(pre);

    // 복사 버튼 생성
    const button = document.createElement("button");
    button.innerText = "🗎 복사";
    button.className = "copy-button";

    // 버튼 클릭 시 복사 기능
    button.addEventListener("click", function () {
      // 코드 내용 가져오기
      const codeText = codeBlock.innerText;

      // 클립보드에 복사
      navigator.clipboard.writeText(codeText).then(
        function () {
          // 복사 성공 시 버튼 텍스트 변경
          button.innerText = "✓ 복사 완료";
          button.classList.add("copied");

          // 잠시 후 원래 상태로 되돌리기
          setTimeout(function () {
            button.innerText = "🗎 복사";
            button.classList.remove("copied");
          }, 2000);
        },
        function (err) {
          // 복사 실패 시 알림
          console.error("복사 실패:", err);
          alert("코드를 복사하는 데 실패했습니다.");
        }
      );
    });

    // <pre> 요소에 버튼 추가
    pre.appendChild(button);
  });
});
