var body = document.querySelector('body'),
    container = document.getElementById('container'),
    pallet = document.getElementById('pallet'),
    borderTog = document.getElementById('borderTog'),
    erase = document.getElementById('erase');
    main = [],
    h = 0,
    currentColor = 'red';

function draw(event){
  console.log(event.target.className)
  if(event.target.className === 'pallet'){
    currentColor = event.target.style.backgroundColor;
    console.log(currentColor);
  } else if (event.target.className === 'box' || event.target.className === 'box-no-borders'){
    event.target.style.backgroundColor = currentColor;
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

function setErase(){
  currentColor = 'white';
}

function getHSL(){
  h += 2;
  return 'hsl(' + h + ', 100%, 50%)';
}

for (var i = 0; i < 40; i++) {
  main.push([]);
  for (var j = 0; j < 40; j++) {
    var div = document.createElement('div');
    div.className = 'box';
    div.style.marginLeft = (j * 25) + 'px';
    div.style.marginTop = (i * 25) + 'px';
    container.appendChild(div);
    div.addEventListener('click', draw);
    main[i][j] = div;
  }
}
console.log(main);

for (var i = 0; i < 182; i++){
  var cDiv = document.createElement('div');
  cDiv.className = 'pallet';
  cDiv.style.marginLeft = (i * 5.5) + 'px';
  cDiv.style.backgroundColor = getHSL();
  cDiv.addEventListener('click', draw);
  pallet.appendChild(cDiv);
}

borderTog.addEventListener('click', toggleBorders);
erase.addEventListener('click', setErase);
