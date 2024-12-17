class Endboss extends MovableObject {
    height = 600;  // Höhe des Endbosses
    width = 450;   // Breite des Endbosses
    y = -100;      // y-Position
    x = 5500;      // x-Position
    energy = 100;  // Setze die Energie des Endbosses auf 100
   
    offset = {
        top: 180,    // Reduziert das Rechteck von oben
        bottom: 65, // Reduziert das Rechteck von unten
        left: 90,   // Reduziert das Rechteck von links
        right: 90   // Reduziert das Rechteck von rechts
      };

    IMAGES_WALKING = [
        'img/troll/idle/idle_000.png',
        'img/troll/idle/idle_001.png',
        'img/troll/idle/idle_002.png',
        'img/troll/idle/idle_003.png',
        'img/troll/idle/idle_004.png',
        'img/troll/idle/idle_005.png',
        'img/troll/idle/idle_006.png',
        'img/troll/idle/idle_007.png',
        'img/troll/idle/idle_008.png',
        'img/troll/idle/idle_009.png',
    ];

    IMAGES_HURT = [
        'img/troll/hurt/hurt_000.png',
        'img/troll/hurt/hurt_001.png',
        'img/troll/hurt/hurt_002.png',
        'img/troll/hurt/hurt_003.png',
        'img/troll/hurt/hurt_004.png',
        'img/troll/hurt/hurt_005.png',
        'img/troll/hurt/hurt_006.png',
        'img/troll/hurt/hurt_007.png',
        'img/troll/hurt/hurt_008.png',
        'img/troll/hurt/hurt_009.png',
    ];

    IMAGES_DEAD = [
        'img/troll/die/die_000.png',
        'img/troll/die/die_001.png',
        'img/troll/die/die_002.png',
        'img/troll/die/die_003.png',
        'img/troll/die/die_004.png',
        'img/troll/die/die_005.png',
        'img/troll/die/die_006.png',
        'img/troll/die/die_007.png',
        'img/troll/die/die_008.png',
        'img/troll/die/die_009.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }

}