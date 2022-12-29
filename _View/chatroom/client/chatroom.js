var userID = "";
var firsttimeOpenChatroom = 0;

// 初始化及載入 socket.io
var socket_server = "http://localhost:3000";
var socket = io(socket_server);

// 紀錄已經載入的訊息
var messageRecord = [];
var messageRecordAmount = 10;
var messageRecordOffset = 0;

/* IIFE (Immediately Invoked Function Expression) function 自我調用function */
/* 會自己執行 這邊用來產生聊天室的顯示介面 並先藏起來 等按下按鈕才會跳出 */
var chatroom_div = function test() {
  /* 動態產生聊天室按鈕並置於畫面右下角，方便import */
  var btn_chatroom = $("<button class='btn_chatroom' onclick='openChatroom()'> </button>");
  $("body").append(btn_chatroom);
  var chatroom = $("<span class='chatroom' id='chatroom'> </span>");

  // 最上層的title bar
  var title_bar = $(`
    <div id='chatroom_title_bar'>
      <img id='client_service_avatar' />
      <p id='chatroom_title'> 客服系統 </p>
    </div>
  `);

  // 中間用以顯示訊息的div
  var message_div = $(`
    <div class='message_div' id='message_div'>

    </div>
  `);

  // 最底下輸入訊息的div
  var type_div = $(`  
    <div id='type_div' class='type_div'>
      <textarea id='type_area' placeholder='輸入訊息...' class='type_area'></textarea>
      <span>
        <label id='lbl_upload' for='btn_upload'>
          <img id='imgbtn_upload' src='./src/upload-file.svg'/>
        </lable>
        <input type='file' id='btn_upload' />
      </span>
    </div>`
  );

  // 將動態建立的元件各自塞到他們該去ㄉ地方
  $(chatroom).append(title_bar);
  $(chatroom).append(message_div);
  $(chatroom).append(type_div);
  $("body").append(chatroom);
  $("#type_area").emoji(({ fontSize: '1.5rem', emoji_size: '2rem', emoji_margin_left: '1rem', emoji_icon_path: './src/grinning-face_black.svg', emoji_icon_hover_path: './src/grinning-face_black.svg' }));

  // 設定textarea按下enter時，不換行而是發送訊息
  $("#type_area").keypress((e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // 根據cookie抓取目前登入的使用者
  // 用正規表示式撈出userID
  userID = Cookies.get("userID").match(/^s:(.*)\..*$/)[1];

  /* message_div 向上捲動至頂時動態載入更早前的聊天紀錄 */
  $(message_div).scroll(() => {
    var mScrollHeight = document.getElementById('message_div').scrollHeight
    if ($(message_div).scrollTop() < mScrollHeight / 2) {
      // 載入更早前的聊天紀錄
      var option = [messageRecordAmount, messageRecordOffset];  // amount offset;
      messageRecordOffset += messageRecordAmount;  // 更新offset
      socket.emit('get_chat_record', userID, option);
    }
  })


  socket.emit("user_login", userID);
  socket.on('get_chat_record', (chatRecord) => {
    if (chatRecord.length > 0) {
      messageRecord.push(chatRecord);
      updateMessageToChatroom(messageRecord);
    }
    // 更新紀錄時(例如使用者傳送新訊息後)，跳轉到訊息底部
    if (firsttimeOpenChatroom < 2) $('#message_div').animate({ scrollTop: $('#message_div').prop("scrollHeight") }, 500);
    firsttimeOpenChatroom = 2;
  })

  socket.on('new_message_from_client', (result) => {
    if (result.length > 0) {
      messageRecord.unshift(result);
      updateMessageToChatroom(messageRecord);
      $('#message_div').animate({ scrollTop: $('#message_div').prop("scrollHeight") }, 500);
    }
  })
}();

function sendMessage() {
  var msg = $("#type_area").val();
  socket.emit('new_message_from_client', userID, msg);
  console.log("send msg: ", msg);
  $("#type_area").val("");
}

function openChatroom() {
  toggleChatroom();
  /* 第一次打開聊天室時先撈 messageRecordAmount 筆資料 */
  if ($("#chatroom").hasClass("open") && firsttimeOpenChatroom < 1) {
    var option = [messageRecordAmount, 0];  // amount offset;
    messageRecordOffset += messageRecordAmount;  // 更新offset
    console.log("option", option);
    firsttimeOpenChatroom = 1;
    socket.emit('get_chat_record', userID, option);
  }
}

function toggleChatroom() {
  if ($("#chatroom").hasClass("open")) {
    $("#chatroom").removeClass("open");
    $("#chatroom").addClass("close");
  } else {
    $("#chatroom").removeClass("close");
    $("#chatroom").addClass("open");
  }
}

function updateMessageToChatroom(messagesRecord) {
  console.log(messageRecord);
  $("#message_div").html("");
  for (var i = messagesRecord.length - 1; i >= 0; i--) {
    if (messagesRecord[i].length == 0) continue;
    for (var j = messagesRecord[i].length - 1; j >= 0; j--) {
      var sender = messagesRecord[i][j]['sender'];
      var message = messagesRecord[i][j]['message'];
      var msgDate = formatDate(new Date(Date.parse(messagesRecord[i][j]['messageDate'])));
      // 根據傳送者決定外觀，System是1
      var chatBubbleClass = sender > 1 ? 'message_bubble_A' : 'message_bubble_B';
      var chatBubble = $(`
      <div class='${chatBubbleClass}'>
      <span> ${message} </span>
      <text> ${msgDate} </text>
      </div> 
      `);
      $(".message_div").append(chatBubble);
    }
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}