// 在 profile.html 頁面的 JavaScript 中

const profileHeader = document.getElementById('profileHeader')

const profileEmail = document.getElementById('profileEmail');
const profileName = document.getElementById('profileName');
const profilePhone = document.getElementById('profilePhone');

const modifyData = document.querySelector('.modifyData');
const modified = document.querySelector('.modified');
const cancel = document.querySelector('.cancel');

const profileUl = document.getElementById('profile')
// console.log(profileUl);
const profileInputList = profileUl.querySelectorAll('input')

const logoutBtn = document.querySelector('.logout');

const inputPhoto = document.getElementById('inputPhoto')

const line = document.querySelector('.line');
const personalData = document.querySelector('.personalData')

const collection = document.querySelector('.collectBtn')

const modifyBtn = document.querySelector('.modifyBtn');

const dataCollection = document.querySelector('.dataCollection')

const postManageBtn = document.querySelector('.postManageBtn')

const collectTemplate = document.querySelector('[data-collection]');

const postBtn = document.querySelector('.postBtn')
const postTitle = document.querySelector('.postTitle')

const postArea = document.querySelector('.postArea')

const postFirstCol = document.querySelector('.postFirstCol')


var lightBlue = '#1ad8d3';

postBtn.style.display = 'none';
postArea.style.display = 'none';

//  個人資料
personalData.addEventListener('click', ()=>{
  inputPhoto.style.display = 'flex';
  profileUl.style.display = 'flex';
  modifyBtn.style.display = 'flex';
  postFirstCol.style.display = 'none';
  postBtn.style.display = 'none';
  profileHeader.textContent = '會員中心';
  profileHeader.style.backgroundColor = '#737373'
  dataCollection.style.display = 'none';
  postArea.style.display = 'none';
  
})

// 收藏
collection.addEventListener('click', ()=>{
  inputPhoto.style.display = 'none';
  profileUl.style.display = 'none';
  modifyBtn.style.display = 'none';
  postFirstCol.style.display = 'none';
  postBtn.style.display = 'none';
  profileHeader.textContent = '會員中心';
  profileHeader.style.backgroundColor = '#737373'
  dataCollection.style.display = 'flex';
  postArea.style.display = 'none';
})


// 只有管理員才會出現管理文章按鈕

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//   const userId = user.uid;
//   firebase.database().ref('users/' + userId).on('value', (snapshot) => {
//     const userData = snapshot.val();
//     // console.log(userData.isAdmin) 
//     if(userData.isAdmin === true){
//       console.log('管理員')
//       postManageBtn.style.display = 'block'
//     }else{
//       console.log('非管理員')
//       postManageBtn.style.display = 'none'
//     }
//   })
//   }
// })



// 顯示 blog post system

postManageBtn.addEventListener('click', ()=>{
  inputPhoto.style.display = 'none';
  profileUl.style.display = 'none';
  modifyBtn.style.display = 'none';
  dataCollection.style.display = 'none';
  collectTemplate.style.display = 'none';
  profileHeader.textContent = '後台文章管理'
  postFirstCol.style.display = 'flex';
  profileHeader.style.backgroundColor = lightBlue
  postSystem.style.display = 'flex';
  createPostArea.style.display = 'none'
  postBtn.style.display = 'flex';
  postArea.style.display = 'flex';
  delBtn.style.display = 'flex'
})

        


// blog post system 顯示文章及 postClicked

const managePostTemplate = document.getElementById('managePost')

firebase.database().ref('front-enter-json/article/').on('value', (snapshot) => { 
  const articles = Object.values(snapshot.val());

  // 所有文章先清除，以免不斷增生
  postArea.innerHTML = '';  

  articles.forEach((article, index) => { 
    
    const postUl = managePostTemplate.content.cloneNode(true).children[0]; //  把 article 的資料填入 postUl
    if(article.postClicked === true){  
      postUl.style.backgroundColor = lightBlue
    }
    postUl.style.display = 'flex'
    const postHeader = postUl.querySelector('.postHeader');
    const postPreface = postUl.querySelector('.postPreface');
    const postTimeStamp = postUl.querySelector('.postTimeStamp')
    postHeader.textContent = article.name;
    // postPreface.textContent = article.postClicked
    postPreface.textContent = article.preface
    postUl.style.color = '#5f5f5f'
    const date = new Date(article.creatTime);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    const formattedDate = date.toLocaleString('en-US', options);
    const trimmedDate = formattedDate.replace(' GMT+0800 (台北標準時間)', '\n');
    postTimeStamp.textContent = trimmedDate;
    postArea.append(postUl);
    
    // 點擊後儲存 postClicked 

    postUl.addEventListener('click', function(e){
      // 將其他所有 article 的 postClicked 變成 false
      articles.forEach((a, j) => {
        if (j !== index) {
          a.postClicked = false;
          firebase.database().ref('front-enter-json/article/' + j ).update(a);
        }
      });
      // 被點擊的該篇 postClicked 為 true
      article.postClicked = true; 
      firebase.database().ref('front-enter-json/article/' + index).update(article);
    })


  })
});



  // remind Box
  let remindPostContent = '儲存文章成功!'

  function postRemind(){
    loginContainer.style.display = 'flex';
    loginBackground.style.display = 'none';
    remindBackground.querySelector('.content').textContent = remindPostContent
    remindBackground.querySelector('.header').style.display = 'none';
    remindBackground.querySelector('.content').style.fontWeight = '600'
    remindBox.style.justifyContent = 'center'

    profileHeader.style.backgroundColor = lightBlue
    postSystem.style.display = 'flex';
    postBtn.style.display = 'flex';
    postArea.style.display = 'flex';
    postBtnList.style.display = 'none';
    createPostPage.style.display = 'none';
    delBtn.style.display = 'flex'

    setTimeout(() => {
      location.reload();
    }, 1000);          

  }

// upload photos // 目前同時只能上傳一個


const recLi = document.querySelector('.recLi')
const sqLi = document.querySelector('.sqLi') 
const imagePreviewRec = recLi.querySelector('.image-preview')
const imagePreviewSq = sqLi.querySelector('.image-preview')
const uploadBtnRec = recLi.querySelector('.upload-file')
const uploadBtnSq = sqLi.querySelector('.upload-file')
const selectSq = sqLi.querySelector('.select-file')
const selectRec = recLi.querySelector('.select-file')

var fileInput = null;

selectRec.disabled = false
selectSq.disabled = false



// 監聽選擇檔案的按鈕點擊事件
selectRec.addEventListener('click', function() {
  selectSq.disabled = true; // alert 請先上傳一張圖片 
  
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener('change', function(e) {
    var file = e.target.files[0];
    fileInput = e.target;
    var reader = new FileReader();

    // 監聽圖片讀取完成事件
    reader.addEventListener('load', function(e) {
      var img = recLi.querySelector('img')
      img.src = e.target.result;
      img.style.objectFit = 'cover';
      img.style.height = '150px'
      img.style.width = '300px'    

      var deletePhoto = document.createElement('span');

      deletePhoto.innerHTML = '&times;'; 
      deletePhoto.style.fontSize = '24px'    
      deletePhoto.style.fontWeight = 'bold' 
      deletePhoto.style.display = 'block'; 
      deletePhoto.style.height = '20px'
      deletePhoto.style.width = '20px'    

      deletePhoto.addEventListener('click', function() {
        img.remove();
        fileInput.value = '';
        deletePhoto.remove();
        uploadBtnRec.disabled = true;
      });

      imagePreviewRec.appendChild(deletePhoto);
      uploadBtnRec.disabled = false;
    });
    reader.readAsDataURL(file);
  });

  // 觸發選擇檔案對話框
  input.click();
  selectSq.disabled = false;
});



// 監聽選擇檔案的按鈕點擊事件
selectSq.addEventListener('click', function() {
  selectRec.disabled = true
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener('change', function(e) {
    var file = e.target.files[0];
    fileInput = e.target;
    var reader = new FileReader();

    // 監聽圖片讀取完成事件
    reader.addEventListener('load', function(e) {
      var img = sqLi.querySelector('img')
      img.src = e.target.result;
      img.style.objectFit = 'cover';
      img.style.height = '150px'
      img.style.width = '150px'    


      var deletePhoto = document.createElement('span');
      deletePhoto.innerHTML = '&times;'; 
      
      deletePhoto.style.fontSize = '24px'    
      deletePhoto.style.fontWeight = 'bold' 
      deletePhoto.style.display = 'block'; 
      deletePhoto.style.height = '20px'
      deletePhoto.style.width = '20px'    

      deletePhoto.addEventListener('click', function() {
        img.remove();
        fileInput.value = '';
        deletePhoto.remove();
        uploadBtnSq.disabled = true;
      });

      imagePreviewSq.appendChild(deletePhoto);
      uploadBtnSq.disabled = false;
    });
    reader.readAsDataURL(file);
  });

  // 觸發選擇檔案對話框
  input.click();
  selectRec.disabled = false
});



// 上傳按鈕點擊事件處理
uploadBtnRec.addEventListener('click', function(e) {
  var img = recLi.querySelector('img')
  var deletePhoto = recLi.querySelector('span')
  var file = fileInput.files[0];
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child('images/' + file.name).put(file);

  uploadTask.on('state_changed', function(snapshot) {

  }, function(error) {
    console.log(error);
  }, function() {
    console.log('檔案已成功上傳。');
    alert('檔案已成功上傳。');
    // 獲取上傳後的檔案雲端連結
    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
      recDownloadURL = url; // 將檔案的雲端連結賦值給全域變數
    });
    
    fileInput.value = '';
    deletePhoto.remove();
  });
});


// 上傳按鈕點擊事件處理
uploadBtnSq.addEventListener('click', function(e) {
  // var img = sqLi.querySelector('img')
  var deletePhoto = sqLi.querySelector('span')
  var file = fileInput.files[0];
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child('images/' + file.name).put(file);

  uploadTask.on('state_changed', function(snapshot) {

  }, function(error) {
    console.log(error);
  }, function() {
    console.log('檔案已成功上傳。');
    alert('檔案已成功上傳。');
    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
      sqDownloadURL = url; // 將檔案的雲端連結賦值給全域變數
    });
    fileInput.value = '';
    deletePhoto.remove();
  });
});



// create Post, edit post, delete post 

  const createBtn = document.querySelector('.createBtn')
  const changeBtn = document.querySelector('.changeBtn')
  const delBtn = document.querySelector('.delBtn')
  const postSystem = document.querySelector('.postSystem')
  const createPostArea = document.querySelector('.createPost')
  const cName = document.getElementById('cName');
  const cCity = document.getElementById('cCity');
  const cSkill = document.getElementById('cSkill');
  const cTech = document.getElementById('cTech');
  const cFee = document.getElementById('cFee');
  const cTotalDay = document.getElementById('cTotalDay');
  const cWeekHour = document.getElementById('cWeekHour');
  const cClassType = document.getElementById('cClassType');
  const cTeachWay = document.getElementById('cTeachWay');
  const cTeacherNum = document.getElementById('cTeacherNum');
  const cFoundYear = document.getElementById('cFoundYear');
  const cTopic = document.getElementById('cTopic');
  const cPreface = document.getElementById('cPreface');
  const cContent = document.getElementById('cContent');
  const cPhone = document.getElementById('cPhone');
  const cMail = document.getElementById('cMail');
  const cRecUrl = document.getElementById('cRecUrl');
  const cSqUrl = document.getElementById('cSqUrl');
  const saveBtn = document.querySelector('.saveBtn')
  const createDoneBtn = document.querySelector('.createDoneBtn')
  const returnBtn = document.querySelector('.returnBtn')


  const postBtnList = document.querySelector('.postBtnList')
  const createPostPage = document.getElementById('createPostPage')



  // 創造新文章按鈕　

  createBtn.addEventListener('click', ()=>{
    
    postSystem.style.display = 'none'
    createPostArea.style.display = 'flex'
    postBtnList.style.display = 'flex';
    createPostPage.style.display = 'flex'
    delBtn.style.display = 'none'
    saveBtn.style.display = 'none'
    createDoneBtn.style.display = 'flex'

    cName.value = ''
    cCity.value = ''
    cSkill.value = ''
    cTech.value = ''
    cFee.value = ''   
    cTotalDay.value = ''
    cWeekHour.value = ''
    cClassType.value = ''
    cTeachWay.value = ''
    cTeacherNum.value = ''
    cFoundYear.value = ''
    cTopic.value = ''
    cPreface.value = ''
    cContent.value = ''
    cPhone.value = ''
    cMail.value = ''
    imagePreviewRec.querySelector('img').src = "path/to/nonexistent/image.jpg";
    imagePreviewSq.querySelector('img').src = "path/to/nonexistent/image.jpg";
    
  });

      // 新增文章
  createDoneBtn.addEventListener('click', ()=>{
    saveBtn.style.display = 'none'
    firebase.database().ref('front-enter-json/article').once('value')
    .then(snapshot => {
    const articles = Object.values(snapshot.val());

    // 清除 postclicked (沒有更新到 firebase )
    articles.forEach((a)=>{
      a.postClicked = false
    })

    const articleCount = snapshot.numChildren();
    const newArticleName = articleCount.toString();
    const timestamp = Date.now();  
    console.log(articleCount, newArticleName)

    firebase.database().ref(`front-enter-json/article/${newArticleName}`).set({
      name: cName.value,
      city: cCity.value,
      skill: cSkill.value,
      technology: cTech.value,
      fee: cFee.value,   
      totalDay: cTotalDay.value,
      weekHour: cWeekHour.value,
      classType: cClassType.value,
      teachWay: cTeachWay.value,
      teacherNum: cTeacherNum.value,
      foundYear: cFoundYear.value,
      topic: cTopic.value,
      preface: cPreface.value,
      content: cContent.value,
      phone: cPhone.value,
      mail: cMail.value,
      starClicked: false, 
      rectangleUrl: recLi.querySelector('img').src,
      squareUrl: sqLi.querySelector('img').src,
      creatTime: timestamp
    });
    }).then(()=>{
      remindPostContent = '新增文章成功'
      postRemind() 
      buttonOK.textContent = 'OK'
      buttonNo.style.display = 'none'
    }); 
      
  })



  // 返回上頁

function returnPage(articles){
  returnBtn.addEventListener('click', ()=>{
    // 清除所有 postClicked === true 
    articles.forEach((a, index) => {
      a.postClicked = false;
      firebase.database().ref('front-enter-json/article/' + index ).update(a);
    });

    profileHeader.style.backgroundColor = lightBlue
    postSystem.style.display = 'flex';
    postBtn.style.display = 'flex';
    postArea.style.display = 'flex';
    postBtnList.style.display = 'none';
    createPostPage.style.display = 'none';
    delBtn.style.display = 'flex'    
    imagePreviewRec.querySelector('img').src = "path/to/nonexistent/image.jpg";;
    imagePreviewSq.querySelector('img').src = "path/to/nonexistent/image.jpg";;
  })
}

  
  // postUl.addEventListener('click', function(e){
  //   // 將其他所有 article 的 postClicked 變成 false
  //   articles.forEach((a, j) => {
  //     if (j !== index) {
  //       a.postClicked = false;
  //       firebase.database().ref('front-enter-json/article/' + j ).update(a);
  //     }
  //   });
  //   // 被點擊的該篇 postClicked 為 true
  //   article.postClicked = true; 
  //   firebase.database().ref('front-enter-json/article/' + index).update(article);
  // })



  // 編輯文章按鈕 edit post 

  changeBtn.addEventListener('click', ()=>{
    postSystem.style.display = 'none'
    createPostArea.style.display = 'flex'
    postBtnList.style.display = 'flex';
    createPostPage.style.display = 'flex'
    delBtn.style.display = 'flex'
    saveBtn.style.display = 'flex'
    createDoneBtn.style.display = 'none'

    firebase.database().ref('front-enter-json/article/').on('value', (snapshot) => { 

      const articles = snapshot.val();

      articles.forEach((article)=>{        
        if (article.postClicked === true) {
          cName.value = article.name;
          cCity.value = article.city;
          cSkill.value = article.skill;
          cTech.value = article.technology;
          cFee.value = article.fee;
          cTotalDay.value = article.totalDay;
          cWeekHour.value = article.weekHour;
          cClassType.value = article.classType;
          cTeachWay.value = article.teachWay;
          cTeacherNum.value = article.teacherNum;
          cFoundYear.value = article.foundYear;
          cTopic.value = article.topic;
          cPreface.value = article.preface;
          cContent.value = article.content.replace(/<br>/g, '');
          cPhone.value = article.phone;
          cMail.value = article.mail;

          var imgRec = imagePreviewRec.querySelector('img');
          imgRec.src = article.rectangleUrl;
          imgRec.style.objectFit = 'cover';
          imgRec.style.height = '150px'
          imgRec.style.width = '300px'    

          var imgSq = imagePreviewSq.querySelector('img');
          imgSq.src = article.squareUrl;
          imgSq.style.objectFit = 'cover';
          imgSq.style.height = '150px'
          imgSq.style.width = '150px'    

          
          }}
        )


        })
      })
      


// edit and save post 

  firebase.database().ref('front-enter-json/article/').on('value', (snapshot) => { 
    const articles = snapshot.val();

    articles.forEach((article, index)=>{

      if (article.postClicked === true) {    
      
        console.log(article.name, index)

        const timestamp = Date.now();  
  
        returnPage(articles)
        // deletePost(index, article)

        saveBtn.addEventListener('click', function() {
          buttonNo.style.display = 'none'
          firebase.database().ref('front-enter-json/article/'+ index).set({
            name: cName.value,
            city: cCity.value,
            skill: cSkill.value,
            technology: cTech.value,
            fee: cFee.value,
            totalDay: cTotalDay.value,
            weekHour: cWeekHour.value,
            classType: cClassType.value,
            teachWay: cTeachWay.value,
            teacherNum: cTeacherNum.value,
            foundYear: cFoundYear.value,
            topic: cTopic.value,
            preface: cPreface.value,
            content: cContent.value,
            phone: cPhone.value,
            mail: cMail.value,
            postClicked: false,
            creatTime: timestamp, 
            rectangleUrl: recLi.querySelector('img').src,
            squareUrl: sqLi.querySelector('img').src
          })

          // 跳出儲存確認框
          remindPostContent = '儲存文章成功'
          postRemind() // 不能用 buttonOK 不然會跟下面衝突
          buttonOK.textContent = 'ok'
      })
    } 

    buttonOK.addEventListener('click', function(event){
      if (article.postClicked === true) { 
      event.preventDefault
      console.log(index, article.name)
      loginContainer.style.display = 'none'
      firebase.database().ref('front-enter-json/article/'+ index).remove();  
      
      alert('刪除成功')

      postSystem.style.display = 'flex';
      postBtn.style.display = 'flex';
      postArea.style.display = 'flex';
      postBtnList.style.display = 'none';
      createPostPage.style.display = 'none';
      delBtn.style.display = 'flex'
  
      setTimeout(() => {
        location.reload();
      }, 10);          


      }})
    

  }) 


})


// delete post 

  delBtn.addEventListener('click', () => {
    remindPostContent = '確定要刪除文章？'
    loginContainer.style.display = 'flex'
    loginBackground.style.display = 'none'
    buttonOK.textContent = '確認刪除'

    buttonNo.style.display = 'flex'

    buttonNo.addEventListener('click', function(event){
      event.preventDefault;
      if (event.target === buttonNo) {
        loginContainer.style.display = 'none';  
        buttonNo.style.display = 'none'        
      }
    })

    
    // 按下確認刪除
    // buttonOK.addEventListener('click', function(event){
    //   event.preventDefault
    //   articles.forEach((a, index) => {
    //     a.postClicked = false;
        // firebase.database().ref('front-enter-json/article/' + index ).update(a);
      // });
      // if (event.target === buttonOK) {
        // console.log(index, article.name) // error
        // loginContainer.style.display = 'none';      
        // firebase.database().ref('front-enter-json/article/'+ index).remove();  
        // setTimeout(() => {
        //   profileHeader.style.backgroundColor = lightBlue
        //   postSystem.style.display = 'flex';
        //   postBtn.style.display = 'flex';
        //   postArea.style.display = 'flex';
        //   postBtnList.style.display = 'none';
        //   createPostPage.style.display = 'none';
        //   delBtn.style.display = 'flex'
        // }, 10);
  //       }
  //   //   })

  })

// 儲存個人資料

firebase.auth().onAuthStateChanged(function(user) {
  const userId = user.uid; 
    if (user) {
    // 使用者已登入
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
    const userData = snapshot.val(); 
    profileEmail.value = user.email;
    profileName.value = userData.name;
    profilePhone.value = userData.phone;
    // 顯示照片
    if(user.photoURL){
    inputPhoto.style.background = `url(${user.photoURL}) center/cover no-repeat`;
    }else{
      inputPhoto.style.background = `url(https://frankyeah.github.io/Front-Enter/images/profile-user-img.svg) center/cover no-repeat`;  
    }
      profileInputList.forEach((btn) => {btn.readOnly = true})
  })
    } else {
      // 使用者未登入
      console.log("使用者未登入");
      profileInputList.forEach((btn)=>{btn.value = ''})
      window.location.href = 'index.html';
    }
  })


// edit profile

  profileName.addEventListener("focus", function() {
    this.style.outline = "none";
  });
  profilePhone.addEventListener("focus", function() {
    this.style.outline = "none";
  });

modifyData.addEventListener('click', function(){
    this.style.display = 'none';
    modified.style.display = 'flex'
    cancel.style.display = 'flex'
    profileName.readOnly = false;
    profilePhone.readOnly = false;
    profileName.style.border = "1px solid rgba(230, 230, 230, 0.7)"
    profilePhone.style.border = "1px solid rgba(230, 230, 230, 0.7)"
    profileName.addEventListener("focus", function() {
      this.style.outline = "";
    });
    profilePhone.addEventListener("focus", function() {
      this.style.outline = "";
    });
}) 

modified.addEventListener('click', function(){
    loginContainer.style.display = 'flex';
    loginBackground.style.display = 'none';
    remindBackground.style.display = 'flex';
    // 將資料存入 firebase
    const userId = firebase.auth().currentUser.uid; 
        firebase.database().ref('users/' + userId).update({
        name: profileName.value, 
        phone: profilePhone.value
  })
    remindBackground.style.display = 'flex';
    remindBoxContent.innerText = '資料修改成功';
    windowCloseOnly();
    this.style.display = 'none';
    modifyData.style.display = 'flex'
    cancel.style.display = 'none'
    profileInputList.forEach((btn) => {btn.readOnly = true});
    profileName.style.border = "none"
    profilePhone.style.border = "none"
    profileName.addEventListener("focus", function() {
      this.style.outline = "none";
    });
    profilePhone.addEventListener("focus", function() {
      this.style.outline = "none";
    });
})

cancel.addEventListener('click', function(){
    this.style.display = 'none';
    modified.style.display = 'none'
    modifyData.style.display = 'flex'
    profileInputList.forEach((btn) => {btn.readOnly = true});
    profileName.style.border = "none"
    profilePhone.style.border = "none"
    profileName.addEventListener("focus", function() {
      this.style.outline = "none";
    });
    profilePhone.addEventListener("focus", function() {
      this.style.outline = "none";
    });
})


// log out 

logoutBtn.addEventListener('click', function(){
  buttonNo.style.display = 'none'
  firebase.auth().signOut().then(() => {
      
      loginContainer.style.display = 'flex';
      loginBackground.style.display = 'none';
      remindBackground.style.display = 'flex';
      remindBoxContent.innerText = '登出成功';
      windowClose();
      console.log('使用者已登出');
      window.location.href = 'index.html';
  }).catch((error) => {
      // 登出失敗
      console.error('登出失敗:', error);
  });
});


// 顯示收藏文章

firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    const userId = user.uid;

    firebase.database().ref('users/' + userId + '/user-article/').on('value', (snapshot) => { 
      const displayCollect = snapshot.val(); 
      dataCollection.innerHTML = '';  // 先清除

      // 顯示文章
      for (let i = 0; i < displayCollect.length; i++) {
        const object = displayCollect[i];
        const displayBlock = collectTemplate.content.cloneNode(true).children[0];

        displayBlock.style.display = object.starClicked ? 'flex' : 'none';
        const collectionImg = displayBlock.querySelector('.collectionImg');
        const collectionName = displayBlock.querySelector('.collectionName');
        collectionImg.style.background = `url(${object.squareUrl}) 0% 0% / cover`;
        collectionName.textContent = object.name;
        dataCollection.append(displayBlock);
        // link
        collectLink(displayCollect)
        // 移除蒐藏
        const removeBtn = displayBlock.querySelector('.removeBtn');

        removeBtn.addEventListener('click', (e) => {
          e.target.parentNode.remove();
          object.starClicked = !object.starClicked;

          console.log(object.starClicked);

          firebase.database().ref('users/' + userId + '/user-article/' + i + '/starClicked/' ).set(object.starClicked);
          
        });
      }
    });
  }
});



// take id parameter on the URL and link to content.html

function collectLink(displayCollect){
  const collectionImg = document.querySelectorAll('.collectionImg ');
  collectionImg.forEach(Img => {
    Img.addEventListener( 'click', () => {
      const linkIndex = Array.from(collectionImg).indexOf(Img);
      const linkId = displayCollect[linkIndex].creatTime;
      console.log(linkId);
      const url = `content.html?id=${linkId}`;
      console.log(url);
      window.location.href = url;
    }
    )
  }
  )
}

  


blackBox.onclick = () => {
  searchBox.style.display = 'none';
  blackBox.style.display = 'none';
};
      
