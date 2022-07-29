console.log('script.js loaded');
var play = false;

function playAudio(url) {
    if(play == false){
        new Audio(url).play();
        play = true;
    }
  }

document.querySelector('#btnLoad').addEventListener('click', () => {
    var dinoName = getDinoName();
    getDinoImage(dinoName);
})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

async function getDinoName(){
    const response = await fetch('/dinoname');
    const data = await response.json();
    let dinoName = data[0].join(' ');
    console.log(dinoName);
    document.querySelector('#dinoName').textContent = dinoName;
    return dinoName;
};

async function getDinoImage(){
    const response = await fetch(`/dinoimage`);
    const data = await response.json();
    let dinoImage = data.value[getRndInteger(0,99)];
    let dinoImageUrl = dinoImage.thumbnailUrl;
    let dinoAlt = dinoImage.name;
    console.log(dinoImage, dinoAlt);

    if(document.querySelector('#dinoImage') !== null) {
        document.querySelector('#dinoImage').remove();
    }

    let img = document.createElement('img');
    img.id = "dinoImage";
    img.src = dinoImageUrl;
    img.alt = dinoAlt;
    document.querySelector('.divImage').appendChild(img);
};