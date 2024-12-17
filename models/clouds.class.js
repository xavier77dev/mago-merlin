class Cloud extends MovableObject {
    height = 200;
    width = 600;
    speed = 0.2;

    constructor(initialX = Math.random() * 2600) {
        super().loadImage('img/clouds/full.png');
        this.x = initialX; // Starte mit der übergebenen oder zufälligen x-Position
        this.y = Math.random() * 50; // Zufällige y-Position (Wolkenhöhe)
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // Bewege die Wolke nach links
            if (this.x + this.width < 0) {
                // Wenn die Wolke den Bildschirm verlässt, setze sie zurück
                this.x = 2600 + Math.random() * 500; // Setze sie weit rechts zurück
                this.y = Math.random() * 50; // Ändere die y-Position zufällig
            }
        }, 1000 / 60); // 60 FPS für flüssige Bewegung
    }
}
