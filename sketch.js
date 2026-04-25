let input;
let slider;
let jumpButton;
let isJumping = false;
let siteSelect;
let siteIframe;
const colors = ['#113e61', '#013a63', '#0f5485', '#0d5b92', '#45a3da', '#458faf', '#54a0c0', '#61a5c2', '#89c2d9', '#a9d6e5'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize input with default text
  input = createInput('淡江大學🐱‍💻');
  input.position(10, 10);
  input.style('font-size', '20px');
  input.style('background-color', '#eb7547');
  input.size(100, 25);

  slider = createSlider(15, 80, 30);
  // input 寬度 100 + 間距 50 = 150, 再加上 input 的 x 座標 10
  slider.position(160, 15);

  jumpButton = createButton('讓文字跳動');
  // slider x 160 + slider width (default 130) + gap 50 = 340
  jumpButton.position(slider.x + slider.width + 50, 10);
  jumpButton.size(150, 50);
  jumpButton.style('font-size', '20px');
  jumpButton.mousePressed(() => (isJumping = !isJumping));

  siteSelect = createSelect();
  // jumpButton x 340 + jumpButton width 150 + gap 50 = 540
  siteSelect.position(jumpButton.x + jumpButton.width + 50, 10);
  siteSelect.option('淡江大學');
  siteSelect.option('教科系');
  siteSelect.changed(changeSite);

  let webDiv = createDiv();
  webDiv.position(200, 200);
  webDiv.size(windowWidth - 400, windowHeight - 400);
  siteIframe = createElement('iframe');
  // Initialize with the default site
  siteIframe.attribute('src', 'https://www.tku.edu.tw');
  siteIframe.style('width', '100%');
  siteIframe.style('height', '100%');
  siteIframe.parent(webDiv);
}

function draw() {
  background('#f0acec');
  let txt = input.value();
  let txtSize = slider.value();
  textSize(txtSize);
  textAlign(LEFT, TOP);
  let w = textWidth(txt) + 50;
  let h = txtSize + 50; // 行高 = 字體大小 + 垂直間距

  if (txt.length > 0) {
    noStroke();
    for (let y = 100; y < height; y += h) {
      let textIndex = 0;
      for (let x = 0; x < width; x += w) {
        fill(colors[textIndex % colors.length]);
        if (isJumping) {
          // 改用 sin/cos 讓移動變為平滑的波浪，而非隨機抖動
          const jumpX = sin(frameCount * 0.05 + y * 0.01) * 5;
          const jumpY = cos(frameCount * 0.05 + x * 0.01) * 5;
          text(txt, x + jumpX, y + jumpY);
        } else {
          text(txt, x, y);
        }
        textIndex++;
      }
    }
  }
}

function changeSite() {
  const selectedSite = siteSelect.value();
  if (selectedSite === '淡江大學') {
    siteIframe.attribute('src', 'https://www.tku.edu.tw');
    input.value('淡江大學🐱‍💻');
  } else if (selectedSite === '教科系') {
    siteIframe.attribute('src', 'https://www.et.tku.edu.tw');
    input.value('教科系🐱');
  }
}