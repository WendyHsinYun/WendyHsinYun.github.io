// 放置共通的 js code

//loading effect

let logo = document.getElementById('animation-logo');
let animation = document.getElementById('animation');

window.addEventListener('load', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

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

// log in 畫面
const headerLogin = document.getElementById('header-login')
const loginContainer = document.getElementById('loginContainer')
const loginBackground = document.querySelector('.loginBackground') 
const remindBackground = document.querySelector('.remindBackground') 
const remindBox = document.querySelector('.remindBox')

headerLogin.addEventListener('click', function(){
    loginContainer.style.display = 'flex';
    remindBackground.style.display = 'none';
  })

loginBackground.addEventListener('click', function(event){
      if (event.target === loginBackground) {
        loginContainer.style.display = 'none';          
      }
    }
  )

  // 註冊
  const loginGmail = document.getElementById('loginGmail');

  const inputEmail = document.getElementById('email');
  const inputPW = document.getElementById('password');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');
  const buttonOK = remindBox.querySelector('.okButton')
  const buttonNo = remindBox.querySelector('.noButton')
  const remindBoxContent = remindBox.querySelector('.content');

  const forgetPW = loginContainer.querySelector('.forgetPW');

  buttonNo.style.dispaly = 'none'

  // click ok and reload page    
  function windowClose(){
    buttonOK.addEventListener('click', ()=>{
      loginContainer.style.display = 'none';
      location.reload();
    })
  };

  // click ok without reloading 
  function windowCloseOnly(){
    buttonOK.addEventListener('click', ()=>{
      loginContainer.style.display = 'none';
    })
  };

  // remindBox close
  function remindBoxClose(){
    buttonOK.addEventListener('click', ()=>{
      remindBackground.style.display = 'none';
      setTimeout(() => {
        remindBackground.style.display = 'none';
      }, 3000);
    })
  };



  // password reset
  forgetPW.addEventListener('click', ()=>{
    const email = inputEmail.value;
    if (!email) {
      remindBackground.style.display = 'flex';
      remindBoxContent.innerText = '請輸入電子郵件地址';
      remindBoxClose()

    }else{  
        firebase.auth().sendPasswordResetEmail(email)
          .then(() => {
            remindBackground.style.display = 'flex';
            remindBoxContent.innerText = '重設密碼email發送成功';
            windowClose();
            setTimeout(() => {
              location.reload();
            }, 3000);
          }).catch((error) => {
            if(error.code === "auth/invalid-email"){
            remindBackground.style.display = 'flex';
            remindBoxContent.innerText = 'email格式錯誤';
            remindBoxClose();
          }else if(error.code === "auth/user-not-found"){
            remindBackground.style.display = 'flex';
            remindBoxContent.innerText = '帳戶已被移除或不存在';
            remindBoxClose();
          }else{
            remindBackground.style.display = 'flex';
            remindBoxContent.innerText = '重設密碼信件發送失敗，請聯繫管理員';
            remindBoxClose();
          }
      })
    }
})

  // 信箱註冊
  registerBtn.addEventListener("click", function(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPW.value)
    .then(() => {
      console.log("註冊成功");
        firebase.auth().currentUser.sendEmailVerification();
        remindBackground.style.display = 'flex'; 
        remindBoxContent.innerText = '驗證信已寄出';

        forceLogout();
    }).catch((error) => {
      if(error.code === "auth/invalid-email"){
        console.error("註冊失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = '郵件格式不正確';
        windowClose();
      }else if(error.code === "auth/weak-password"){
        console.error("註冊失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = '密碼強度不足喔';
        windowClose();
      }else if(error.code === "auth/email-already-in-use"){
        console.error("註冊失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = ' email 已被註冊，請改用登入';
        windowClose();
      }
    });
  });



// log in, sign in  
  loginBtn.addEventListener("click", function(e){
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPW.value)
    .then((userCredential) => {

      const user = userCredential.user;
      detectLogin(user);
       // 檢查 "isAdmin" 屬性，如果是管理員，則執行相應的操作
      if (user && user.displayName && user.isAdmin) {
        console.log("管理員登錄成功");
        // 執行管理員相應的操作
      } else {
        console.log("使用者登錄成功");
        // 執行使用者相應的操作
      }
    })

    .catch((error) => {
      if(error.code === "auth/invalid-email"){
        console.error("註冊失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = 'email 格式無效';
        windowClose();        
      }else if(error.code === "auth/user-not-found"){
        console.error("註冊失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = '找不到對應的使用者帳號';
        windowClose();        
      }else if(error.code === "auth/wrong-password"){
        console.error("註冊失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = '輸入的密碼不正確';
        windowClose();        
      }else{
        console.error("登入失敗:", error);
        remindBackground.style.display = 'flex';
        remindBoxContent.innerText = '登入失敗，請聯繫管理員';
        windowClose(); 
      }
    });
  })


    // detect log in 
  function detectLogin(user){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        if (user.emailVerified) { // 登入且有通過驗證
          const userId = firebase.auth().currentUser.uid; 

          if (userId !== 'ZQ4JTGykkyWSKihHmd7XwS01Zl12'){
            firebase.database().ref('users/' + user.uid).update({
              isAdmin: false
            })
          }else{
            firebase.database().ref('users/' + user.uid).update({
              isAdmin: true
            })
          }

          firebase.database().ref('users/' + userId).update({
            email: inputEmail.value, 
            password: inputPW.value
          })

          console.log("登入成功:", 'uid:', user.uid, 'display name:', user.displayName, 'photoURL:', user.photoURL, 'emailVerified:', user.emailVerified)

          remindBackground.style.display = 'flex';
          remindBoxContent.innerText = '登入成功';

          if(user.photoURL){
            headerLogin.innerHTML = `<img src="${user.photoURL}" alt="會員照片" style="width: 40px; height: 40px; border-radius: 50%;"/>`;
          }else{
          headerLogin.innerText = '會員';
          // 在 headerLogin 更新為 "會員" 之後，設定點擊事件監聽器
          headerProfile();
          }
          windowCloseOnly();

          }else{ // 沒通過認證
          remindBackground.style.display = 'flex';
          remindBoxContent.innerText = '請先通過信箱認證';
          forceLogout()
          }
      } else {
        console.error("登入失敗:", error);
      }
    });
  }

  // 強制登出
  function forceLogout(){
    firebase.auth().signOut().then(() => {
      loginContainer.style.display = 'flex';
      loginBackground.style.display = 'none';
      windowClose();
      console.log('使用者已登出');
      })
  }

  // profile.html
  function headerProfile(){
    headerLogin.addEventListener('click', function(){
      loginContainer.style.display = 'none';
      const user = firebase.auth().currentUser;
      if (user) {
        window.location.href = 'profile.html';
      } else {
        console.error("目前沒有使用者登入");
      }
   });
  } 

  
// 重整頁面，如果是登入狀態，則顯示"會員" 或是 顯示照片
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("使用者已登入:", user.uid, user.name, user.photoURL);
          
    if (user.uid !== 'ZQ4JTGykkyWSKihHmd7XwS01Zl12'){
      firebase.database().ref('users/' + user.uid).update({
        isAdmin: false,
        email: user.email, // 這裡 set 什麼都會在 profile 被取代掉
        photoURL: user.photoURL
      })
    }else{
      firebase.database().ref('users/' + user.uid).update({
        isAdmin: true,
        email: user.email, // 這裡 set 什麼都會在 profile 被取代掉
        photoURL: user.photoURL
      })
    }
    
    if(user.photoURL){
      headerLogin.innerHTML = `<img src="${user.photoURL}" alt="會員照片" style="width: 40px; height: 40px; border-radius: 50%;"/>`;
      headerProfile();
    }else{
      headerLogin.innerText = '會員';
      headerProfile();
    }
  }
})

  // Gmail 登入（直接註冊成功，不用驗證信）
  loginGmail.addEventListener("click", function(e){
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider(); 
    firebase.auth().signInWithPopup(provider) 
    .then((result) => {
      console.log("Gmail 登入成功");
      console.log("user email：", result.user.email);
      const userId = result.user.uid; 
      remindBackground.style.display = 'flex';
      remindBoxContent.innerText = '登入成功';

      loginContainer.style.display = 'none'; // 新增

      firebase.database().ref('users/' + userId).update({

    }).then(() => {
      console.log("資料儲存成功");
      
    }).catch((error) => {
      console.error("資料儲存失敗:", error);
    });
    }).catch((error) => {
      console.error("註冊失敗:", error);
    });
    });


// 導回主頁
  const logoBtn = document.querySelector('.logo');
  logoBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

// 導至 article.html

  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', function() {
    window.location.href = 'article.html';
  });

// 導至 skilltree.html

  const skilltreeBtn = document.getElementById('skilltree-button')

  skilltreeBtn.addEventListener('click', function() {
    window.location.href = 'skilltree.html';
  });



// Top Button

const scrollBtn = document.getElementById("topwrap");

scrollBtn.addEventListener("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// search bar 

let searchBox = document.getElementById('search-box');
let blackBox = document.getElementById('black-box');
let clickGlass = document.getElementById('click-glass');

const searchGlass = document.querySelector('.search-glass');


let clickCount = 0;

clickGlass.addEventListener('click', function() {
  clickCount += 1;
  if (clickCount === 1) {
  searchBox.style.display = 'flex';
  blackBox.style.display = 'flex';
  document.getElementById('search').focus();}
  if (clickCount === 2) {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
  clickCount = 0;}
});

blackBox.onclick = () => {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
};


// .test-go 測驗
const testGo = document.querySelector('.test-go')
const testContainer = document.querySelector('.testContainer ');

const testBackground = document.querySelector('.testBackground');
const boxContainer = document.querySelectorAll('.boxContainer');

const startBtn = document.querySelector('.startBtn');

const testHeader = document.querySelector('.testHeader');
const testIntro = document.querySelector('.testIntro');

const testQuestion = document.querySelector('.testQuestion');
const testNumber = document.querySelector('.testNumber');
let testList = document.getElementById('testList');
let answerEls = document.querySelectorAll(".answer");
let oneText = document.getElementById("1-text");
let twoText = document.getElementById("2-text");
let threeText = document.getElementById("3-text");
let fourText = document.getElementById("4-text");
let fiveText = document.getElementById("5-text");
 
let pieContainer = document.querySelector('.pieContainer');
var pieChart = document.querySelector('.pieChart');
let pieNum = document.querySelector('.pieNum');
let urlButton = document.getElementById("newURL");


let quizData = [
  {
    question: "選擇在哪座城市學習",
    questionNum: '1/5',
    1: "台北",
    2: "台中",
    3: "高雄",
    4: "各地",
    5: '不重要',
  },
  {
    question: "每月能撥出多少費用學習？",
    questionNum: '2/5',
    1: "3,000元以下",
    2: "6,000元內",
    3: "10,000元內",
    4: "10,0001元以上",
    5: "不重要"
  },
  {
    question: "每周能撥出多少時間學習？",
    questionNum: '3/5',
    1: "16小時以下",
    2: "30小時內",
    3: "45小時內",
    4: "46小時以上",
    5: "不重要"
  },
  {
    question: "對班制的需求是？",
    questionNum: '4/5',
    1: "大班制",
    2: "小班制",
    3: "一對一",
    4: "不重要",
    5: "",
  },
  {
  question: "喜歡什麼樣的教學方式？",
  questionNum: '5/5',
  1: "放養制",
  2: "手把手教制",
  3: "不重要",
  4: "",
  5: "",
},
];


const url = '../json/front-enter-export.json'; 

// 將資料上傳 firebase realtime database， 且 article 名稱是由 index 顯示

// fetch(url)
//   .then(response => response.json())
//   .then(jsonData => {
//     const articles = jsonData.article;
//     const modifiedArticles = Object.keys(articles).reduce((acc, key, index) => {
//       acc[index] = articles[key];
//       return acc;
//     }, {});

//     firebase.database().ref('front-enter-json/article').set(modifiedArticles)

//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });



// 從 firebase 獲取 json 檔案

firebase.database().ref('front-enter-json/article/').on('value', (snapshot) => {
  const articles = Object.values(snapshot.val());
  // console.log(articles);

  compareSchools(quizData, articles); // 比較屬性與題目的相符程度
  let answerData = compareSchools(quizData, articles);
  dispalyQuiz(answerData, articles);
  changePercentage(articles)
  randomClassNum(articles)
  // firebase.database().ref('front-enter-json/article/').set(articles);
})


function compareSchools(quizData, articles) {
  let answerData = [];
  articles.forEach(article => {
    let answers = []; 
    quizData.forEach(question => {
      if (question.questionNum === '1/5') {
        let option = Object.keys(question).find(key => question[key] === article.city);
        answers.push(option);
      }
    });
    quizData.forEach(question => {
      if (question.questionNum === '2/5') {
        let option;
        let fee = parseInt(article.fee);
        if (fee<= 3000) {
          option = "1";
        } else if (fee > 3000 && fee <= 6000) {
          option = "2";
        } else if (fee > 6000 && fee <= 10000) {
          option = "3";
        } else {
          option = "4";
        }
          answers.push(option);
        }
    });
    quizData.forEach(question => {
      if (question.questionNum === '3/5') {
        let option;
        let weekHour = parseInt(article.weekHour);
        if (weekHour<= 16) {
          option = "1";
        } else if (weekHour > 16 && weekHour <= 30) {
          option = "2";
        } else if (weekHour > 30 && weekHour <= 45) {
          option = "3";
        } else {
          option = "4";
        }
          answers.push(option);
        }
    });
    quizData.forEach(question => {
      if (question.questionNum === '4/5') {
        let option = Object.keys(question).find(key => question[key] === article.classType);
        answers.push(option);
      }
    });
    quizData.forEach(question => {
      if (question.questionNum === '5/5') {
        let option = Object.keys(question).find(key => question[key] === article.teachWay);
        answers.push(option);
      }
    });
    // 將 options 結果加入 answerData
    answerData.push({ name: article.name, options: answers, id: article.creatTime });
    
  });
  return answerData;
}


  let currentQuiz = 0; //當前測驗
  let score = 0;
  let answers = [];
  
  function loadQuiz() {
    deselectAnswer();
    let currentQuizData = quizData[currentQuiz];
    testQuestion.innerText = currentQuizData.question;
    testNumber.innerText = currentQuizData.questionNum; 
    oneText.innerText = currentQuizData[1];
    twoText.innerText = currentQuizData[2];
    threeText.innerText = currentQuizData[3];
    fourText.innerText = currentQuizData[4];
    fiveText.innerText = currentQuizData[5];
  }
  
  function deselectAnswer() {
    answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }
  

  function getSelected() {  // 檢查哪一個選項被選中
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answers.push(answerEl.id);
      }
    });
    return answers;
  }


  
  function testEnd(){ // 中途停止
  testBackground.addEventListener('click', function(event){
    if (event.target === testBackground) {
      setTimeout(function() {
        currentQuiz = 0;
        percentage = 0;
        testContainer.style.display = 'none';
        testQuestion.style.display = 'none';
        testNumber.style.display = 'none';
        pieContainer.style.display = 'none';
        urlButton.style.display = 'none'
        answers = [];
        console.log(percentage);
      }, 0);
    }
    else if(event.target === boxContainer){('click', function(event) {event.stopPropagation()})
  }
  })
}

  testEnd();


  var beforeRotation; 
  var afterRotation;
  var lightBlue = '#1ad8d3';
  var darkBlue = '#1cb5e0';
  var beforeBackgroundColor = lightBlue;
  var afterBackgroundColor = lightBlue;

  pieChart.style.setProperty('--before-background-color', beforeBackgroundColor);
  pieChart.style.setProperty('--after-background-color', afterBackgroundColor);


  function rotateDeg() {  // 依照 percentage 設定旋轉度數 
    if (percentage >= 0 && percentage < 20) {
      beforeRotation = 0;
      afterRotation = 0;
    } else if (percentage >= 20 && percentage < 40) {
      beforeRotation = 60;
      afterRotation = 186;
    } else if (percentage >= 40 && percentage < 60) {
      beforeRotation = 130;
      afterRotation = 180;
    } else if (percentage >= 60 && percentage < 80) {
      beforeRotation = 40;
      afterRotation = 0;
      pieChart.style.backgroundColor = lightBlue;
      beforeBackgroundColor = darkBlue;
      afterBackgroundColor = darkBlue;
    } else if (percentage >= 80 && percentage < 100) {
      beforeRotation = 40;
      afterRotation = -50;
      pieChart.style.backgroundColor = lightBlue;
      beforeBackgroundColor = darkBlue;
      afterBackgroundColor = darkBlue;
    }else if (percentage == 100){
          beforeRotation = 0;
          afterRotation = 0;
          beforeBackgroundColor = darkBlue;
          afterBackgroundColor = darkBlue;
  }
    pieChart.style.setProperty('--before-rotation', beforeRotation + 'deg');
    pieChart.style.setProperty('--after-rotation', afterRotation + 'deg');
    pieChart.style.setProperty('--before-background-color', beforeBackgroundColor);
    pieChart.style.setProperty('--after-background-color', afterBackgroundColor);
  }


    testGo.addEventListener('click', function(){  // 從首頁開啟測驗介紹
          currentQuiz = 0;
          testContainer.style.display = 'flex';
          testHeader.style.display = 'flex';
          testIntro.style.display = 'flex';
          startBtn.style.display = 'flex';
          testList.style.display = 'none';
          console.log(currentQuiz);
        })

    startBtn.addEventListener('click', function(){ 
      // 從測驗介紹開始測驗
      currentQuiz = 0;
      testHeader.style.display = 'none';
      testIntro.style.display = 'none';
      this.style.display = 'none';
      testQuestion.style.display = 'flex';
      testNumber.style.display = 'flex';
      testList.style.display = 'flex';
      loadQuiz();
      console.log(currentQuiz);
    })


    
    // 隨機動畫之後顯示結果
    function randomPercentage() {
      return Math.floor(Math.random() * 101) + '%'; 
    }

    function randomClassNum(articles){
      return Math.floor(Math.random() * (articles.length));
    }

    function changePercentage(articles) {
      var intervalId = setInterval(function() {
        pieNum.textContent = randomPercentage(); 
        urlButton.textContent = articles[randomClassNum(articles)].name
      }, 250); // 每 0.3 秒變換一次數字
      setTimeout(function() {
        clearInterval(intervalId); 
        pieNum.textContent = `${percentage}%`;
        urlButton.textContent = `${matchedSchool}`;
        rotateDeg();
        urlButton.addEventListener('click',()=>{
          window.location.href = newURL;
        })
      }, 4000);
    }
    

    let percentage = 0; 
    let matchedSchool = ''; 
    let id = '';
    let newURL = '';
  
    

    // 按下選項
    function dispalyQuiz(answerData, articles){

    answerEls.forEach(e=>e.addEventListener("click", (event) => {
      event.stopPropagation();
      let answers = getSelected(); 
      console.log(answers);
      console.log(currentQuiz);
      
      currentQuiz++;
    
      if (currentQuiz < quizData.length) {
        setTimeout(() => {
          loadQuiz();
        }, 100);
      } else {
        let maxScore = 0;
        testQuestion.innerText = '你有多適合下列學校呢？';
        testNumber.style.display = 'none';
        testList.style.display = 'none';
        pieContainer.style.display = 'flex';
        urlButton.style.display = 'flex';

        answerData.forEach((school) => {
          let score = 0;
          
          for (let i = 0; i < answers.length; i++) {
            if (answers[i] === school.options[i]) {
              score++;
            }
          }
            if (score > maxScore) {
            maxScore = score;
            matchedSchool = school.name;
            id = school.id;
            newURL = `content.html?id=${id}`;
            percentage = ((score / answers.length) * 100).toFixed(0);
            }
          })
          changePercentage(articles);
          console.log(percentage);
          console.log(matchedSchool); 
          console.log(id); 
      }
    }
   ))
 }

 