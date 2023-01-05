var selectedUser = -1;  // 目前選擇的user
var firsttimeOpenChatroom = 0;

// 初始化及載入 socket.io
var socket_server = "http://localhost:3000";
var socket = io(socket_server);

// 紀錄已經載入的訊息
var messageRecord = [];
var messageRecordAmount = 10;
var messageRecordOffset = 0;

// 紀錄目前對話中的user
var userList = new Map();

$(document).ready(() => {

    // 關閉(移除)使用者聊天室
    $(document).on('click', '.btn_removeChatroom', (e) => {
        // 如果目前選擇的被移除，則把目前選擇的user設為-1
        if (e.target.parentElement.id == selectedUser) {
            selectedUser = -1;
            clearChatroom();
        }

        $(`#${e.target.parentElement.id}`).remove();
        userList.delete(e.target.parentElement.id);
        clearMessageRecord();
        console.log("sel: ", selectedUser);
        if (userList.size <= 0) {
            clearUserList();
            clearChatroom();
        }
        e.stopPropagation();  // 阻止event bubbling，才不會觸發到上層的div(userChatroom)的click事件
    });

    if (userList.size <= 0) {
        clearUserList();
    }

    clearChatroom();

    // 選擇使用者聊天室
    $(document).on('click', '.userChatroom', (e) => {
        $(".userChatroom").removeClass("selected");
        if (selectedUser != e.target.id) {
            selectedUser = e.target.id;
            $(`#${selectedUser}`).toggleClass("selected");
        } else {
            selectedUser = -1;
            clearChatroom();
        }
        console.log("sel: ", selectedUser);
        clearMessageRecord();
        if (selectedUser != -1) openUserChatroom(selectedUser);
    })

    // 加入表情符號按鈕
    $("#type_area").emoji(({ fontSize: '1rem', emoji_size: '2rem', emoji_margin_left: '0.5rem', emoji_icon_path: './src/grinning-face_black.svg', emoji_icon_hover_path: './src/grinning-face_black.svg' }));

    // 設定textarea按下enter時，不換行而是發送訊息
    $("#type_area").keypress((e) => {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    /* message_div 向上捲動至頂時動態載入更早前的聊天紀錄 */
    $(message_div).scroll(() => {
        var mScrollHeight = document.getElementById('message_div').scrollHeight
        if ($(message_div).scrollTop() < mScrollHeight / 2) {
            // 載入更早前的聊天紀錄
            var option = [messageRecordAmount, messageRecordOffset];  // amount offset;
            messageRecordOffset += messageRecordAmount;  // 更新offset
            socket.emit('get_chat_record_from_system', selectedUser, option);
        }
    })

    // 獲取聊天紀錄
    socket.on('get_chat_record_from_system', (chatRecord) => {
        if (chatRecord.length > 0) {
            messageRecord.push(chatRecord);
            updateMessageToChatroom(messageRecord); // 將聊天紀錄塞進右側聊天室視窗內
        }

        // 更新紀錄時(例如使用者傳送新訊息後)，跳轉到訊息底部
        if (firsttimeOpenChatroom < 1) chatroomScrollDown(20);
        firsttimeOpenChatroom = 1;
    })

    // 當有使用者傳訊息過來時
    socket.on('new_message_from_client', (result, userID, userName) => {
        console.log(`chat req from ${userID}: ${userName}`);
        // 如果傳送訊息過來的使用者還沒被記錄過，則把它新增進紀錄後放到左側panel
        if (!userList.has(userID)) {
            userList.set(userID, userName);
            $("#tmp_userlist_div").remove();
            var userChatroom_html = `
            <div class="userChatroom" id=${userID}>
                ${userName}
                <i class="btn_removeChatroom fa-solid fa-xmark"> </i>
            </div>`;
            $(".div_userlist").append(userChatroom_html);
        }
        if (result.length > 0 && userID == selectedUser) {
            messageRecord.unshift(result);
            updateMessageToChatroom(messageRecord);
            chatroomScrollDown(20);
        }
    })

    // 當傳送訊息時，把聊天紀錄拉到最底下
    socket.on('new_message_from_system', (result) => {
        if (result.length > 0) {
            messageRecord.unshift(result);
            updateMessageToChatroom(messageRecord);
            chatroomScrollDown(20);
        }
    })
})

// 若沒有使用者船訊息過來，則清空左側使用者清單
function clearUserList() {
    $(".div_userlist").html(`
        <div id='tmp_userlist_div' style='display: flex; justify-content: center; align-items: center; height: 100vh;'>
            <text style='color: gray; font-size: 1rem'> 目前沒有使用者傳訊息過來 </text>
        </div>
    `);
}

// 若沒有進行中的聊天，則清空右側聊天室視窗 
function clearChatroom() {
    $(".message_div").html(`
        <div id='tmp_message_div' style='display: flex; justify-content: center; align-items: center; height: 100%;'>
            <text style='color: gray; font-size: 1rem'> 沒有進行中的聊天 </text>
        </div>
    `);

    $(".type_div").hide();
}

// 清除所有訊息紀錄、offset歸零
function clearMessageRecord() {
    messageRecord = [];
    messageRecordOffset = 0;

}

// 將聊天紀錄拉到最底下
function chatroomScrollDown(delay) {
    setTimeout(() => {
        $('#message_div').animate({ scrollTop: $('#message_div').prop("scrollHeight") }, 500);
    }, delay);
}

// 發送訊息給對話中的使用者
function sendMessage() {
    var msg = $("#type_area").val();
    socket.emit('new_message_from_system', selectedUser, msg);
    console.log("send msg from sys: ", msg);
    $("#type_area").val("");
}



// 選擇左側的user後，開啟與他的聊天室
function openUserChatroom(userID) {
    console.log('open chat');
    var option = [messageRecordAmount, 0];  // amount offset;
    messageRecordOffset += messageRecordAmount;  // 更新offset
    socket.emit('get_chat_record_from_system', userID, option);
    $(".type_div").show();    
    //$("#tmp_message_div").remove();
    chatroomScrollDown(300);
}

// 將聊天紀錄放進右側聊天室視窗
function updateMessageToChatroom(messagesRecord) {
    $("#message_div").html("");
    for (var i = messagesRecord.length - 1; i >= 0; i--) {
        if (messagesRecord[i].length == 0) continue;
        for (var j = messagesRecord[i].length - 1; j >= 0; j--) {
            var sender = messagesRecord[i][j]['sender'];
            var message = messagesRecord[i][j]['message'];
            var msgDate = formatDate(new Date(Date.parse(messagesRecord[i][j]['messageDate'])));
            // 根據傳送者決定外觀，System是1
            var chatBubbleClass = sender > 1 ? 'message_bubble_B' : 'message_bubble_A';
            var chatBubble = $(`
            <div class='${chatBubbleClass}'>
            <span> ${message} </span>
            <text class="lbl_date"> ${msgDate} </text>
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