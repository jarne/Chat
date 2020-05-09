/**
 * Chat | main app file
 */

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

/* Initialization */

app.use(express.static("public"));

/* Routes */

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/templates/index.html");
});

/* Sockets */

io.on("connection", socket => {
    socket.on("send message", content => {
        const escapedContent = content
            .replace("&", "&amp;")
            .replace("\"", "&quot;")
            .replace("<", "&lt;")
            .replace(">", "&gt;");

        io.emit("new message", escapedContent);
    });
});

/* Listen */

http.listen(process.env.npm_package_config_port || 3000);

/* Tests */

module.exports = app;
