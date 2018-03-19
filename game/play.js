/* global Phaser */

var play = function() {};

play.prototype = 
{
    create: function()
    {
        this.add.sprite(0, 0, "background");
        this.mousecounter = 0;
                
        //Textes
        this.titleText = this.add.text(200, 50, "L'Âge du Capitaine", {font: "48px 'Gochi Hand'"});
        this.titleText.anchor.x = 0.5;
        this.titleText.anchor.y = 0.5;
        this.titleText.angle = -5;
        
        this.touches = this.add.text(665, 142, "Touches :\nFlèches : avancer\nEntrer : tricher\nSouris : inutile");
        this.touches.scale.x = 0.5;
        this.touches.scale.y = 0.5;
        
        //Sprites
        for (var i = 0; i < 10; i++)
        {
            this.addLine(50 + i * 66.5, 100, 3, 465);
        }
        
        for (var i = 0; i < 10; i++)
        {
            this.addLine(50, 100 + i * 51.3, 600, 3);
        }
        
        //Yahourts
        for (var i = 0 ; i < 5; i++)
        {
            var xCoords = 50 + random(0, 9) * 66.5;
            var yCoords = 100 + random(0, 9) * 51.3;
            
            var yahourt = this.add.sprite(xCoords, yCoords, "yahourt");
            yahourt.anchor.setTo(0.5, 0.8);
            yahourt.scale.setTo(0.1, 0.1);
        }
        
        //Enclumes
        for (var i = 0 ; i < 5; i++)
        {
            var xCoords = 50 + random(0, 9) * 66.5;
            var yCoords = 100 + random(0, 9) * 51.3;
            
            var yahourt = this.add.sprite(xCoords, yCoords, "enclume");
            yahourt.anchor.setTo(0.5, 0.6);
            yahourt.scale.setTo(0.3, 0.3);
        }
        
        this.caserne = this.add.sprite(610, 2, "caserne");
        this.caserne.scale.x = 0.25;
        this.caserne.scale.y = 0.25;
        
        this.pion = this.add.sprite(6, 470, "pion");
        this.pion.scale.x = 0.2;
        this.pion.scale.y = 0.2;
        
        this.confettis1 = this.add.sprite(550, -204.8, "confettis"); //550 30
        this.confettis1.scale.x = 0.5;
        this.confettis1.scale.y = 0.4;
        this.confettis1.tint = 0x0000FF;
        
        this.confettis2 = this.add.sprite(600, -204.8, "confettis"); //600 50
        this.confettis2.scale.x = 0.5;
        this.confettis2.scale.y = 0.4;
        this.confettis2.angle = 180;
        this.confettis2.anchor.x = 1;
        this.confettis2.anchor.y = 1;
        this.confettis2.tint = 0xFF0000;
        
        //Particles
        this.smoke = this.game.add.emitter(740, 40, 380);
        this.smoke.makeParticles("smoke");
        this.smoke.minParticleScale = 0.1;
        this.smoke.maxParticleScale = 0.1;
        this.smoke.gravity = -150;
        this.smoke.start(false, 5000, 350);
        
        //Sons
        this.music = this.game.add.audio("game");
        this.music.onLoop.add(this.playMusic.bind(this));
        this.music.volume = 0.1;
        this.music.play('', 0, 1, true);
        
        this.sneeze = this.add.audio("sneeze");
        this.puke = this.add.audio("puke");
        
        //Toujours garder ça à la fin !
        this.mouse = this.add.sprite(0, 0, "mouse");
        this.mouse.visible = false;
        this.input.addMoveCallback(this.mouseMove.bind(this));
        
        //Touches
        this.input.keyboard.onDownCallback = this.downCallback.bind(this);
    },
    
    playMusic: function(e)
    {
        this.music.play('', 0, 1, true);
    },
    
    mouseMove: function(e)
    {
        if (!this.mouse.visible)
        {
            this.puke.play();
        }
        
        this.mouse.visible = true;
        this.mousecounter = 0;

    },
    
    update: function()
    {
        if (this.mouse.visible == true && this.mousecounter != 15)
        {
            this.mousecounter++;
        }
        else
        {
            this.mouse.visible = false;
            this.mousecounter = 0;
        }
    },
    
    addLine: function(x, y, width, height)
    {
        var bmd = this.add.bitmapData(width, height);
         
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#999999';
        bmd.ctx.fill();
        this.add.sprite(x, y, bmd);
    },
    
    pionBeginMovingFinish : function(e)
    {
        if (this.oneMove)
        {
            this.pion.angle = 0;
            this.pionFinishMovingFinish("osef");
            return;
        }
        
        this.add.tween(this.pion).to({angle: "+5"}, 350, Phaser.Easing.Quadratic.Out, true);
        
        this.moveFinishTween = this.add.tween(this.pion).to({x: "+" + this.pionXDirection, y: "+" + this.pionYDirection}, 350, Phaser.Easing.Quadratic.Out, true);
        this.moveFinishTween.onComplete.add(this.pionFinishMovingFinish.bind(this));
    },
    
    pionFinishMovingFinish : function(e)
    {
        if (this.pion.x >= 600 && this.pion.y <= 9)
        {
            this.won = true;
            var yay = this.add.audio('yay');
            yay.play();
            
            this.add.tween(this.pion).to({angle: "-720"}, 650, Phaser.Easing.Quadratic.Out, true);
            this.add.tween(this.pion).to({x: 650, y:110}, 650, Phaser.Easing.Quadratic.Out, true);
            this.add.tween(this.pion.scale).to({x: 0, y: 0}, 650, Phaser.Easing.Quadratic.Out, true);
            
            this.add.tween(this.confettis1).to({y: -20}, 2000, Phaser.Easing.Quadratic.In, true);
            this.add.tween(this.confettis2).to({y: 20}, 2000, Phaser.Easing.Quadratic.In, true);
            
            this.add.tween(this.confettis1).to({alpha: 0}, 2000, Phaser.Easing.Quadratic.In, true);
            this.add.tween(this.confettis2).to({alpha: 0}, 2000, Phaser.Easing.Quadratic.In, true);
        }
        else
        {
            this.pionMoving = false;
        }
        
    },
    
    downCallback: function(e)
    {
        if (this.won)
        {
            return;
        }
        else if ((e.keyCode == Phaser.Keyboard.RIGHT || e.keyCode == Phaser.Keyboard.UP) && !this.pionMoving)
        {
            if (e.keyCode == Phaser.Keyboard.RIGHT)
            {
                if (this.pion.x >= 604.5)
                {
                    return;
                }
                
                this.pionXDirection = 33.25;
                this.pionYDirection = 5;
                this.oneMove = false;
                this.add.tween(this.pion).to({angle: "-5"}, 350, Phaser.Easing.Quadratic.In, true);
            }
            else
            {
                if (this.pion.y <= 8.3)
                {
                    return;
                }
                
                this.oneMove = true;
                this.pionXDirection = 0;
                this.pionYDirection = 51.3;
            }
            
            this.pionMoving = true;
            this.moveBeginTween = this.add.tween(this.pion).to({x: "+" + this.pionXDirection, y: "-" + this.pionYDirection}, 350, Phaser.Easing.Quadratic.In, true);
            this.moveBeginTween.onComplete.add(this.pionBeginMovingFinish.bind(this));
        }
        else if (e.keyCode == Phaser.Keyboard.ENTER && !this.pionMoving)
        {
            this.pionMoving = true;
            var tween = this.add.tween(this.pion).to({x: 604.5, y: 8.3}, 850, Phaser.Easing.Bounce.Out, true);
            tween.onComplete.add(this.pionFinishMovingFinish.bind(this));
            this.sneeze.play();
        }
    }
    
};

function random(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}