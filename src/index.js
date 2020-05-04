import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


document.getElementById('convert-btn').onclick = () => {
  const img = document.querySelector('#base-img');

  const canvas = document.getElementById('img-canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  const initImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const rgbaImage = [];
  for (let i = 0; i < initImage.data.length; i += 4) {
    rgbaImage.push({
      r: initImage.data[i + 0],
      g: initImage.data[i + 1],
      b: initImage.data[i + 2],
      a: initImage.data[i + 3],
    });
  }
  const ycbcrImage = rgbaImage.map((color) => convertToYCbCr(color));
  const ycbcrToArray = [];
  ycbcrImage.forEach((color) => {
    ycbcrToArray.push(color.y);
    ycbcrToArray.push(color.cb);
    ycbcrToArray.push(color.cr);
    ycbcrToArray.push(1);
  });

  const convertedImage = ctx.createImageData(img.width, img.height);
  for (let i = 0; i < convertedImage.data.length; i++) {
    convertedImage.data[i + 0] = ycbcrToArray[i + 0];
    convertedImage.data[i + 1] = ycbcrToArray[i + 1];
    convertedImage.data[i + 2] = ycbcrToArray[i + 2];
    convertedImage.data[i + 3] = ycbcrToArray[i + 3];
  }

  document.getElementById('right-title').style = 'display: block';
  ctx.putImageData(convertedImage, img.width, img.height);
  showPalette(colorThief.getPalette(img), 'ycbcr');
};

const convertToYCbCr = ({ r, g, b }) => ({
  y: Math.round(0 + 0.299 * r + 0.587 * g + 0.114 * b),
  cb: Math.round(128 - 0.168736 * r - 0.331264 * g + 0.5 * b),
  cr: Math.round(128 + 0.5 * r - 0.418688 * g - 0.081312 * b),
});
