document.addEventListener("DOMContentLoaded", function () {
  const codeBlocks = document.querySelectorAll(".rouge-code");

  codeBlocks.forEach(function (codeBlock) {
    const pre = document.querySelector("div.highlighter-rouge");
    console.log(pre);

    const button = document.createElement("button");
    button.innerText = "⧉ 복사";
    button.className = "copy-button";

    button.addEventListener("click", function () {
      const codeText = codeBlock.innerText;

      navigator.clipboard.writeText(codeText).then(
        function () {
          button.innerText = "✓ 완료";
          button.classList.add("copied");

          setTimeout(function () {
            button.innerText = "⧉ 복사";
            button.classList.remove("copied");
          }, 2000);
        },
        function (err) {
          console.error("복사 실패:", err);
          alert("코드를 복사하는 데 실패했습니다.");
        }
      );
    });

    pre.appendChild(button);
  });
});
