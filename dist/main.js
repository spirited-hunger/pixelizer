var App = /** @class */ (function () {
    function App() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        console.log(this);
    }
    return App;
}());
window.onload = function () {
    new App();
    console.log(devicePixelRatio);
};
//# sourceMappingURL=main.js.map