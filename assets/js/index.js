/**
 * Chat | client script
 */

const chatMessages = document.getElementById("chatMessagesList");
const sendForm = document.getElementById("sendMessageForm");
const messageField = document.getElementById("messageContentField");

const socket = new io();

socket.on("new message", (content) => {
    chatMessages.innerHTML += "<li class=\"list-group-item\">" + content + "</li>";
});

sendForm.onsubmit = (e) => {
    e.preventDefault();

    const msgVal = messageField.value;

    if(msgVal === "") {
        return;
    }

    socket.emit("send message", msgVal);

    messageField.value = "";
};
