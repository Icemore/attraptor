var AT = AT || {};

AT.game = {
    minKarma: -5,
    maxKarma: 5,
    minHealth: 0,
    maxHealth: 10,

    objects: {'evil': []},
    scoreGain: {'evil': 100},
    karmaGain: {'evil':  1},
    healthGain: {'evil': 0}
};

AT.game.init = function() {
    AT.game.curKarma = 0;
    AT.game.curHealth = this.maxHealth;
    AT.game.curPoints = 0;

    AT.attraptor.init();
};

AT.updateScores = function() {
    $('#points').text(AT.game.curPoints);
    $('#health').text(AT.game.curHealth);
    $('#karma').text(AT.game.curKarma);
};

AT.game.setObjects = function(obj) {
    AT.game.objects['evil'] = obj;
};

AT.game.getAttraptotModel = function() {
    return AT.attraptor.models[[this.curKarma, this.curHealth]];
};

AT.game.processCollision = function(tag) {
    this.curHealth += this.healthGain[tag];
    this.curHealth = Math.min(this.curHealth, this.maxHealth);

    this.curPoints += this.scoreGain[tag];

    this.curKarma += this.karmaGain[tag];
    this.curKarma = Math.min(this.curKarma, this.maxKarma);
    this.curKarma = Math.max(this.curKarma, this.minKarma);
};

AT.game.handleInteractions = function() {
    for (var tag in this.objects) {
        if (AT.attraptor.intersects(AT.game.getAttraptotModel(), this.objects[tag])) {
            this.processCollision(tag);
        }
    }
};

