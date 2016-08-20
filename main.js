var body = document.querySelector('body'),
    container = document.getElementById('container'),
    main = [],
    pallet = document.getElementById('pallet'),
    h = 0,
    currentColor = 'red';

function draw(event){
  console.log(event.target.className)
  if(event.target.className === 'pallet'){
    currentColor = event.target.style.backgroundColor;
    console.log(currentColor);
  } else if (event.target.className === 'box'){
    event.target.style.backgroundColor = currentColor;
  }
}

function getHSL(){
  h += 9;
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

for (var i = 0; i < 40; i++){
  var cDiv = document.createElement('div');
  cDiv.className = 'pallet';
  cDiv.style.marginLeft = (i * 25) + 'px';
  cDiv.style.backgroundColor = getHSL();
  cDiv.addEventListener('click', draw);
  pallet.appendChild(cDiv);
}
