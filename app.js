/**
 * Created by jarne on 30.05.17.
 */

var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

/* Initialization */

app.use(express.static("public"));

/* Routes */

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/templates/index.html");
});

/* Sockets */

io.on("connection", function(socket) {
    socket.on("send message", function(content) {
        var escapedContent = content
            .replace("&", "&amp;")
            .replace("\"", "&quot;")
            .replace("<", "&lt;")
            .replace(">", "&gt;");

        io.emit("new message", escapedContent);
    });
});

/* Listen */

http.listen((process.env.npm_package_config_port !== undefined) ? process.env.npm_package_config_port : 3000);

/* Tests */

module.exports = app;
