var preload = function(game) {};

preload.prototype = {
    //TODO Barre de chargement
    preload: function()
    {
        //Images
        this.game.load.image("background", "assets/background.png");
        this.game.load.image("mouse", "assets/mouse.png");
        this.game.load.image("pompier", "assets/pompier.png");
        this.game.load.image("caserne", "assets/caserne.png");
        this.game.load.image("smoke", "assets/smoke.png");
        this.game.load.image("road", "assets/road.png");
        this.game.load.image("pion", "assets/pion.png");
        this.game.load.image("confettis", "assets/confettis.png");
        this.game.load.image("windows", "assets/windows.png");
        this.game.load.image("capgemini", "assets/capgemini.png");
        this.game.load.image("yahourt", "assets/yahourt.png");
        this.game.load.image("enclume", "assets/enclume.png");
        
        //Sons
        this.game.load.audio('title', 'assets/title.ogg');
        this.game.load.audio('game', 'assets/game.ogg');
        this.game.load.audio('yay', 'assets/yay.ogg');
        this.game.load.audio('sneeze', 'assets/sneeze.ogg');
        this.game.load.audio('puke', 'assets/puke.ogg');
    },
    
    create: function()
    {
        this.game.state.start("title");
    }
};