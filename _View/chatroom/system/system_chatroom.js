var selectedUser = -1;  // 目前選擇的user

// 初始化及載入 socket.io
var socket_server = "http://localhost:3000";
var socket = io(socket_server);

// 紀錄已經載入的訊息
var messageRecord = [];
var messageRecordAmount = 10;
var messageRecordOffset = 0;

$(document).ready(() => {

    // 關閉(移除)使用者聊天室
    $(".btn_removeChatroom").on('click', (e) => {
        // 如果目前選擇的被移除，則把目前選擇的user設為-1
        if (e.target.parentElement.id == selectedUser) selectedUser = -1;
        $(`#${e.target.parentElement.id}`).remove();
        console.log("sel: ", selectedUser);
        e.stopPropagation();  // 阻止event bubbling，才不會觸發到上層的div(userChatroom)的click事件
    });

    // 選擇使用者聊天室
    $(".userChatroom").on('click', (e) => {
        $(".userChatroom").removeClass("selected");
        if (selectedUser != e.target.id) {
            selectedUser = e.target.id;
            $(`#${selectedUser}`).toggleClass("selected");
        } else {
            selectedUser = -1;
        }
        console.log("sel: ", selectedUser);

        if (selectedUser != -1) openChatroom(selectedUser);
    })

    // 加入表情符號按鈕
    $("#type_area").emoji(({ fontSize: '1rem', emoji_size: '2rem', emoji_margin_left: '0rem', emoji_icon_path: './src/grinning-face_black.svg', emoji_icon_hover_path: './src/grinning-face_black.svg' }));

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
            socket.emit('get_chat_record', option);
        }
    })

    // 獲取聊天紀錄
    socket.on('get_chat_record', (chatRecord) => {
        if (chatRecord.length > 0) {
            messageRecord.push(chatRecord);
            updateMessageToChatroom(messageRecord);
        }
        // 更新紀錄時(例如使用者傳送新訊息後)，跳轉到訊息底部
        if (firsttimeOpenChatroom < 2) $('#message_div').animate({ scrollTop: $('#message_div').prop("scrollHeight") }, 500);
        firsttimeOpenChatroom = 2;
    })

    // 當有使用者傳訊息過來時
    socket.on('new_message_from_client', (result) => {
        if (result.length > 0) {
            messageRecord.unshift(result);
            updateMessageToChatroom(messageRecord);
            $('#message_div').animate({ scrollTop: $('#message_div').prop("scrollHeight") }, 500);
        }
    })

})

function openChatroom(userID) {

}