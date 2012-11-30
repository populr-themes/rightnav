var RightNav = (function ($) {

  jQuery.fn.reverse = [].reverse;

  var exports = {};

  exports.recomputeNav = function() {
    $('#slide-nav').empty();
    offset = $('#main-region').offset();
    if (offset) {
      $('#slide-nav').css({top: offset.top});
    }
    $('.asset-container').each(function(idx, asset) {
      $asset = $(asset)
      $asset.attr('id', 'slide' + idx);
      title = $asset.find('.asset-title').text();
      if (title) {
        $('#slide-nav').append('<li><a href="#slide' + idx + '">' + $asset.find('.asset-title').text() + '</a></li>')
      }
    });
  };

  exports.recomputeNav();

  return exports;

}(jQuery));

$(document).on('pop-initialized', function(){
  // Instead of listening for the document.ready event, your theme
  // should listen for document.pop-initialized.

  $('#slide-nav a').live('click', function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    $site = $('#site');
    $.scrollTo($(e.currentTarget).attr('href'), {
      duration: 500,
      // offset: $site.length > 0 ? -$site.offset().top : 0,
      axis: 'y'
    });
  });

  $('.asset').live('initialize', function(e, asset){
    RightNav.recomputeNav()
  });

  $('.asset').live('destroy', function(e, asset){
    RightNav.recomputeNav()
  });
});
