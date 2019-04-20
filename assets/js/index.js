/**
 * Chat | client script
 */

$(document).ready(() => {
    const socket = new io();

    $("#sendMessageForm").submit((e) => {
        const messageContentField = $("#messageContentField");

        if(messageContentField.val() !== "") {
            socket.emit("send message", messageContentField.val());
            messageContentField.val("");
        }

        e.preventDefault();
    });

    socket.on("new message", (content) => {
        $("#chatMessagesList").append("<li class=\"list-group-item\">" + content + "</li>");
    });
});
