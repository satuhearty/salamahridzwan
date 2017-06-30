/**
 * Main JS
 */

(function($) {

  skel
    .breakpoints({
      xlarge:	'(max-width: 1680px)',
      large:	'(max-width: 1280px)',
      medium:	'(max-width: 980px)',
      small:	'(max-width: 736px)',
      xsmall:	'(max-width: 480px)'
    });

  $(function() {

    var	$window = $(window),
      $body = $('body'),
      $banner = $('#banner'),
      $header = $('#header');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('data-scroll')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });

    // Closes the Responsive Menu on Menu Item Click
    $('#menu ul li a').click(function() {
      $('.close').click();
    });

    // Mobile?
    if (skel.vars.mobile) {
      $body.addClass('is-mobile');
    } else {
      skel
        .on('-medium !medium', function() {
          $body.removeClass('is-mobile');
        })
        .on('+medium', function() {
          $body.addClass('is-mobile');
        });
    }

    // Fix: Placeholder polyfill.
    $('form').placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function() {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active
      );
    });

    // Scrolly.
    $('.scrolly')
      .scrolly({
        speed: 1000,
        offset: $header.outerHeight()
      });

    // Menu.
    $('#menu')
      .append('<a href="#menu" class="close"></a>')
      .appendTo($body)
      .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: 'right',
        target: $body,
        visibleClass: 'is-menu-visible'
      });

    // Header.
    if (skel.vars.IEVersion < 9) {
      $header.removeClass('alt');
    }

    if ($banner.length > 0 &&	$header.hasClass('alt')) {
      $window.on('resize', function() { $window.trigger('scroll'); });

      $banner.scrollex({
        bottom:		$header.outerHeight() + 1,
        terminate:	function() { $header.removeClass('alt'); $('.menuToggle').removeClass('alt'); },
        enter:		function() { $header.addClass('alt'); $('.menuToggle').addClass('alt'); },
        leave:		function() { $header.removeClass('alt'); $('.menuToggle').removeClass('alt'); }
      });
    }

    // Photo gallery
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav',
      autoplay: true,
      lazyLoad: 'ondemand'
    });

    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      lazyLoad: 'ondemand'
    });
  });

})(jQuery);
