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
        $('body').css({
            'cursor' : 'none'
        });
        AT.render();
    })
});