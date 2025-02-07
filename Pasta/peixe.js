class Inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'Inicio' });
    }

    preload() {
        this.load.image('Mar', 'assets/bg_azul-escuro.png');
        this.load.image('Logo', 'assets/peixes/peixe_logo.png');
        this.load.image('Inteli', 'assets/logo-inteli_branco.png');
    }

    create() {
        this.add.image(400, 300, 'Mar');
        this.add.text(120, 50, 'Pega-Pega no Mar', { fontSize: '64px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        this.add.image(400, 200, 'Logo').setOrigin(0.5);
        this.add.image(100, 550, 'Inteli').setOrigin(0.5).setScale(0.5);
        let button = this.add.text(325, 300, '→ Iniciar', { fontSize: '32px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        button.setInteractive();
        button.on('pointerdown', () => {
            this.scene.start('Fase1', { pontos: 0 });
        });
    }
}

class Fase1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase1' });
    }

    init(data) {
        this.pontos = data.pontos || 0;
    }

    preload() {
        this.load.image('peixe', 'assets/peixes/peixinho_laranja.png');
        this.load.image('tubarao', 'assets/peixes/tubarao.png');
        this.load.image('concha', 'assets/peixes/concha.png');
    }

    create() {
        this.add.image(400, 300, 'Mar');
        this.add.image(100, 550, 'Inteli').setOrigin(0.5).setScale(0.5);
        this.peixinho = this.physics.add.sprite(400, 300, 'peixe').setCollideWorldBounds(true);
        this.peixinho.setCircle(50).setOffset(10, 10);
        
        this.tubarao = this.physics.add.sprite(100, 300, 'tubarao').setCollideWorldBounds(true);
        this.tubarao.setCircle(70).setOffset(10, 10);
        
        this.concha = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'concha');
        
        this.pontosText = this.add.text(16, 16, 'Pontos: ' + this.pontos, { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        
        this.physics.add.overlap(this.peixinho, this.concha, this.coletarConcha, null, this);
        this.physics.add.collider(this.peixinho, this.tubarao, this.gameOver, null, this);
        
        this.moverTubarao();
    }

    update() {
        this.peixinho.x = this.input.x;
        this.peixinho.y = this.input.y;
    }

    moverTubarao() {
        this.tubarao.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        setTimeout(() => this.moverTubarao(), 750);
    }

    coletarConcha(peixinho, concha) {
        concha.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
        this.pontos += 10;
        this.pontosText.setText('Pontos: ' + this.pontos);
    }

    gameOver() {
        if (this.pontos >= 500) {
            this.add.text(200, 200, 'Você conseguiu ao minino 500 pontos,', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
            this.add.text(200, 230, 'Mas Tub te pegou,', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
            this.add.text(200, 260, 'Prepare-se para a Fase 2,', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
            this.add.text(200, 290, 'Começa em 5 segundos!', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });

            this.time.delayedCall(5000, () => {
                this.scene.start('Fase2', { pontos: this.pontos });
            }, [], this);
    
        } else {
            this.registry.set('pontos', this.pontos);
            this.scene.start('Fim');
        }
    }
}

class Fase2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase2' });
    }

    init(data) {
        this.pontos = data.pontos || 0;
    }

    preload() {
        this.load.image('baiacu', 'assets/peixes/baiacu.png');
    }

    create() {
        this.add.image(400, 300, 'Mar');
        this.add.image(100, 550, 'Inteli').setOrigin(0.5).setScale(0.5);
        this.peixinho = this.physics.add.sprite(400, 300, 'peixe').setCollideWorldBounds(true);
        this.peixinho.setCircle(50).setOffset(10, 10);
        
        this.tubarao = this.physics.add.sprite(100, 300, 'tubarao').setCollideWorldBounds(true);
        this.tubarao.setCircle(70).setOffset(10, 10);
        
        this.baiacu = this.physics.add.sprite(600, 300, 'baiacu').setCollideWorldBounds(true);
        this.baiacu.setCircle(60).setOffset(10, 10);
        
        this.concha = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'concha');
        
        this.pontosText = this.add.text(16, 16, 'Pontos: ' + this.pontos, { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        
        this.physics.add.overlap(this.peixinho, this.concha, this.coletarConcha, null, this);
        this.physics.add.collider(this.peixinho, this.tubarao, this.gameOver, null, this);
        this.physics.add.collider(this.peixinho, this.baiacu, this.gameOver, null, this);
        
        this.moverInimigos();
    }

    update() {
        this.peixinho.x = this.input.x;
        this.peixinho.y = this.input.y;
    }

    moverInimigos() {
        this.tubarao.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        this.baiacu.setVelocity(Phaser.Math.Between(-150, 150), Phaser.Math.Between(-150, 150));
        setTimeout(() => this.moverInimigos(), 450);
    }

    coletarConcha(peixinho, concha) {
        concha.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
        this.pontos += 10;
        this.pontosText.setText('Pontos: ' + this.pontos);
    }

    gameOver() {
        if (this.pontos >= 1000) {
            this.add.text(200, 200, 'Você coletou conchas o suficiente,', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
            this.add.text(200, 230, 'e venceu o jogo!', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
            this.add.text(200, 260, 'Aguarde o resultado.', { fontSize: '24px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });

            this.time.delayedCall(3000, () => { 
                this.registry.set('pontos', this.pontos);
                this.scene.start('Parabens');
            }, [], this);
    
        } else {
            this.registry.set('pontos', this.pontos);
            this.scene.start('Fim');
        }
    }
}

class Fim extends Phaser.Scene {
    constructor() {
        super({ key: 'Fim' });
    }

    create() {
        this.add.image(400, 300, 'Mar');
        this.add.image(100, 550, 'Inteli').setOrigin(0.5).setScale(0.5);
        this.add.text(200, 200, 'Game Over', { fontSize: '64px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        this.add.text(200, 300, 'Pontuação final: ' + this.registry.get('pontos'), { fontSize: '32px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });

        let button = this.add.text(200, 400, '→ Tentar novamente', { fontSize: '32px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        button.setInteractive();
        button.on('pointerdown', () => {
            this.scene.start('Inicio');
        });
    }
}

class Parabens extends Phaser.Scene {
    constructor() {
        super({ key: 'Parabens' });
    }

    create() {
        this.add.image(400, 300, 'Mar');
        this.add.image(100, 550, 'Inteli').setOrigin(0.5).setScale(0.5);
        this.add.text(200, 200, 'Você venceu', { fontSize: '64px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        this.add.text(200, 300, 'Pontuação final: ' + this.registry.get('pontos'), { fontSize: '32px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });

        let button = this.add.text(200, 400, '→ Jogue mais uma vez', { fontSize: '32px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
        button.setInteractive();
        button.on('pointerdown', () => {
            this.scene.start('Inicio');
        });
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Inicio, Fase1, Fase2, Fim, Parabens]
};

var game = new Phaser.Game(config);
