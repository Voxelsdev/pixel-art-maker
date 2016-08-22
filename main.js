var body = document.querySelector('body'),
    container = document.getElementById('container'),
    pallet = document.getElementById('pallet'),
    borderTog = document.getElementById('borderTog'),
    erase = document.getElementById('erase'),
    imageLoader = document.getElementById('imageLoader'),
    clearCanvas = document.getElementById('clearCanvas'),
    canvas = document.getElementById('canvas'),
    progressBar = document.getElementById('progress'),
    ctx = canvas.getContext('2d'),
    main = [],
    h = 0,
    currentColor = 'red',
    brushSize = 1,
    pixelsDone = 0,
    mouseDown = false;

document.onmousedown = function(){
  mouseDown = true;
}

document.onmouseup = function(){
  mouseDown = false;
}

function draw(event){
  if(event.target.className === 'pallet'){
    currentColor = event.target.style.backgroundColor;
  } else if (event.target.className === 'box' || event.target.className === 'box-no-borders'){
    event.target.style.backgroundColor = currentColor;
  }
}

function drag(event){
  if(mouseDown){
    draw(event);
  }
}

function toggleBorders(){
  for(var i = 0; i < main.length; i++){
    for(var j = 0; j < main[i].length; j++){
      if(main[i][j].className === 'box'){
        main[i][j].className = 'box-no-borders';
      } else {
        main[i][j].className = 'box';
      }
    }
  }
}

function getAveOfSeg(width, height, posY, posX){
  var totalR = 0,
      totalG = 0,
      totalB = 0;
  for(var i = 1; i <= height; i+= 2){
    for(var j = 1; j <= width; j+= 2){
      totalR += ctx.getImageData(j + posX, i + posY, 1, 1).data[0];
      totalG += ctx.getImageData(j + posX, i + posY, 1, 1).data[1];
      totalB += ctx.getImageData(j + posX, i + posY, 1, 1).data[2];
      pixelsDone += 4;
    }
  }
  return 'rgb(' + Math.round((totalR / ((width * height) / 4))) + ', ' +
                  Math.round((totalG / ((width * height) / 4))) + ', ' +
                  Math.round((totalB / ((width * height) / 4))) + ')';
}

function divideImage(img){
  var cropWidth = img.width,
      cropHeight = img.height;
  while(cropWidth % 40 !== 0) {
    cropWidth--;
  }
  var segmentWidth = cropWidth / 40;

  while(cropHeight % 40 !== 0) {
    cropHeight--;
  }
  var segmentHeight = cropHeight / 40;
  for(var i = 0; i < 40; i++){
    for(var j = 0; j < 40; j++){
      main[i][j].style.backgroundColor = getAveOfSeg(segmentWidth, segmentHeight, i * segmentHeight, j * segmentWidth);
      console.log (((pixelsDone / (cropWidth * cropHeight)) * 100).toFixed(2) + '% Complete.')
    }
  }
  progressBar.textContent = 'Done.';
}

function loadImage(event, img, callBack) {
  var reader = new FileReader();
  reader.onload = function(event){
      img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        imageWidth = img.width;
        imageHeight = img.height;
        ctx.drawImage(img,0,0);
        callBack(img);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function displayImage(event){
  progressBar.textContent = 'Loading...'
  pixelsDone = 0;
  var img = new Image(),
      imageWidth = 0,
      imageHeight = 0;
  loadImage(event, img, divideImage);
}

function setErase(){
  currentColor = 'white';
}

function clearAll(){
  for(var i = 0; i < main.length; i++){
    for(var j = 0; j < main[i].length; j++){
      main[i][j].style.backgroundColor = 'white';
    }
  }
}

function getHSL(){
  h += 2;
  return 'hsl(' + h + ', 100%, 50%)';
}

window.onload = function(){
  for (var i = 0; i < 40; i++) {
    main.push([]);
    for (var j = 0; j < 40; j++) {
      var div = document.createElement('div');
      div.className = 'box';
      div.style.marginLeft = (j * 25) + 'px';
      div.style.marginTop = (i * 25) + 'px';
      container.appendChild(div);
      div.addEventListener('click', draw);
      div.addEventListener('mouseenter', drag);
      main[i][j] = div;
    }
  }

  for (var i = 0; i < 182; i++){
    var cDiv = document.createElement('div');
    cDiv.className = 'pallet';
    cDiv.style.marginLeft = (i * 5.5) + 'px';
    cDiv.style.backgroundColor = getHSL();
    cDiv.addEventListener('click', draw);
    pallet.appendChild(cDiv);
  }
}

borderTog.addEventListener('click', toggleBorders);
erase.addEventListener('click', setErase);
clearCanvas.addEventListener('click', clearAll);
imageLoader.addEventListener('change', displayImage, false);
