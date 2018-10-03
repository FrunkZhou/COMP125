var imageList = [];
var folder1Ext = "images1/";
var folder2Ext = "images2/";
var isImage1 = true;
var timer;

function loadImages(extension) {
    for (var i = 1; i <= 5; ++i) {
        imageList[i-1] = extension + "IMG_0" + i + ".jpg";
    }
    clearInterval(timer);
    timer = setInterval(shiftRight, 5000);
}

function refreshThumbnails() {
    if (isImage1) {
        $(".tb2").each(function (index) {
            $(".tb2:eq(" + index + ")").attr("src", imageList[index])
                .css("height", $(".thumbnail").height() + "px")
                .css("width", $(".thumbnail").width() + "px");
        });
    }
    else {
        $(".tb1").each(function (index) {
            $(".tb1:eq(" + index + ")").attr("src", imageList[index])
                .css("height", $(".thumbnail").height() + "px")
                .css("width", $(".thumbnail").width() + "px");
        });
    }
}

function clearImages() {
    $(".tb1").attr("src", " ");
    $(".tb2").attr("src", " ");
    $("#mainImage1").attr("src", " ");
    $("#mainImage2").attr("src", " ");
    imageList = [];
}

function refreshMainGallery(image) {
    if (isImage1) {
        $("#mainImage2").attr("src", image)
            .css("height", $("#mainGallery").height() + "px")
            .css("width", $("#mainGallery").width() + "px");
    }
    else {
        $("#mainImage1").attr("src", image)
            .css("height", $("#mainGallery").height() + "px")
            .css("width", $("#mainGallery").width() + "px");
    }    
}
function shiftRight() {
    if (isImage1) {
        var firstItem = imageList.shift();
        imageList.push(firstItem);
        $(".tb1").stop().fadeOut(1500);
        refreshThumbnails();
        $(".tb2").stop().fadeIn(1500);
        refreshMainGallery(imageList[2]);
        $("#mainImage1").stop().fadeOut(1500);
        $("#mainImage2").stop().fadeIn(1500);
        isImage1 = false;
    }
    else {
        var firstItem = imageList.shift();
        imageList.push(firstItem);
        $(".tb2").stop().fadeOut(1500);
        refreshThumbnails();
        $(".tb1").stop().fadeIn(1500);
        refreshMainGallery(imageList[2]);
        $("#mainImage2").stop().fadeOut(1500);
        $("#mainImage1").stop().fadeIn(1500);
        isImage1 = true;
    } 
}

function shiftLeft() {
    if (isImage1) {
        var lastItem = imageList.pop();
        imageList.unshift(lastItem);
        $(".tb1").stop().fadeOut(1500);
        refreshThumbnails();
        $(".tb2").stop().fadeIn(1500);
        refreshMainGallery(imageList[2]);
        $("#mainImage1").stop().fadeOut(1500);
        $("#mainImage2").stop().fadeIn(1500);
        isImage1 = false;
    }
    else {
        var lastItem = imageList.pop();
        imageList.unshift(lastItem);
        $(".tb2").stop().fadeOut(1500);
        refreshThumbnails();
        $(".tb1").stop().fadeIn(1500);
        refreshMainGallery(imageList[2]);
        $("#mainImage2").stop().fadeOut(1500);
        $("#mainImage1").stop().fadeIn(1500);
        isImage1 = true;
    } 
}

$(document).ready(function () {
    $("#mainImage2").fadeOut();
    $(".tb2").fadeOut();
    $("#folder1").click(function () {
        loadImages(folder1Ext);
        shiftRight();
    });
    $("#folder2").click(function () {
        loadImages(folder2Ext);
        shiftRight();
    });
    $("#empty").click(function () {
        clearImages();
    });
    $("#moveRightIcon").click(function () {
        clearInterval(timer);
        timer = setInterval(shiftRight, 5000);
        shiftRight();
    });
    $("#moveLeftIcon").click(function () {
        clearInterval(timer);
        timer = setInterval(shiftRight, 5000);
        shiftLeft();
    });
});
