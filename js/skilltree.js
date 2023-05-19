
var lightBlue = '#1ad8d3';


const leftBlock = document.querySelector('.leftBlock')
const centerBlock = document.querySelector('.centerBlock')
const rightBlock = document.querySelector('.rightBlock')

const htmlBlock = document.querySelector('.htmlBlock');
const cssBlock = document.querySelector('.cssBlock')
const jqueryBlock = document.querySelector('.jqueryBlock')
const scssBlock = document.querySelector('.scssBlock')
const bootstrapBlock = document.querySelector('.bootstrapBlock')

const jsBlock = document.querySelector('.jsBlock')
const rwdBlock = document.querySelector('.rwdBlock')
const githubBlock = document.querySelector('.githubBlock')
const webpackBlock = document.querySelector('.webpackBlock')
const reactBlock = document.querySelector('.reactBlock')
const unitTestBlock = document.querySelector('.unitTestBlock')

const html = centerBlock.querySelector('.html')
const css = centerBlock.querySelector('.css')
const js = centerBlock.querySelector('.js')
const jquery = centerBlock.querySelector('.jquery')

const rwd = centerBlock.querySelector('.rwd')
const github = centerBlock.querySelector('.github')
const scss = centerBlock.querySelector('.scss')
const webpack = centerBlock.querySelector('.webpack')

const bootstrap = centerBlock.querySelector('.bootstrap')

const react = centerBlock.querySelector('.react')
const unitTest = centerBlock.querySelector('.unitTest')

const gameContainer = document.querySelector('.gameContainer')
const gameBackground = document.querySelector('.gameBackground')


const blockNames = [
    'htmlBlock',
    'cssBlock',
    'jqueryBlock',
    'scssBlock',
    'bootstrapBlock',
    'jsBlock',
    'rwdBlock',
    'githubBlock',
    'webpackBlock',
    'reactBlock',
    'unitTestBlock',
  ];
  
const blocks = blockNames.map(name => document.querySelector(`.${name}`));

// 滑鼠經過時，顯示灰框
for (let i = 0; i < blockNames.length; i++) {
  const name = blockNames[i];
  const block = blocks[i];
  
  const element = centerBlock.querySelector(`.${name.replace('Block', '')}`);
    
  element.addEventListener('mouseover', () => {
    block.style.display = 'flex';
    block.style.transform = 'scale(1)';
    block.style.transformOrigin = 'top';
    block.style.transition = 'transform 0.5s';
  });
  
  element.addEventListener('mouseleave', () => {
    block.style.transform = 'scaleY(0) translate(-70px, 150px)';
    block.style.transformOrigin = 'top';
  });

}



let gameData = {
    "html": {
      question: "請問 HTML 是什麼？",
      1: "標籤語言",
      2: "資料庫工具",
      3: "瀏覽器規範",
      ans: 1,
      order: 1,
      display: "你通過第一關，HTML 是成為前端工程師的橋頭堡，也是網站給人的第一印象，一定要學好才行。"
   },
    "css" : {
      question: "SCSS 跟 CSS 差別？",
      1: "SCSS 用變數控制",
      2: "SCSS 非縮排語法",
      3: "不同程式語言",
      ans: 1,
      order: 2,
      display: "哇，你竟然連 CSS 也略懂略懂。如果階層樣式學得好，就具備基礎網頁設計師的能力了，這時候，對於細節的掌握就更加重要囉。"
    },
    "js" : {
      question: "何者非 JS 定義變數的方式？",
      1: "function",
      2: "var",
      3: "let",
      ans: 1,
      order: 3,
      display: "恭喜你通過 JavaScript 關卡。JavaScript 也是小編最喜歡的語言，掌握它，就等於邁入前端工程師的行列，它不只能為你帶來一份工作，也擴展你的視野，擁有接軌科技的能力。"
    },
  "rwd" : {
    question: "如何在不同螢幕寬度下改變樣式？",
    1: "透過 media 操作",
    2: "使用事件物件",
    3: "變數控制",
    ans: 1,
    order: 4,
    display: "RWD 很神奇吧，它讓你在手機、平板上，都能方便觀看網頁，而不用放大縮小視窗，是讓使用者體驗升級的良方。"
  },
  "jquery":{
    question: "jQuery 與 JS 之比較何者正確？",
    1: "jQuery 含錢字符號",
    2: "JS 是一種框架",
    3: "jQuery 並未開源",
    ans: 1,
    order: 5,
    display: "jQuery 是相當方便的 JavaScript 函式庫，它幫你把程式封裝好，只要加上經典的 $ 字號作為前綴，就能使用眾多功能。"
  },
  "github":{
    question: "GitHub 不能做什麼？",
    1: "測試程式正確性",
    2: "程式碼倉庫",
    3: "共同軟體開發",
    ans: 1,
    order: 6,
    display: "在學習程式語言之前，很難想像有 GitHub 的存在吧，竟然有個倉庫專門在管理程式語言，還能讓人複製、共同編輯，並記錄每一次的 commit ，是一款優秀的協作工具。"
  },
  "scss":{
    question: "何者不屬於 CSS 預處理器？",
    1: "Gulp",
    2: "SCSS",
    3: "PostCSS",
    ans: 1,
    order: 7,
    display: "css 屬於程式設計入門款，而預處理器能以更有效率的方式，撰寫階層樣式，如果你擁有 JavaScript 的基本概念，學起來會特別快唷。"
  },
  "bootstrap": {
    question: "Bootstrap 是一種？",
    1: "樣式擴充元件",
    2: "打包工具",
    3: "套件管理工具",
    ans: 1,
    order: 8,
    display: "看來你學蠻快的，Bootstrap 能做到的，css 也能做到，如果有時間，不仿試試手刻 Bootstrap 的特效，精進樣式調校的能力。"
  },
  "webpack":{
    question: "使用 Webpack 需要安裝？",
    1: "Node.js",
    2: "Babel",
    3: "styled-components",
    ans: 1,
    order: 9,
    display: "你已經越來越厲害，掌握了近期火紅的打包工具，Webpack 和 React 是絕配，是幫助瀏覽器進行「翻譯」的良方。"
  },
  "react": {
    question: "React 有何特性？？",
    1: "建置單頁式網站",
    2: "不存在異步問題",
    3: "不需要 Babel 編譯",
    ans: 1,
    order: 10,
    display: "你太強了，React 是不容易掌握的框架，能讓使用者的體驗更好，你所使用的 facebook 就是運用這套框架呢。"
  },
  "unitTest":{
    question: "為什麼要做單元測試？",
    1: "確保程式邏輯正確",
    2: "讓 scrum 運作順利",
    3: "資料安全性",
    ans: 1,
    order: 11,
    display: "終於抵達最後一關了，單元測試是為了確保函式的正確性，而進行的作業。雖然單元測試是最後一關，但工程的世界無止盡，身為一位 geek 就是要不斷學習精進唷。"
  }
}


const gContainer = document.querySelector('.gContainer');
const gameHeader = gContainer.querySelector('.gameHeader');
const firstAns = gContainer.querySelector('.firstAns');
const secondAns = gContainer.querySelector('.secondAns');
const thirdAns = gContainer.querySelector('.thirdAns');
const allOptions = gContainer.querySelectorAll('button')
const dContainer = document.querySelector('.dContainer')

const displayBackground = document.querySelector('.displayBackground')
const gArrow = gContainer.querySelector('.gArrow')

const userIcon = document.querySelector('.user-icon')

gArrow.style.display = 'none'



  // 第一關
  html.style.border = `1px solid ${lightBlue}`;
  if (html.style.color !== lightBlue) {
    html.style.color = lightBlue;
  }


    const keys = Object.keys(gameData); 

    



        for (let i = 0; i < keys.length; i++) {
          // 選取下一關
          const key = keys[i];
          const element = centerBlock.querySelector(`.${key}`);
          const nextKey = keys[i+1];
          const nextBlock = centerBlock.querySelector(`.${nextKey}`);
    
          element.addEventListener('click', (e) => {
            playGame(element, gameData[key], nextBlock);  
            
            // console.log(element, gameData[key], nextBlock)
          });
        }


  // change icon
  const iconContainer = document.querySelector('.iconContainer')
  const iconBackground = document.querySelector('.iconBackground')
  const iconBox = document.querySelector('.iconBox')
  const cute1 = document.querySelector('.cute1')
  const cute2 = document.querySelector('.cute2')
  const cute3 = document.querySelector('.cute3')

  userIcon.addEventListener('click', ()=>{
    iconContainer.style.display = 'flex'
  })

  iconBackground.addEventListener('click', function(e){
    if(e.target === iconBackground){
      iconContainer.style.display = 'none'
    }
  })

  cute1.addEventListener('click', ()=>{
    userIcon.style.background = 'url("https://frankyeah.github.io/Front-Enter/images/cute.svg")no-repeat center center/cover'
    iconContainer.style.display = 'none'
  })

  cute2.addEventListener('click', ()=>{
    userIcon.style.background = 'url("https://frankyeah.github.io/Front-Enter/images/cute2.svg")no-repeat center center/cover'
    iconContainer.style.display = 'none'
  })

  cute3.addEventListener('click', ()=>{
    userIcon.style.background = 'url("https://frankyeah.github.io/Front-Enter/images/cute3.svg")no-repeat center center/cover'
    iconContainer.style.display = 'none'
  })


  // 讓大頭跟槓槓移動
  const line1 = document.querySelector('.line1')
  const line2 = document.querySelector('.line2')
  const line3 = document.querySelector('.line3')
  const line4 = document.querySelector('.line4')
  const line5 = document.querySelector('.line5')
  const line6 = document.querySelector('.line6')
  
  const line7 = document.querySelector('.line7')


  function gameAnimate(objectName){
  if(objectName === 'html'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(-60px, 100px)';
    line1.querySelector('.slash').style.border = 'none'
  }
  if(objectName === 'css'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(100px, 100px)';  
    line2.querySelector('.horiz').style.border = 'none'
  }
  if(objectName === 'js'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(100px, 200px)';  
    line3.querySelector('.pipe').style.border = 'none'
  }
  if(objectName === 'rwd'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(-60px, 200px)';
    line3.querySelector('.slash').style.border = 'none'
  }
  if(objectName === 'jquery'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(0px, 300px)';  
    line4.querySelector('.slash').style.border = 'none'
  }
  if(objectName === 'github'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(-60px, 400px)';  
    line5.querySelector('.slash').style.border = 'none'
  }
  if(objectName === 'scss'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(-60px, 500px)';  
    line6.querySelector('.pipe-one').style.border = 'none'
  }
  if(objectName === 'bootstrap'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(100px, 400px)';  
    
    line5.querySelector('.backslash').style.border = 'none'

  }
  if(objectName === 'webpack'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(100px, 500px)';
    line6.querySelector('.pipe-two').style.border = 'none'
  }
  if(objectName === 'react'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(0px, 600px)';  
    line7.querySelector('.slash').style.border = 'none'
  }
  if(objectName === 'unitTest'){
    userIcon.style.transition = 'transform 0.5s ease-in-out';
    userIcon.style.transform = 'translate(0px, 600px)';  
  }

}

    

  



let currentOrder = 1; // 目前所處的關卡

console.log(currentOrder)


  function playGame(ele, data, nextBlock) {
    const allBlocks = document.querySelectorAll('.block'); 

    if (data.order > currentOrder || ele.classList.contains('completed')) {// 鎖住前面的關卡
      // 通過一關後，只能玩下一關
      // console.log(ele)
      console.log(currentOrder)
      
      return;
    }else{
      // console.log(ele)
      currentOrder = data.order + 1;

      // 顯示關卡與按鈕
      gameContainer.style.display = 'flex';
      gameBackground.style.dispaly = 'flex'
      gameHeader.textContent = data.question;
      firstAns.innerHTML = data[1]
      secondAns.innerHTML = data[2]
      thirdAns.innerHTML = data[3] 

      allOptions.forEach(o => 
        o.addEventListener('click', function(e){
        const clickedBtn = e.target;

        if( clickedBtn.textContent === data[`${data.ans}`]){ // 破關 

          // 讓大頭跟槓槓移動
          const objectName = Object.keys(gameData).find(key => gameData[key] === data);
          console.log(objectName); // html 

          gameAnimate(objectName);

          // 正確的按鈕出現勾勾
          clickedBtn.innerHTML = `${data[data.ans]}<div class="check"></div>`
          clickedBtn.classList.add('shake');
          clickedBtn.addEventListener('animationend', () => {
            clickedBtn.classList.remove('shake');
          });

          // 跳出黑底字幕
          displayBackground.style.display = 'flex'
          // 帶入黑底字幕、打卡機效果
          typeDisplay(data)

          // 完成的關卡不能重新
          ele.classList.add('completed');
          allBlocks.forEach(block => {
            if (block !== ele) {
              block.disabled = true;
            }
          });

          console.log('correct')

          gArrow.style.display = 'flex'

          //按對的關卡改顏色
          ele.style.backgroundColor = lightBlue
          ele.style.borderColor = lightBlue 
          ele.style.color = 'white'

          // 下一關的框框跟文字改顏色
          nextBlock.style.border = `1px solid ${lightBlue}`;
          if (nextBlock.style.color !== lightBlue) {
            nextBlock.style.color = lightBlue;
          }
        
        }else { // 答錯
          if (!clickedBtn.innerHTML.includes('cross')) {
          clickedBtn.innerHTML = `${clickedBtn.innerHTML}<div class="cross"></div>`;}
          clickedBtn.classList.add("shake");
          clickedBtn.addEventListener("animationend", () => {
            clickedBtn.classList.remove("shake");
          });
          console.log('答錯')
        }
        })
      );
    }}


  // 打字機效果

  const displayP = dContainer.querySelector('p');
  let timeouts = [];

  function typeDisplay(data) {
    displayP.innerHTML = '';
    const text = data.display;

    timeouts.forEach(id => clearTimeout(id)); // 清除所有計時器

    for (let i = 0; i < text.length; i++) {
      const timeoutId = setTimeout(() => {
        displayP.innerHTML += text[i];
        if (i === text.length - 1) {
        }
      }, i * 100);
      timeouts.push(timeoutId); // 將 ID 存儲在陣列中

      const timeout2Id = setTimeout(() => {
        displayBackground.style.display = 'none';
      }, 7000);
      timeouts.push(timeout2Id);
    }

    displayBackground.addEventListener('click', function(event){
      if (event.target === displayBackground) {
        displayBackground.style.display = 'none';
        timeouts.forEach(id => clearTimeout(id)); // 清除所有計時器
        
        
      }
    })
  }

  gameBackground.addEventListener('click', function(event){
    if (event.target === gameBackground) {
      gameContainer.style.display = 'none';
      timeouts.forEach(id => clearTimeout(id)); // 清除所有計時器
      gArrow.style.display = 'none'
    }
  })