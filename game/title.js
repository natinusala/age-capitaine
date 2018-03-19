/* global Phaser */

var title = function(game) {};

title.prototype = {
    create: function()
    {
       //Init
       this.game.input.keyboard.onDownCallback = this.downCallback.bind(this);
       
       //Sprites
       this.game.add.sprite(0, 0, "background");
       
       this.caserne = this.game.add.sprite(400, 300, "caserne");
       this.caserne.anchor.x = 0.5;
       this.caserne.anchor.y = 0.5;
       
       this.pompier = this.game.add.sprite(165, 675, "pompier");
       this.pompier.scale.x = 0.6;
       this.pompier.scale.y = 0.6;
       this.pompier.anchor.x = 0.4;
       this.pompier.anchor.y = 0.8;
       this.pompier.angle = -5;
       
       this.windows = this.add.sprite(703, 573, "windows");
       this.windows.anchor.setTo(0.5, 0.5);
       this.windows.scale.setTo(0.4, 0.4);
   
       this.capgemini = this.add.sprite(565, 573, "capgemini");
       this.capgemini.anchor.setTo(0.5, 0.5);
       this.capgemini.scale.setTo(0.4, 0.4);
   
       //Particles
       this.smoke = this.game.add.emitter(550, 150, 380);
       this.smoke.makeParticles("smoke");
       this.smoke.minParticleScale = 0.5;
       this.smoke.maxParticleScale = 0.5;
       this.smoke.gravity = -150;
       this.smoke.start(false, 5000, 350);
       
       //Sons
       this.titleMusic = this.game.add.audio("title");
       this.titleMusic.onLoop.add(this.playTitleMusic.bind(this));
       this.titleMusic.play('', 0, 1, true);
       
       //Textes
       this.titleText = this.game.add.text(200, 50, "L'Âge du Capitaine", {font: "48px 'Gochi Hand'"});
       this.titleText.anchor.x = 0.5;
       this.titleText.anchor.y = 0.5;
       this.titleText.angle = -5;
       
       this.subtitle = this.game.add.text(600, 540, "Appuyez sur ENTREE pour jouer !", {font: "24px 'Gochi Hand'"});
       this.subtitle.anchor.x = 0.5;
       this.subtitle.anchor.y = 0.5;
       
       /*this.credits = this.game.add.text(520, 580, "Nathan SALAUN - Nicolas GOUREAU", {font: "18px 'Gochi Hand'"});
       this.subtitle.anchor.x = 0.5;*/
    },
    
    downCallback: function(e)
    {
        if (e.keyCode == Phaser.Keyboard.ENTER)
        {
            this.titleMusic.stop();
            this.game.state.start("play");
        }
    },
    
    playTitleMusic: function()
    {
       this.titleMusic.play('', 0, 1, true);
    },
    
    update: function()
    {
        if (this.titleText.visible)
        {
            if (this.subtitle.scale.x == 1.0)
            {
               //Tweens
               this.game.add.tween(this.subtitle.scale).to({x: 1.15, y: 1.15}, 380, Phaser.Easing.Sinusoidal.Out, true);
               this.game.add.tween(this.pompier).to({angle: 5}, 380, Phaser.Easing.Sinusoidal.Out, true);
            }
            else if (this.subtitle.scale.x == 1.15)
            {
               //Tweens
               this.game.add.tween(this.subtitle.scale).to({x: 1, y: 1}, 380, Phaser.Easing.Sinusoidal.Out, true);
               this.game.add.tween(this.pompier).to({angle: -5}, 380, Phaser.Easing.Sinusoidal.Out, true);
            }
        }
    }
};