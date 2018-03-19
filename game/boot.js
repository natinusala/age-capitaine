var boot = function(game) {};

boot.prototype = {
    preload: function()
    {
        
    },
    
    create: function()
    {
        this.scale.pageAlignHorizontally = true;
        this.game.state.start("preload");
    }
};