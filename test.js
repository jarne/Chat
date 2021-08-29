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

describe("load page", () => {
    it("it should load the content of the page", done => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.contain("<h1>Chat</h1>");

                done();
            });
    });
});

describe("use socket", () => {
    let socketFirst;
    let socketSecond;

    before(done => {
        const port = (process.env.npm_package_config_port !== undefined) ? process.env.npm_package_config_port : 3000;

        socketFirst = io.connect("http://127.0.0.1:" + port);
        socketSecond = io.connect("http://127.0.0.1:" + port);

        socketSecond.on("connect", () => {
            done();
        });
    });

    it("it should establish a connection with the socket server", done => {
        expect(socketFirst.connected).to.equal(true);
        expect(socketSecond.connected).to.equal(true);

        done();
    });

    it("it should send a message and receive it", done => {
        socketFirst.emit("send message", "Hello, that's a test!");

        socketSecond.on("new message", content => {
            expect(content).to.equal("Hello, that&#39;s a test!");

            done();
        });
    });

    after(done => {
        if(socketFirst.connected) {
            socketFirst.disconnect();
        }

        if(socketSecond.connected) {
            socketSecond.disconnect();
        }

        done();
    });
});
