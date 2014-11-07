$(document).ready(function() {
    AT.init();
    AT.world();
    AT.Music.init();

    $('#start-btn').click(function() {
        $('#files').click();
    });

    $('#files').on('change', AT.Music.handleFileSelect);

    $(document).on('music-started', function() {
        $('#content').hide();
        $('#ui-indicators').show();
        $('body').css({'cursor': 'none'});
        AT.ended = false;

        AT.render();
    });

    $(document).on('game-ended', function() {
        $('#ui-indicators').hide();
        $('body').css({'cursor': 'default'});
        $('#scores').text(AT.game.curPoints);
        $('#start-screen').hide();
        $('#end-screen').show();
        $('#content').show();
    });
});