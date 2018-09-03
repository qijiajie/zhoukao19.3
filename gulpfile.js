var gulp = require("gulp");
var server = require("gulp-webserver");
var sass = require("gulp-sass");
var url = require("url");
var path = require("path");
var fs = require("fs");
var minCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var data = require("./mock/list.json");
gulp.task("server",["sass"],function(){
    gulp.src("src")
    .pipe(server({
        port:9090,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url,true).pathname;
            if(pathname === "/favicon.ico"){
                return false;
            }
            if(pathname === "/api/list"){
                res.end(JSON.stringify({code:1,msg:"成功",data:data}))
            }else{
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname,"src",pathname)));
            }
        }
    }))
})
gulp.task("sass",function(){
    gulp.src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest("./src/css"))
    .pipe(gulp.dest("./build/css"))
})
gulp.task("uglify",function(){
    gulp.src("./src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
})
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",["sass"])
})
gulp.task("dev",["server","uglify","watch"])

