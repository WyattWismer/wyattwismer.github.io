(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.scrollspy').scrollSpy({
      scrollOffset:0,
      throttle:5
    });



  });
})(jQuery);