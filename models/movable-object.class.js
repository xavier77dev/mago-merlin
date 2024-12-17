class MovableObject extends DrawableObject {
  drawRectangle = true; // Standardmäßig kein Rechteck
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  currentImage = 0;

  offset = {
    top: 0, // Wie viel kleiner das Rechteck von oben sein soll
    bottom: 0, // Wie viel kleiner das Rechteck von unten sein soll
    left: 0, // Wie viel kleiner das Rechteck von links sein soll
    right: 0, // Wie viel kleiner das Rechteck von rechts sein soll
  };

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Knight ||
      this instanceof Endboss ||
      this instanceof Snake ||
      this instanceof PoisonObject
    ) {
      this.drawRectangle = true;
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "purple";
      ctx.rect(
        // Rechteck wird um die Offsets kleiner gezeichnet
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right, // breite-Offest links und rechts
        this.height - this.offset.top - this.offset.bottom, // höhe-Offset oben und unten
      );
      ctx.stroke();
    }
  }

  isColliding(mo) {
    if (!(mo instanceof MovableObject)) return false; // Überprüfen, ob mo eine Instanz von MovableObject ist
    const box1 = this.getCollisionBox();
    const box2 = mo.getCollisionBox();

    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
    );
  }

  getCollisionBox() {
    const box = {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
    return box;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 5;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    if (images && images.length > 0) {
      // Überprüfen, ob das Array definiert und nicht leer ist
      let i = this.currentImage % images.length; // Auf das übergebene Array zugreifen
      let path = images[i]; // Bildpfad aus dem Array
      this.img = this.imageCache[path]; // Bild aus dem Cache setzen
      this.currentImage++;
      if (this.currentImage >= images.length) {
        this.currentImage = 0; // Setze auf den ersten Frame zurück
      }
    }
  }

  moveRight() {
    this.x += this.speed;
    if (this.walking_sound && this.walking_sound.paused) {
      this.walking_sound.play();
    }
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.walking_sound && this.walking_sound.paused) {
      this.walking_sound.play();
    }
  }

  jump() {
    this.speedY = 30;
  }
}
