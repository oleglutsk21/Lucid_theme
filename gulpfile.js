let project_folder = require("path").basename(__dirname);
let source_folder = "app";

let path = {
    build: {
        html: project_folder +"/",
        css: project_folder +"/css/",
        js: project_folder +"/js/",
        image: project_folder +"/images/",
        fonts: project_folder +"/fonts/",
    },
    src: {
        html: [source_folder +"/*.html", "!"+source_folder +"/_*.html"],
        css: source_folder +"/scss/style.scss",
        js: source_folder +"/js/script.js",
        image: source_folder +"/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder +"/fonts/*.ttf",
    },
    watch: {
        html: source_folder +"/**/*.html",
        css: source_folder +"/scss/**/*.scss",
        js: source_folder +"/js/**/*.js",
        image: source_folder +"/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "*"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require('gulp-sass')(require('node-sass')),
    autoprefixer = require("gulp-autoprefixer"),
    group_media  = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter');
    
function browserSync(param) {
    browsersync.init({
        server: {
            baseDir: project_folder
        },
        port: 3000,
        notify:false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());    
}

function css(params) {
    return src(path.src.css)
        .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())  
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());    
}

function images() {
    return src(path.src.image)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 //0 to 7
            })
        )
        .pipe(dest(path.build.image))
        .pipe(browsersync.stream());    
}

function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function() {
    return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'));
})

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.image], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, ));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;