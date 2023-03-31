
// loading effect

window.addEventListener('load', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

let logo = document.getElementById('animation-logo');

const logoJump = logo.animate([
  { top: '20vh' },
  { top: '25vh' },
  { top: '20vh' }
], {
  duration: 1000,
  iterations: 3,
  easing: 'linear',
  direction: 'alternate', 
});

let animation = document.getElementById('animation');

const animationOut = animation.animate(
[
  { transform: 'translateY(0%)' },
  { transform: 'translateY(-120vh)' },
], {
  duration: 800,
  iterations: 1,
  easing: 'linear',
  delay: 1500
});

animationOut.onfinish = () => {
  animation.style.display = 'none';
};


// Top Button

const scrollBtn = document.getElementById("topwrap");

scrollBtn.addEventListener("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// search-button

let searchBox = document.getElementById('search-box');

let blackBox = document.getElementById('black-box');

let clickGlass = document.getElementById('click-glass');

let clickCount = 0;

clickGlass.addEventListener('click', function() {
  clickCount += 1;
  if (clickCount === 1) {
  searchBox.style.display = 'flex';
  blackBox.style.display = 'flex';}
  if (clickCount === 2) {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
  clickCount = 0;}
});

blackBox.onclick = () => {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
};



// slide effect

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementById("nav-center-upper").getElementsByTagName("img");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.opacity = 1;
  setTimeout(showSlides, 6000); 
};


// interactive effect page2-part2

const block = document.querySelector('.block');
const main = document.querySelector('.main');

const allClass = document.getElementById('allClass');
const smallClass = document.getElementById('smallClass');
const freeRange = document.getElementById('freeRange');
const oneOnOne = document.getElementById('oneOnOne');

const url = '../json/front-enter-export.json';

window.addEventListener('DOMContentLoaded', myJson);

function myJson(){
    fetch(url)
    .then(response => response.json())
    .then((data)=>{
      jsonArticle = Object.values(data.article);
      localStorage.setItem('jsonArticle', JSON.stringify(jsonArticle)); 
      })
    .catch(()=>console.log('promise rejected'))
    };

const localData = localStorage.getItem('jsonArticle');
let jsonArticle;

if(localData){
    jsonArticle = JSON.parse(localData);
}

console.log(jsonArticle);

let allCount = 0;
let taipeiCount = 0;
let kaoshiungCount = 0;
let remoteCount = 0;
let smallClassCount = 0;
let freeRangeCount = 0;
let oneOnOneCount = 0;

// 創造七種陣列
const arrAll = jsonArticle.filter(item => {
  if(item){
    allCount++;
    return true;
}});

const arrTaipei = jsonArticle.filter(item => {
  if(item.city === '台北'){
    taipeiCount++;
    return true;
}});

const arrKaoshiung = jsonArticle.filter(item => {
  if(item.city === '高雄'){
    kaoshiungCount++;
    return true;
}});

const arrRemote = jsonArticle.filter(item => {
  if(item.city === '各地'){
    remoteCount++;
    return true;
}});

const arrSmallClass = jsonArticle.filter(item => {
  if(item.classType === '小班制'){
    smallClassCount++;
    return true;
}});

const arrFreeRange = jsonArticle.filter(item => {
  if(item.teachWay === '放養制'){
    freeRangeCount++;
    return true;
}});

const arrOneOnOne = jsonArticle.filter(item => {
  if(item.classType === '一對一'){
    oneOnOneCount++;
    return true;
}});


function allSort() {
  const allClassNames = [];
  const allPreface = [];
  const allCity = [];
  const allImg = [];
  for (const item of arrAll) {
    allClassNames.push(item.name);
    allPreface.push(item.preface);
    allCity.push(item.city);
    allImg.push(item.squareUrl);
  }
  return [allClassNames, allPreface, allCity, allImg];
};

function taipeiSort() {
  const taipeiClassName = [];
  const taipeiPreface = [];
  const taipeiCity = [];
  const taipeiImg = [];
  for (const item of arrTaipei) {
    taipeiClassName.push(item.name);
    taipeiPreface.push(item.preface);
    taipeiCity.push(item.city);
    taipeiImg.push(item.squareUrl);
  }
  return [taipeiClassName, taipeiPreface, taipeiCity, taipeiImg];
};

function kaoshiungSort() {
  const kaoshiungClassName = [];
  const kaoshiungPreface = [];
  const kaoshiungCity = [];
  const kaoshiungImg = [];
  for (const item of arrKaoshiung) {
    kaoshiungClassName.push(item.name);
    kaoshiungPreface.push(item.preface);
    kaoshiungCity.push(item.city);
    kaoshiungImg.push(item.squareUrl);
  }
  return [kaoshiungClassName, kaoshiungPreface, kaoshiungCity, kaoshiungImg];
};

function remoteSort() {
  const remoteClassName = [];
  const remotePreface = [];
  const remoteCity = [];
  const remoteImg = [];
  for (const item of arrRemote) {
    remoteClassName.push(item.name);
    remotePreface.push(item.preface);
    remoteCity.push(item.city);
    remoteImg.push(item.squareUrl);
  }
  return [remoteClassName, remotePreface, remoteCity, remoteImg];
};


function smallClassSort() {
  const smallClassName = [];
  const smallClassPreface = [];
  const smallClassCity = [];
  const smallClassImg = [];
  for (const item of arrSmallClass) {
    smallClassName.push(item.name);
    smallClassPreface.push(item.preface);
    smallClassCity.push(item.city);
    smallClassImg.push(item.squareUrl);
  }
  return [smallClassName, smallClassPreface, smallClassCity, smallClassImg];
};

function freeRangeSort() {
  const freeRangeName = [];
  const freeRangePreface = [];
  const freeRangeCity = [];
  const freeRangeImg = [];
  for (const item of arrFreeRange) {
    freeRangeName.push(item.name);
    freeRangePreface.push(item.preface);
    freeRangeCity.push(item.city);
    freeRangeImg.push(item.squareUrl);
  }
  return [freeRangeName, freeRangePreface, freeRangeCity, freeRangeImg];
};

function oneOnOneSort() {
  const oneOnOneName = [];
  const oneOnOnePreface = [];
  const oneOnOneCity = [];
  const oneOnOneImg = [];
  for (const item of arrOneOnOne) {
    oneOnOneName.push(item.name);
    oneOnOnePreface.push(item.preface);
    oneOnOneCity.push(item.city);
    oneOnOneImg.push(item.squareUrl);   
  }
  return [oneOnOneName, oneOnOnePreface, oneOnOneCity, oneOnOneImg];
};

// 讓陣列成為全域變數
const [allClassNames, allPreface, allCity, allImg] = allSort();
const [taipeiClassName, taipeiPreface, taipeiCity, taipeiImg] = taipeiSort();
const [kaoshiungClassName, kaoshiungPreface, kaoshiungCity, kaoshiungImg] = kaoshiungSort();
const [remoteClassName, remotePreface, remoteCity, remoteImg] = remoteSort();
const [smallClassName, smallClassPreface, smallClassCity, smallClassImg] = smallClassSort();
const [freeRangeName, freeRangePreface, freeRangeCity, freeRangeImg] = freeRangeSort();
const [oneOnOneName, oneOnOnePreface, oneOnOneCity, oneOnOneImg] = oneOnOneSort();

window.addEventListener('DOMContentLoaded', allBlock);
allClass.addEventListener('click', allBlock);

// 為三個地區類別增加監聽
function addClickEvent(cityName, theBlock) {
  const cityCollection = document.getElementsByClassName('location-name');
  for (let i = 0; i < cityCollection.length; i++) {
    if (cityCollection[i].textContent === cityName) {
      cityCollection[i].addEventListener('click', theBlock);
    }
  };
};

function clearNodes(){
  block.style.display = 'flex'; 
  main.innerHTML = ''; 
};

// 全部顯示
function allBlock(){
  clearNodes();
  for(let i = 0; i < allCount ; i++){
    const newBlock = block.cloneNode(true);
    const newClassName = newBlock.querySelector('.classroom-name');
    const city = newBlock.querySelector('.location-name');
    const preface = newBlock.querySelector('.preface');
    const squareInner = newBlock.querySelector('.squareInner');
    main.appendChild(newBlock); 
    newBlock.classList.add('block');
    allSort();
    newClassName.textContent = allClassNames[i];
    city.textContent = allCity[i];
    preface.textContent = allPreface[i];
    squareInner.setAttribute('src', allImg[i]);
  } 
  block.style.display = 'none';
  // 三個地區增加監聽器
  addClickEvent('台北', taipeiBlock);
  addClickEvent('高雄', kaoshiungBlock);
  addClickEvent('各地', remoteBlock);
  // 三個班別增加監聽器
  smallClass.addEventListener('click', smallClassBlock);
  freeRange.addEventListener('click', freeRangeBlock);
  oneOnOne.addEventListener('click', oneOnOneBlock);
};


// 台北類別
function taipeiBlock(){
  clearNodes();
  for(let i = 0; i < taipeiCount ; i++){
  const newBlock = block.cloneNode(true);
  const newClassName = newBlock.querySelector('.classroom-name');
  const newPreface = newBlock.querySelector('.preface');
  const cityTag = newBlock.querySelector('.location-name');
  const squareInner = newBlock.querySelector('.squareInner');
  
  newBlock.classList.add('block');
  main.appendChild(newBlock); 
  taipeiSort(); 
  newClassName.textContent = taipeiClassName[i];
  newPreface.textContent = taipeiPreface[i];
  cityTag.textContent = taipeiCity[i];
  squareInner.setAttribute('src', taipeiImg[i]);
}};


// 高雄類別
function kaoshiungBlock() {
  block.style.display = 'flex'; 
  main.innerHTML = ''; 
{
for(let i = 0; i < kaoshiungCount ; i++){
  newBlock = block.cloneNode(true);
  newBlock.classList.add('block');
  main.appendChild(newBlock); 
  const newClassName = newBlock.querySelector('.classroom-name');
  const newPreface = newBlock.querySelector('.preface');
  const cityTag = newBlock.querySelector('.location-name');
  const squareInner = newBlock.querySelector('.squareInner');
  kaoshiungSort(); 
  newClassName.textContent = kaoshiungClassName[i];
  newPreface.textContent = kaoshiungPreface[i];
  cityTag.textContent = kaoshiungCity[i];
  squareInner.setAttribute('src', kaoshiungImg[i]);
}}};

// 各地類別
function remoteBlock() {
  block.style.display = 'flex'; 
  main.innerHTML = ''; 
{
for(let i = 0; i < remoteCount ; i++){
  newBlock = block.cloneNode(true);
  newBlock.classList.add('block');
  main.appendChild(newBlock); 
  const newClassName = newBlock.querySelector('.classroom-name');
  const newPreface = newBlock.querySelector('.preface');
  const cityTag = newBlock.querySelector('.location-name');
  const squareInner = newBlock.querySelector('.squareInner');
  remoteSort(); 
  newClassName.textContent = remoteClassName[i];
  newPreface.textContent = remotePreface[i];
  cityTag.textContent = remoteCity[i];
  squareInner.setAttribute('src', remoteImg[i]);
}}};


// 小班制
function smallClassBlock() {
block.style.display = 'flex'; 
main.innerHTML = ''; 
for(let i = 0; i < smallClassCount ; i++){
  newBlock = block.cloneNode(true);
  newBlock.classList.add('block');
  main.appendChild(newBlock); 
  const newClassName = newBlock.querySelector('.classroom-name');
  const newPreface = newBlock.querySelector('.preface');
  const cityTag = newBlock.querySelector('.location-name');
  const squareInner = newBlock.querySelector('.squareInner');
  smallClassSort(); 
  newClassName.textContent = smallClassName[i];
  newPreface.textContent = smallClassPreface[i];
  cityTag.textContent = smallClassCity[i];
  squareInner.setAttribute('src', smallClassImg[i]);
}
  addClickEvent('台北', taipeiBlock);
  addClickEvent('高雄', kaoshiungBlock);
  addClickEvent('各地', remoteBlock);
};


// 放養制
function freeRangeBlock() {
  block.style.display = 'flex'; 
  main.innerHTML = ''; 
  for(let i = 0; i < freeRangeCount ; i++){
    newBlock = block.cloneNode(true);
    newBlock.classList.add('block');
    main.appendChild(newBlock); 
    const newClassName = newBlock.querySelector('.classroom-name');
    const newPreface = newBlock.querySelector('.preface');
    const cityTag = newBlock.querySelector('.location-name');
    const squareInner = newBlock.querySelector('.squareInner');
    freeRangeSort(); 
    newClassName.textContent = freeRangeName[i];
    newPreface.textContent = freeRangePreface[i];
    cityTag.textContent = freeRangeCity[i];
    squareInner.setAttribute('src', freeRangeImg[i]);
  }
    addClickEvent('台北', taipeiBlock);
    addClickEvent('高雄', kaoshiungBlock);
    addClickEvent('各地', remoteBlock);
  };

  
// 放養制
function oneOnOneBlock() {
  block.style.display = 'flex'; 
  main.innerHTML = ''; 
  for(let i = 0; i < oneOnOneCount ; i++){
    newBlock = block.cloneNode(true);
    newBlock.classList.add('block');
    main.appendChild(newBlock); 
    const newClassName = newBlock.querySelector('.classroom-name');
    const newPreface = newBlock.querySelector('.preface');
    const cityTag = newBlock.querySelector('.location-name');
    const squareInner = newBlock.querySelector('.squareInner');
    oneOnOneSort(); 
    newClassName.textContent = oneOnOneName[i];
    newPreface.textContent = oneOnOnePreface[i];
    cityTag.textContent = oneOnOneCity[i];
    squareInner.setAttribute('src', oneOnOneImg[i]);
  }
    addClickEvent('台北', taipeiBlock);
    addClickEvent('高雄', kaoshiungBlock);
    addClickEvent('各地', remoteBlock);
  };
