var AT = AT || {};

AT.game = {
    minKarma: -5,
    maxKarma: 5,
    minHealth: 0,
    maxHealth: 10,

    scoreGain: {'asteroids': 0, 'good': 100, 'bad': -100},
    karmaGain: {'asteroids':  0, 'good': 1, 'bad': -1},
    healthGain: {'asteroids': -1, 'good': 0, 'bad': 0}
};

AT.game.init = function() {
    AT.game.curKarma = 0;
    AT.game.curHealth = AT.game.maxHealth;
    AT.game.curPoints = 0;

    AT.attraptor.init();
};

AT.updateScores = function() {
    $('#points').text(AT.game.curPoints);
    $('#health').text(AT.game.curHealth);
    $('#karma').text(AT.game.curKarma);
};

AT.game.getAttraptorModel = function() {
    return AT.attraptor.models[[this.curKarma, this.curHealth]];
};

AT.game.die = function() {
    console.log("dead");
    AT.game.curHealth = 0;
};

AT.game.processCollision = function(tag, obj) {
    this.curHealth += this.healthGain[tag];
    this.curHealth = Math.min(this.curHealth, this.maxHealth);
    if(this.curHealth < 0) {
        AT.game.die();
    }

    this.curPoints += this.scoreGain[tag];

    //this.curKarma += this.karmaGain[tag];
    this.curKarma = (this.curPoints / 1000) | 0;
    this.curKarma = Math.min(this.curKarma, this.maxKarma);
    this.curKarma = Math.max(this.curKarma, this.minKarma);

    //remove object from scene
    var idx = AT.objects[tag].indexOf(obj);
    AT.objects[tag].splice(idx, 1);
    AT.deletedObjects[tag].push(obj);
    AT.scene.remove(obj);
};

AT.game.handleInteractions = function() {
    for (var tag in AT.objects) {
        var collided = AT.attraptor.intersects(AT.game.getAttraptorModel(), AT.objects[tag]);
        if (collided.length > 0) {
            this.processCollision(tag, collided[0]);
        }
    }
};

