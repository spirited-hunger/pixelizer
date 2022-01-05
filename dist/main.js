var App = /** @class */ (function () {
    function App() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    App.prototype.resize = function () {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientWidth;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
    };
    ;
    App.prototype.animate = function () {
    };
    ;
    return App;
}());
window.onload = function () {
    new App();
    console.log(devicePixelRatio);
};
//# sourceMappingURL=main.js.map