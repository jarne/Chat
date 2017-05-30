/**
 * Created by jarne on 30.05.17.
 */

var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = require("expect.js");
var io = require("socket.io-client");

var app = require("./app");

/* Initialization */

chai.use(chaiHttp);

/* Tests */

describe("load page", function() {
    it("it should load the content of the page", function(done) {
        chai.request(app)
            .get("/")
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.contain("<h1>Chat</h1>");

                done();
            });
    });
});

describe("use socket", function(done) {
    var socketFirst;
    var socketSecond;

    beforeEach(function(done) {
        socketFirst = io.connect("http://127.0.0.1:3000");
        socketSecond = io.connect("http://127.0.0.1:3000");
        
        socketSecond.on("connect", function() {
            done();
        });
    });
    
    it("it should establish a connection with the socket server", function(done) {
        expect(socketFirst.connected).to.equal(true);
        expect(socketSecond.connected).to.equal(true);

        done();
    });

    it("it should send a message and receive it", function(done) {
        socketFirst.emit("send message", "Hello, that's a test!");

        socketSecond.on("new message", function(content) {
            expect(content).to.equal("Hello, that's a test!");

            done();
        });
    });

    afterEach(function(done) {
        if(socketFirst.connected) {
            socketFirst.disconnect();
        }

        if(socketSecond.connected) {
            socketSecond.disconnect();
        }

        done();
    });
});