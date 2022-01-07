"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var images_js_1 = require("./images.js");
var myImage = new Image();
myImage.src = images_js_1.images.astronaut;
myImage.addEventListener('load', function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 700;
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
});
//# sourceMappingURL=particleRain.js.map