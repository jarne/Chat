/**
 * Chat | gulp file
 */

const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const minify = require("gulp-minify");

gulp.task("bootstrap-css", () => {
    return gulp
        .src("node_modules/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("public/css"));
});

gulp.task("socket.io-js", () => {
    return gulp
        .src("node_modules/socket.io-client/dist/socket.io.js")
        .pipe(concat("socket.io.min.js"))
        .pipe(gulp.dest("public/js"));
});

gulp.task("index-css", () => {
    return gulp
        .src("assets/css/index.css")
        .pipe(concat("index.min.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest("public/css"));
});

gulp.task("index-js", () => {
    return gulp
        .src("assets/js/index.js")
        .pipe(
            minify({
                noSource: true
            })
        )
        .pipe(concat("index.min.js"))
        .pipe(gulp.dest("public/js"));
});

gulp.task("watch", () => {
    gulp.watch(
        "bower_components/bootstrap/dist/css/bootstrap.min.css",
        gulp.parallel("bootstrap-css")
    );

    gulp.watch(
        "bower_components/socket.io-client/dist/socket.io.js",
        gulp.parallel("socket.io-js")
    );

    gulp.watch("assets/css/index.css", gulp.parallel("index-css"));
    gulp.watch("assets/js/index.js", gulp.parallel("index-js"));
});

gulp.task(
    "default",
    gulp.parallel("bootstrap-css", "socket.io-js", "index-css", "index-js")
);
