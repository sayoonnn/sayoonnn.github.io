const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const can = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingQuality = "high";

canvas.width = 350;
canvas.height = 350;

const minScale = 0.1;
const maxScale = 10;
let isDragging = false;
let scale = 1;
let x = 0;
let y = 0;
let lastX = 0;
let lastY = 0;

let input_name = "";

const image = new Image();

const frame = new Image();
frame.src = "/img/og4.png";

const filter = new Image();
filter.src = "/img/" + document.getElementById("filter").value + ".png";
filter.onload = drawAll;

document.addEventListener("paste", (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = function (evt) {
        const image = document.createElement("img");
        image.src = evt.target.result;
        document.body.appendChild(image); // 없으면 append 안 됨
      };
      reader.readAsDataURL(file);
      return;
    }
  }
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

image.onload = () => {
  const canvasRatio = canvas.width / image.width;
  scale = canvasRatio;

  const scaledHeight = image.height * scale;
  x = 0;
  y = (canvas.height - scaledHeight) / 2;
  drawAll();
};

canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.offsetX - lastX;
  const dy = e.offsetY - lastY;
  x += dx;
  y += dy;
  lastX = e.offsetX;
  lastY = e.offsetY;
  drawAll();
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
});

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  const wheel = e.deltaY < 0 ? 1.05 : 0.95;

  const newScale = scale * wheel;
  if (newScale < minScale || newScale > maxScale) return;

  x = mouseX - (mouseX - x) * (newScale / scale);
  y = mouseY - (mouseY - y) * (newScale / scale);
  scale = newScale;
  drawAll();
});

function clampOrigin() {
  const displayWidth = image.width * scale;
  const displayHeight = image.height * scale;

  const scaleX = canvas.width / image.width;
  const scaleY = canvas.height / image.height;
  const minScale = Math.max(scaleX, scaleY);

  if (scale < minScale) {
    scale = minScale;
  }

  const minX = canvas.width - displayWidth;
  const minY = canvas.height - displayHeight;

  x = Math.min(0, Math.max(minX, x));
  y = Math.min(0, Math.max(minY, y));
}

function roundedImage(padding, size, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(padding + radius, padding);
  ctx.lineTo(padding + size - radius, padding);
  ctx.quadraticCurveTo(
    padding + size,
    padding,
    padding + size,
    padding + radius
  );
  ctx.lineTo(padding + size, padding + size - radius);
  ctx.quadraticCurveTo(
    padding + size,
    padding + size,
    padding + size - radius,
    padding + size
  );
  ctx.lineTo(padding + radius, padding + size);
  ctx.quadraticCurveTo(
    padding,
    padding + size,
    padding,
    padding + size - radius
  );
  ctx.lineTo(padding, padding + radius);
  ctx.quadraticCurveTo(padding, padding, padding + radius, padding);
  ctx.closePath();
  ctx.restore();
}

function setTextColor(gradient) {
  const option = document.getElementById("font_color").value;

  if (option == "#ffd700") {
    gradient.addColorStop("0", "rgba(223,204,162,1)");
    gradient.addColorStop("0.01", "rgba(223,204,162,1)");
    gradient.addColorStop("0.12", "rgba(213,192,145,1)");
    gradient.addColorStop("0.22", "rgba(228,210,171,1)");
    gradient.addColorStop("0.34", "rgba(223,204,162,1)");
    gradient.addColorStop("0.44", "rgba(228,210,171,1)");
    gradient.addColorStop("0.54", "rgba(213,192,145,1)");
    gradient.addColorStop("0.65", "rgba(228,210,171,1)");
    gradient.addColorStop("0.77", "rgba(223,204,162,1)");
    gradient.addColorStop("0.90", "rgba(228,210,171,1)");
    gradient.addColorStop("1", "rgba(196,168,117,1)");
    ctx.fillStyle = gradient;
  } else if (option == "#c0c0c0") {
    gradient.addColorStop("0", "rgba(179,171,171,1)");
    gradient.addColorStop("0.01", "rgba(179,171,171,1)");
    gradient.addColorStop("0.12", "rgba(210,202,202,1)");
    gradient.addColorStop("0.22", "rgba(203,197,197,1)");
    gradient.addColorStop("0.34", "rgba(179,171,171,1)");
    gradient.addColorStop("0.44", "rgba(235,225,225,1)");
    gradient.addColorStop("0.54", "rgba(210,202,202,1)");
    gradient.addColorStop("0.65", "rgba(235,225,225,1)");
    gradient.addColorStop("0.77", "rgba(179,171,171,1)");
    gradient.addColorStop("0.90", "rgba(235,225,225,1)");
    gradient.addColorStop("1", "rgba(190,186,186,1)");
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = option;
  }
}

function setTextSize() {
  const size = document.getElementById("font_size").value;
  can.style.letterSpacing = "1.05px";

  if (size == "default") {
    if (/^[가-힣\s]+$/.test(input_name)) {
      ctx.font = "italic 40px 'koverwatch'";
    } else {
      ctx.font = "36px 'bebasneue'";
    }
  } else {
    if (/^[가-힣\s]+$/.test(input_name)) {
      ctx.font = "italic 34px 'koverwatch'";
    } else {
      ctx.font = "30px 'bebasneue'";
    }
  }
  ctx.scale(0.83, 0.95);
}

function drawText() {
  ctx.save();

  setTextSize();

  ctx.shadowColor = "rgba(11,1,2,0.5)";
  ctx.shadowOffsetX = -1.5;
  ctx.shadowOffsetY = 1.5;
  ctx.shadowBlur = 0.5;
  ctx.textAlign = "center";

  ctx.fillText(
    input_name,
    (canvas.width * 1.21) / 2,
    ((95 * canvas.height) / 100) * 1.047
  );

  const gradient = ctx.createLinearGradient(
    (canvas.width * 1.21) / 2 - ctx.measureText(input_name).width / 2,
    0,
    (canvas.width * 1.21) / 2 + ctx.measureText(input_name).width / 2,
    0
  );

  setTextColor(gradient);

  ctx.shadowColor = "black";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 5;
  ctx.textAlign = "center";

  ctx.fillText(
    input_name,
    (canvas.width * 1.21) / 2,
    ((95 * canvas.height) / 100) * 1.047
  );

  ctx.restore();
}

function drawImage() {
  clampOrigin();

  const padding = 1.6;
  const radius = canvas.width * 0.17;
  const size = canvas.width - padding * 2;

  ctx.save();
  roundedImage(padding, size, radius);
  ctx.clip();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.drawImage(image, 0, 0);
  ctx.restore();

  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(filter, 0, 0, canvas.width, canvas.height);
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImage();
  drawText();
}

// 옵션

document.getElementById("name").oninput = (e) => {
  input_name = e.currentTarget.value;
  drawAll();
};

document.getElementById("filter").onchange = (e) => {
  filter.src = "/img/" + e.currentTarget.value + ".png";
};

document.getElementById("font_color").onchange = drawAll;
document.getElementById("font_size").onchange = drawAll;

document.getElementById("save_button").onclick = () => {
  const id = document.getElementById("human_id").value;

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  console.log(id);
  link.download = id;
  link.click();
};
