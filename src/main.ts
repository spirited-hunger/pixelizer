class App {
  constructor(
    public canvas: any,
    public ctx
  ) {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
  }
}