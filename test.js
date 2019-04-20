/**
 * Chat | application tests
 */

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("expect.js");
const io = require("socket.io-client");

const app = require("./app");

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

describe("use socket", function() {
    let socketFirst;
    let socketSecond;

    before(function(done) {
        const port = (process.env.npm_package_config_port !== undefined) ? process.env.npm_package_config_port : 3000;

        socketFirst = io.connect("http://127.0.0.1:" + port);
        socketSecond = io.connect("http://127.0.0.1:" + port);

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

    after(function(done) {
        if(socketFirst.connected) {
            socketFirst.disconnect();
        }

        if(socketSecond.connected) {
            socketSecond.disconnect();
        }

        done();
    });
});
