import { astronautImage } from "./images.js";
var myImage = new Image();
myImage.src = astronautImage.base64;
myImage.addEventListener('load', function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    var particlesArray = [];
    var numberOfParticles = 5000;
    var Particle = /** @class */ (function () {
        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 3.5;
            this.size = Math.random() * 1.5 + 1;
        }
        Particle.prototype.update = function () {
            this.y += this.velocity;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        };
        Particle.prototype.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };
        return Particle;
    }());
    function init() {
        for (var i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle);
        }
    }
    init();
    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
});
//# sourceMappingURL=particleRain.js.map