/**
 * Created by jarne on 30.05.17.
 */

var gulp = require("gulp");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");

gulp.task("jquery", function() {
    return gulp.src("bower_components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("public/js"));
});

gulp.task("bootstrap-css", function() {
    return gulp.src("bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("public/css"));
});

gulp.task("bootstrap-js", function() {
    return gulp.src("bower_components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest("public/js"));
});

gulp.task("socket.io-js", function() {
    return gulp.src("bower_components/socket.io-client/dist/socket.io.js")
        .pipe(concat("socket.io.min.js"))
        .pipe(gulp.dest("public/js"));
});

gulp.task("index-css", function() {
    return gulp.src("assets/css/index.css")
        .pipe(concat("index.min.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest("public/css"));
});

gulp.task("index-js", function() {
    return gulp.src("assets/js/index.js")
        .pipe(concat("index.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public/js"));
});

gulp.task("watch", function() {
    gulp.watch("bower_components/jquery/jquery.min.js", ["jquery"]);

    gulp.watch("bower_components/bootstrap/dist/css/bootstrap.min.css", ["bootstrap-css"]);
    gulp.watch("bower_components/bootstrap/dist/js/bootstrap.min.js", ["bootstrap-js"]);

    gulp.watch("bower_components/socket.io-client/dist/socket.io.js", ["socket.io-js"]);

    gulp.watch("assets/css/index.css", ["index-css"]);
    gulp.watch("assets/js/index.js", ["index-js"]);
});

gulp.task("default", ["jquery", "bootstrap-css", "bootstrap-js", "socket.io-js", "index-css", "index-js"]);
