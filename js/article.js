

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


// 顯示班別

const blockTemplate = document.querySelector('[data-classroom-block]');

const blockContainer = document.querySelector('.navCenter');
const allClass = document.getElementById('allClass');
const smallClass = document.getElementById('smallClass');
const freeRange = document.getElementById('freeRange');
const oneOnOne = document.getElementById('oneOnOne');

const blue = '#1ad8d3';
const grey = '#737373';
let urlTrue = 'https://frankyeah.github.io/Front-Enter/images/star-background.svg';

let urlFalse = 'https://frankyeah.github.io/Front-Enter/images/star-border.svg';



// 顯示文章 (應該來自於 user-article) 
firebase.database().ref('front-enter-json/article').on('value', (snapshot) => {
  const articles = Object.values(snapshot.val()); // 新增
  console.log(articles)
    articles.forEach(object => {
      const block = blockTemplate.content.cloneNode(true).children[0];
      const cityName = block.querySelector('.cityName');
      const squareInner = block.querySelector('.squareInner');
      const className = block.querySelector('.className');
      const preface = block.querySelector('.preface');
    
      cityName.textContent = object.city;
      squareInner.setAttribute('src', object.squareUrl);
      className.textContent = object.name;
      preface.textContent = object.preface;
      blockContainer.append(block);

      object.element = block;
      object.element.style.display = 'flex';
    
    });

    // 在 user 下面建立 user-article 
    // 只希望在user-article 層級尚不存在時進行update
    firebase.auth().onAuthStateChanged(function(user) {
      const userId = user.uid; 
      if (user) {
        const userArticleRef = firebase.database().ref('users/' + userId + '/user-article');
        userArticleRef.once('value', (snapshot) => {
          if (!snapshot.exists()) {
            firebase.database().ref('front-enter-json/article/').once('value', (snapshot) => {
              const articles = Object.values(snapshot.val());
              userArticleRef.set(articles);
            });
          }
        });
      }
    });
    


    // 只有登入才能顯示
    firebase.auth().onAuthStateChanged(function(user) {
      const starList = document.querySelectorAll('.star');

      if (user) { 
        console.log('使用者有登入、顯示星星')
        starList.forEach((star)=>{star.style.display = 'flex'} )

        // 新增一個新層級、加入新資料，只有還沒資料時才會更新
        firebase.database().ref('users/' + user.uid + '/user-article').once('value')
          .then((snapshot) => {

            const data = snapshot.val();
            if (!data || Object.keys(data).length === 0) {
              articles.forEach((article)=>{
                Object.assign(article, { starClicked: false });
              })
              firebase.database().ref('users/' + user.uid).update({ 'user-article': articles });

            }
          });

      }else{
        console.log("使用者未登入，不顯示星星");
        starList.forEach((star)=>{star.style.display = 'none'} )
      }
    })

    smallClassClick(articles);
    allClassClick(articles);
    
    freeRangeClick(articles);
    oneOnOneClick(articles);

    taipeiClickFunction(articles);
    kaoshiungClickFunction(articles);
    remoteClickFunction(articles);
    contentLink(articles)
  });





    // 星星顯示、更新個人的 starClicked


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { 
        const userId = user.uid;
      firebase.database().ref('users/' + userId + '/user-article/').on('value', (snapshot) => {
        const articles = Object.values(snapshot.val())
        const starList = document.querySelectorAll('.star');

        articles.forEach((article, index) => {
          const star = starList[index];
          // console.log(star, index)
          star.style.background = `url(${article.starClicked ? urlTrue : urlFalse}) 50% / cover no-repeat`;

          star.addEventListener('click', (e) => {
            star.style.background = `url(${article.starClicked ? urlTrue : urlFalse}) 50% / cover no-repeat`;

            if (!article.starClicked) {
              e.currentTarget.style.background = `url(${urlTrue}) 50% / cover no-repeat`;
            } else { 
              e.currentTarget.style.background = `url(${urlFalse}) 50% / cover no-repeat`;
            }
            article.starClicked = !article.starClicked;
            console.log(index);
            firebase.database().ref('users/' + userId + '/user-article/' + index).set(article);
        })


      })
        
    })

  }})


  
  
// 顯示文章

function allClassClick(articles){ // 全部
  allClass.addEventListener('click', function(){
    articles.forEach((object)=>{
    object.element.style.display = 'flex'})
    allClass.style.color = blue;
    [smallClass, freeRange, oneOnOne].forEach(el => el.style.color = grey);
})
}


function smallClassClick(articles){ // 小班制
  smallClass.addEventListener("click", function(){
    articles.forEach((object)=>{
      object.element.style.display = 'flex';
      if(object.classType !== '小班制'){
        object.element.style.display = 'none';}
    })
    smallClass.style.color = blue;
    [freeRange, oneOnOne, allClass].forEach(el => el.style.color = grey);
  })
}


function freeRangeClick(articles){ // 放養制
  freeRange.addEventListener("click", function(){
    articles.forEach((article)=>{
      article.element.style.display = 'flex';
      if(article.teachWay !== '放養制'){
        article.element.style.display = 'none';}
    })
    freeRange.style.color = blue;
    [smallClass, oneOnOne, allClass].forEach(el => el.style.color = grey);
  })
}


function oneOnOneClick(articles){ // 一對一
  oneOnOne.addEventListener("click", function(){
    articles.forEach((article)=>{
      article.element.style.display = 'flex';
    if(article.classType !== '一對一'){
        article.element.style.display = 'none';}
    })
    oneOnOne.style.color = blue;
    [smallClass, freeRange, allClass].forEach(el => el.style.color = grey);
  })
}



function taipeiClickFunction(articles){
  const taipeiCities = articles.filter(article => article.city === '台北').map(article => article.element.querySelector('.cityName'));  
  taipeiCities.forEach(ele =>{
    ele.addEventListener('click', () => { 

      articles.forEach((article)=>{
        article.element.style.display = 'flex';
        if(article.city !== '台北'){
          article.element.style.display = 'none';
        }
      });

    });
  });
}

function kaoshiungClickFunction(articles){
  const kaoshiungCities = articles.filter(article => article.city === '高雄').map(article => article.element.querySelector('.cityName'));

  kaoshiungCities.forEach(ele =>{
    ele.addEventListener('click', () => { 
        articles.forEach((article)=>{
          article.element.style.display = 'flex';
        if(article.city !== '高雄'){
            article.element.style.display = 'none'}
        })
      })
    })
  }


function remoteClickFunction(articles){
  const remoteCities = articles.filter(article => article.city === '各地').map(article => article.element.querySelector('.cityName'));

  remoteCities.forEach(ele =>{
    ele.addEventListener('click', () => { 

      articles.forEach((article)=>{
        article.element.style.display = 'flex';
      if(article.city !== '各地'){
          article.element.style.display = 'none'}
      }) 
    });
  })    
}



// take id parameter on the URL and link to content.html

function contentLink(articles){
  const contentLinks = document.querySelectorAll('.lowerBlock ');
  contentLinks.forEach(link => {
    link.addEventListener( 'click', () => {
      const linkIndex = Array.from(contentLinks).indexOf(link);
      const linkId = articles[linkIndex].creatTime;
      console.log(linkId);
      const url = `content.html?id=${linkId}`;
      console.log(url);
      window.location.href = url;
    }
    )
  }
  )
}


// search bar Text 
const searchInput = document.querySelector('[data-search]'); 

  searchBarText();
  searchBarVoice();

function searchBarText(value){
  searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchBox.style.display = 'none';
      blackBox.style.display = 'none';
      const value = e.target.value.toLowerCase().trim();
      articles.forEach(object => {
        // 若為空白則全部顯示
        const isVisible = (object.cityName.toLowerCase().includes(value) || object.className.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
        object.element.style.display = isVisible ? 'flex' : 'none';
        });
      }
  })
}

  searchGlass.addEventListener('click', e => {
    e.preventDefault();
    searchBox.style.display = 'none';
    blackBox.style.display = 'none';
    const value = searchInput.value.toLowerCase().trim();
    articles.forEach(object => {
      const isVisible = (object.cityName.toLowerCase().includes(value) || object.className.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
      object.element.style.display = isVisible ? 'flex' : 'none';
      })
  })



// search bar audio to text

const micIcon = document.querySelector('.voice');
const speechRecognition = window.webkitSpeechRecognition;

function searchBarVoice(value){
  if(value){
    searchBox.style.display = 'none';
    blackBox.style.display = 'none';
    searchInput.value = '';
    micIcon.style.display = 'flex';
    const value = searchInput.value.toLowerCase().trim();
    articles.forEach(object => {
      const isVisible = (object.cityName.toLowerCase().includes(value) || object.className.toLowerCase().includes(value) || object.preface.toLowerCase().includes(value)) && (value.length > 0);
      object.element.style.display = isVisible ? 'flex' : 'none';
        })
      }
  }

  if (speechRecognition){
    console.log('my browser supports speech Recognition');
    const recognition = new speechRecognition();
    micIcon.addEventListener('click', function micIconClick(){
      micIcon.style.display = 'none'
      recognition.start();
    })
    recognition.addEventListener('end', function() {
      recognition.stop();
    });

    recognition.addEventListener('result', function(event) {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      searchInput.value = transcript;
      setTimeout(function() {
        searchBarVoice(transcript);
      }, 1000); 
    });
  }else{
    micIcon.addEventListener('click', function(){ 
    alert('您的瀏覽器不支援語音辨識功能，請切換瀏覽器')
  })
}

