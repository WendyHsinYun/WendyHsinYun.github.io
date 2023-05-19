


// show content dynamically based on URL.

  firebase.database().ref('front-enter-json/').on('value', (snapshot) => {
    const data = snapshot.val(); // 獲取快照值
    
    const schools = Object.values(data.article).map(object => {
      return {
        cityName: object.city, 
        className: object.name, 
        preface: object.preface, 
        classType: object.classType, 
        teachWay: object.teachWay, 
        id: object.creatTime, 
        topic: object.topic, 
        content: object.content, 
        totalDay: object.totalDay, 
        weekHour: object.weekHour, 
        technology: object.technology, 
        mail: object.mail, 
        phone: object.phone,
        rectangleUrl: object.rectangleUrl,
        squareUrl: object.squareUrl};  
    });

    const navUpper = document.getElementById('nav-upper');
    const navUpperBackground = navUpper.querySelector('.nav-upper-background') 
    const className = navUpper.querySelector('.className') 
    const mainTitle = document.getElementById('mainTitle');
    const mainContent = document.getElementById('mainContentText').querySelector('p') 
    const boxTable = document.getElementById('boxTable')
    const city = boxTable.querySelector('.city') 
    const classType = boxTable.querySelector('.classType') 
    const teachWay = boxTable.querySelector('.teachType') 
    const totalDay = boxTable.querySelector('.totalDay') 
    const weekHour = boxTable.querySelector('.weekHour') 
    const tech = boxTable.querySelector('.tech') 
    const mail = boxTable.querySelector('.mail') 
    const phone = boxTable.querySelector('.phone') 

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // get id parameter on the URL

    const object = schools.find(article => article.id === parseInt(id)); // 將字符串轉換成整數
    navUpperBackground.setAttribute('src', object.rectangleUrl);
    
    className.textContent = object.className;
    mainTitle.textContent = object.topic;
    mainContent.innerHTML = object.content;
    city.textContent = object.cityName;
    classType.textContent = object.classType;
    teachWay.textContent = object.teachWay;
    totalDay.textContent = `${object.totalDay}天`;
    weekHour.textContent = `${object.weekHour}小時`;
    tech.textContent = `${object.technology}小時`;
    mail.textContent = object.mail;
    phone.textContent = object.phone;

    localStorage.setItem('schools', JSON.stringify(schools));
  });

  
// 按下圖片時會跳出大圖片

  let leftImgs = document.querySelectorAll('.leftImg');
  const leftImgOne = document.querySelector('.leftImgOne');
  const leftImgTwo = document.querySelector('.leftImgTwo');
  const leftImgThree = document.querySelector('.leftImgThree');
  const leftImgFour = document.querySelector('.leftImgFour');
  const leftImgFive = document.querySelector('.leftImgFive');
  let popUpImgContainer = document.querySelector('.popUpImgContainer');
  let popUpImgBackgroud = document.querySelector('.popUpImgBackgroud');
  let triLeft = document.querySelector('.TriLeft');
  let popUpImg = document.querySelector('.popUpImg');
  let triRight = document.querySelector('.TriRight');

  
  var imageUrls = [
    'https://frankyeah.github.io/Front-Enter/images/2.jpg',
    'https://frankyeah.github.io/Front-Enter/images/13.jpg',
    'https://frankyeah.github.io/Front-Enter/images/15.jpg',
    'https://frankyeah.github.io/Front-Enter/images/7.jpg',
    'https://frankyeah.github.io/Front-Enter/images/AppWorksShool-rectangle.jpg'
  ]
  
  const leftImages = [leftImgOne, leftImgTwo, leftImgThree, leftImgFour, leftImgFive]; 

  leftImages.forEach((leftImg, index) => {
    leftImg.style.background = `url('${imageUrls[index]}') 50% / cover no-repeat`;
  });
  
  leftImgs.forEach((leftImg, index) => {
    leftImg.addEventListener('click', function(){
      currentImageIndex = index;
      popUpImgContainer.style.display = 'flex';
      popUpImg.style.background = this.style.background;
    })
  })

  popUpImg.addEventListener('click', function(event){
    event.stopPropagation();
  });

  popUpImgBackgroud.addEventListener('click', function(){
    popUpImgContainer.style.display = 'none';
  })
  
 // 跳出大圖片後可以左右輪播

 let currentImageIndex = null;

triLeft.addEventListener('click', () => {
  event.stopPropagation();
  if (currentImageIndex !== null) {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = imageUrls.length - 1;
    }
    popUpImg.style.background = `url('${imageUrls[currentImageIndex]}') 50% / cover no-repeat`;
  }
});

  triRight.addEventListener('click', function(event){
    event.stopPropagation();
    if (currentImageIndex !== null) {
      currentImageIndex++;
      if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
      }
      popUpImg.style.background = `url('${imageUrls[currentImageIndex]}') 50% / cover no-repeat`;
    }
  });



// search bar 
const searchInput = document.querySelector('[data-search]'); 

searchInput.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    window.location.href = 'article.html';
    }
})

searchGlass.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'article.html';
})
