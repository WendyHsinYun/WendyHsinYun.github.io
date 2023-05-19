function initMap() {
    var mapElement = document.getElementById('googleMap');
    var options = {
      // 在這裡設定地圖的初始中心位置和縮放級別
      center: { lat: 25.011781804818412, lng: 121.51977795480491 },
      zoom: 16
    };
    var map = new google.maps.Map(mapElement, options);
  }


  document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单提交的默认行为

    // 获取表单中的值
    var form = document.getElementById('contactForm');
    var form = document.getElementById('contactForm');
    var name = form.querySelector('input[name="name"]').value;
    var email = form.querySelector('input[name="email"]').value;
    var topic = form.querySelector('input[name="topic"]').value;
    var message = form.querySelector('textarea[name="message"]').value;

    // 设置emailJS的发送参数
    var params = {
      from_name: name,
      from_email: email,
      to_name: '收件人姓名', 
      subject: topic,
      message: message
    };

    // 发送邮件
    emailjs.send('service_f17lxl7', 'template_f6rnjjg', params) // 将YOUR_SERVICE_ID和YOUR_TEMPLATE_ID替换为您自己的Service ID和Template ID
      .then(function () {
        alert('郵件已成功發送！請至信箱檢查您寄出的信件內容');
        form.reset(); // 重置表单
      }, function (error) {
        console.error('郵件發送失敗：', error);
        alert('郵件發送失敗！請稍後再試。');
      });

    // upload message on firebase
    var createTimeToString = new Date().toString();
    var createTime = new Date();
    
    firebase.database().ref('front-enter-json/message/'+ topic).set({
        from_name: name,
        from_email: email,
        subject: topic,
        message: message,
        createTime: createTimeToString
        
    })
    
  });

