/**
 * Created by jarne on 30.05.17.
 */

$(document).ready(function() {
    var socket = new io();

    $("#sendMessageForm").submit(function(e) {
        var messageContentField = $("#messageContentField");

        if(messageContentField.val() !== "") {
            socket.emit("send message", messageContentField.val());
            messageContentField.val("");
        }

        e.preventDefault();
    });

    socket.on("new message", function(content) {
        $("#chatMessagesList").append("<li class=\"list-group-item\">" + content + "</li>");
    });
});