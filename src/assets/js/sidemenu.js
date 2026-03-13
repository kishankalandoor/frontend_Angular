$(document).ready(function() {
  $('#sidebar').find('a').click(function(){
      $('a.active').each(function(){
        $(this).removeClass('active');
      });
      $(this).addClass('active');
    })
});