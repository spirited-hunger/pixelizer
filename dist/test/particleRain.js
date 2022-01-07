import { astronautImage } from "./images.js";
var myImage = new Image();
myImage.src = astronautImage.base64;
myImage.addEventListener('load', function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
});
//# sourceMappingURL=particleRain.js.map