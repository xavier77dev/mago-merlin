class BackgroundObject extends MovableObject {
  width = 720; // 
  height = 500;
  
  // y berechnet sich aus der Höhe des Hintergrunds
  constructor(imagePath, x, y = 480 - 500, width = 720, height = 500) { 
    super();  
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(imagePath);
  }
    // Die Bewegungslogik für den Hintergrund
    move(speed) {
      this.x -= speed; // Bewege den Hintergrund nach links
      if (this.x <= -this.width) {
        this.x += this.width; // Wiederhole den Hintergrund, wenn er den Bildschirm verlassen hat
      }
    }
  
  // Überschreibe die draw-Methode
  draw(ctx) {
    if (this.img.src.includes('candle')) {	
      // Change the image properties for candle image
      const candleWidth = 200; // Beispielwert für die Breite der Kerze
      const candleHeight = 320; // Beispielwert für die Höhe der Kerze
      const candleYOffset = 115; // Adjust this value to move the candle further down
      ctx.drawImage(this.img, this.x, this.y + candleYOffset, candleWidth, candleHeight); // 
    } else if (this.img.src.includes('skull')) {
      // Change the image properties for skull image
      const skullWidth = 180; // Beispielwert für die Breite des Schädels
      const skullHeight = 160; // Beispielwert für die Höhe des Schädels
      const skullYOffset = 273; // Adjust this value to move the skull further down
      ctx.drawImage(this.img, this.x, this.y + skullYOffset, skullWidth, skullHeight);
    } else {
      // Default drawing for other images
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}