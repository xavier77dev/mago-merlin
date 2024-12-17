class CollectableObjects extends DrawableObject {
    isActive = true; // Gibt an, ob das Objekt aktiv ist
    currentImageIndex = 0; // Aktueller Frame der Animation
    collectSound = new Audio('audio/collect_coins.mp3'); // Initialisieren Sie den Audio-Player nur einmal

    static TYPES = {
        COIN: {
            images: [
                "img/game_items/coin1.png",
                "img/game_items/coin2.png",
                "img/game_items/coin3.png",
                "img/game_items/coin4.png",
                "img/game_items/coin5.png",
                "img/game_items/coin6.png",
                "img/game_items/coin7.png",
                "img/game_items/coin8.png",
                "img/game_items/coin9.png",
                "img/game_items/coin10.png",
            ],
            width: 30,
            height: 30,
        },
        KEY: {
            images: ["img/game_items/key.png"],   
            width: 60,
            height: 60,
        },
        POISON: {
            images: [
                "img/poison/1.png",
                "img/poison/2.png",
                "img/poison/3.png",
                "img/poison/4.png",
                "img/poison/5.png",
                "img/poison/6.png",
                "img/poison/7.png",
                "img/poison/8.png",
            ],
            width: 30,
            height: 50,
        },
    };

    constructor(x, y, type) {
        super(); // Ruft den Konstruktor der Basisklasse (DrawableObject) auf

        if (!CollectableObjects.TYPES[type]) {
            throw new Error(`Unbekannter Collectable-Typ: ${type}`);
        }
        const { images, width, height } = CollectableObjects.TYPES[type]; // Wähle die Eigenschaften basierend auf dem Typ
        this.type = type; // Speichere den Typ des Sammelobjekts
        this.imageCache = {};
        this.loadImages(images); // Bilder des Typs laden
        this.images = images; // Speichere die Bilder des Typs
        this.x = x; // Position des Sammelobjekts
        this.y = y;
        this.width = width; // Breite des Objekts
        this.height = height; // Höhe des Objekts
        this.img = this.imageCache[this.images[this.currentImageIndex]]; // Setze das erste Bild
        this.animate(); // Startet die Animation
    }

    loadImages(images) {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            this.imageCache[src] = img; // Speichert die Bilder im Cache
        });
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (!this.isActive) {
                clearInterval(this.animationInterval); // Beendet die Animation, wenn das Objekt inaktiv ist
                return;
            }
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            this.img = this.imageCache[this.images[this.currentImageIndex]];
        }, 100); // Geschwindigkeit der Animation
    }

    draw(ctx) {
        if (this.isActive) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    deactivate() {
        this.isActive = false; // Setzt das Objekt inaktiv, z. B. nach dem Sammeln
        playCollectCoinSound(); // Rufen Sie die Methode aus music.js auf
    }

    getHitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }

    static initializeCoins() {
        const coins = [];
        const coinSpacing = 200; // Erhöhen Sie den Abstand zwischen den Münzen
        const startX1 = 950; // Startposition der ersten Münzengruppe
        const startY1 = 300; // Y-Position der ersten Münzengruppe
        const startX2 = 3000; // Startposition der zweiten Münzengruppe (weiter entfernt)
        const startY2 = 300; // Y-Position der zweiten Münzengruppe
        const arcHeight = 100; // Höhe des Bogens

        for (let i = 0; i < 10; i++) { // Anzahl der Münzen pro Gruppe
            const x1 = startX1 + i * coinSpacing;
            const y1 = startY1 - Math.sin((i / 9) * Math.PI) * arcHeight; // Berechne die Y-Position für den Bogen
            coins.push(new Coin(x1, y1));

            const x2 = startX2 + i * coinSpacing;
            const y2 = startY2 - Math.sin((i / 9) * Math.PI) * arcHeight; // Berechne die Y-Position für den Bogen
            coins.push(new CollectableObjects(x1, y1, "COIN"));
        }

        return coins;
    }

    static initializePoisons() {
        const poisons = [];
        const poisonSpacing = 300; // Abstand zwischen den Giftflaschen
        const startX = 1500; // Startposition der ersten Giftflasche
        const startY = 300; // Y-Position der Giftflaschen

        for (let i = 0; i < 5; i++) { // Anzahl der Giftflaschen auf 5 begrenzen
            const x = startX + i * poisonSpacing;
            const y = startY;
            poisons.push(new CollectableObjects(x, y, "POISON"));
        }

        return poisons;
    }

    static initializeKeys() {
        const keys = [];
        const keyPositions = [
            { x: 4200, y: 150 }, // Position des ersten Schlüssels
            // Fügen Sie hier weitere Schlüsselpositionen hinzu, falls erforderlich
        ];

        keyPositions.forEach(pos => {
            keys.push(new CollectableObjects(pos.x, pos.y, "KEY"));
        });

        return keys;
    }
}

class Coin extends CollectableObjects {
    constructor(x, y) {
        super(x, y, 'COIN'); // Rufe den Konstruktor der Basisklasse auf und setze den Typ auf 'COIN'
    }
}

class PoisonObject extends CollectableObjects {
    constructor(x, y) {
        super(x, y, 'POISON'); // Rufe den Konstruktor der Basisklasse auf und setze den Typ auf 'POISON'
    }

    // Hier kannst du spezifische Methoden für das Giftobjekt hinzufügen
}

class Key extends CollectableObjects {
    constructor(x, y) {
        super(x, y, 'KEY'); // Rufe den Konstruktor der Basisklasse auf und setze den Typ auf 'KEY'
    }

    // Hier kannst du spezifische Methoden für den Schlüssel hinzufügen
}