/* ==========================================================================
  LOADER/SPINNER
  ========================================================================== */
$(window).bind("load", function() {
  $(".spn_hol").fadeOut(1000);
});
/* ==========================================================================
  FIX HOME SCREEN HEIGHT
  ========================================================================== */
$(document).ready(function() {
  "use strict";
  setInterval(function() {
    "use strict";
    var widnowHeight = $(window).height();
    var containerHeight = $(".hero-container").height();
    var padTop = widnowHeight - containerHeight;
    $(".hero").css({
      'padding-top': Math.round(padTop / 2) + 'px',
      'padding-bottom': Math.round(padTop / 2) + 'px'
    });
  }, 10)
});
/* ==========================================================================
  MENU SECTION ACTIVE
  ========================================================================== */
$(document).ready(function() {
  "use strict";
  $('button.icon-menu, button.icon-close').on('click', function() {
    "use strict";
    $('.collapse').slideToggle();
    $(this).toggleClass('active');
  });
});
/* ==========================================================================
  MENU BACKGROUND
  ========================================================================== */
$(document).ready(function() {
  "use strict";
  $(window).scroll(function() {
    "use strict";
    if ($(window).scrollTop() > $(window).height()) {
      $("header").addClass('background');
    } else {
      $("header").removeClass('background');
    }
  });
});
/* ==========================================================================
  Slider
  ========================================================================== */
$(document).ready(function() {
  $('.slider_one_big_picture').EasySlides({ 'autoplay': false, 'stepbystep': false, 'show': 3 })
  $('.slider_in_line').EasySlides({ 'autoplay': true, 'show': 9 })
  heightSlider();
});
$(window).bind('resize orientationchange', function(e) {
  heightSlider();
});

function heightSlider() {
  setTimeout(function() {
    $('.slider_one_big_picture').height(
      $('.slider_one_big_picture .active img').outerHeight(true) +
      $('.slider_one_big_picture .active h4').outerHeight(true) +
      $('.slider_one_big_picture .active p').outerHeight(true) +
      $('.slider_one_big_picture .active i').outerHeight(true)
    );
  }, 500);
}
(function($) {
  $.fn.EasySlides = function(options) {
    var settings = $.extend({
      'autoplay': false,
      'timeout': 3000,
      'show': 5,
      'vertical': false,
      'reverse': false,
      'touchevents': true,
      'delayaftershow': 300,
      'stepbystep': true,
      'startslide': 0,
      'distancetochange': 10,
      'beforeshow': function() {},
      'aftershow': function() {},
    }, options);
    return this.each(function() {
      var this_slider = this;
      var EasySlidesTimer;
      var EasySlidesCanChange = true;
      var count = $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)').length;
      var cur_slide = 0;
      var mousedowned = false;
      var need_slide = 0;
      var slides;
      if (count > 0) {
        while (count < settings['show']) {
          var html = $(this_slider).html();
          $(html).appendTo(this_slider);
          $(this_slider).children('.next_button:eq(0), .prev_button:eq(0), .nav_indicators:eq(0)').remove();
          slides = $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)');
          count = $(slides).length;
        }
        slides = $(this_slider).children('*:not(.next_button, .prev_button, .nav_indicators)');
        if ($(this_slider).children('.nav_indicators').length > 0) {
          var nav_indicators = '<ul>';
          while (need_slide < count) {
            need_slide++;
            if (need_slide < 10) need_slide_ind = '0' + need_slide;
            else need_slide_ind = need_slide;
            nav_indicators = nav_indicators + '<li>' + need_slide_ind + '</li>';
          }
          nav_indicators = nav_indicators + '</ul>';
          $(this_slider).children('.nav_indicators').html(nav_indicators);
          need_slide = 0
        }
        var EasySlidesLoopToNeeded = function() {
          var next;
          var left = need_slide - cur_slide;
          var right = cur_slide - need_slide
          if (left < 0) { left = left + count; }
          if (right < 0) { right = right + count; }
          if (cur_slide != need_slide) {
            if ((left) < (right)) {
              next = cur_slide + 1;
            } else {
              next = cur_slide - 1;
            }
            EasySlidesNext(next);
            setTimeout(EasySlidesLoopToNeeded, settings['delayaftershow']);
          };
        }
        var EasySlidesNext = function(nextslide) {
          if (EasySlidesCanChange) {
            EasySlidesCanChange = false;
            setTimeout(function() { EasySlidesCanChange = true; }, settings['delayaftershow']);
            clearTimeout(EasySlidesTimer);
            if (typeof settings['beforeshow'] == 'function') {
              settings['beforeshow'];
            };
            var i = 0;
            if (count > 0) {
              if (typeof nextslide == 'number') {
                cur_slide = nextslide;
              } else {
                cur_slide++;
                nextslide = cur_slide;
              }
              while (cur_slide < 0) { cur_slide = cur_slide + count; }
              while (cur_slide >= count) { cur_slide = cur_slide - count; }
              while (nextslide < 0) { nextslide = nextslide + count; }
              while (nextslide >= count) { nextslide = nextslide - count; }
              $(this_slider).children('.nav_indicators').find('ul').find('li').removeClass('active');
              $(this_slider).find('.nav_indicators ul li:nth-child(' + (nextslide + 1) + ')').addClass('active');
              i = 0;
              $(slides).each(function() {
                var cssclass = '';
                var icount = 0;
                icount = i - nextslide;
                while (icount < 0) {
                  icount = icount + count;
                };
                while (icount > count) {
                  icount = icount - count;
                };
                if (icount == 0) {
                  cssclass = 'active';
                  $(this_slider).find('.' + cssclass + ':not(.nav_indicators ul li)').removeClass(cssclass);
                  $(this).removeClass('hidden');
                  $(this).addClass(cssclass);
                } else if (icount < settings['show'] / 2) {
                  cssclass = 'next' + icount;
                  $(this_slider).find('.' + cssclass).removeClass(cssclass);
                  $(this).removeClass('hidden');
                  $(this).addClass(cssclass);
                } else if (icount > count - (settings['show'] / 2)) {
                  cssclass = 'prev' + (count - icount);
                  $(this_slider).find('.' + cssclass).removeClass(cssclass);
                  $(this).removeClass('hidden');
                  $(this).addClass(cssclass);
                } else {
                  $(this).addClass('hidden');
                }
                i++;
              });
              if (settings['autoplay']) {
                clearTimeout(EasySlidesTimer);
                EasySlidesTimer = setTimeout(function() {
                  EasySlidesNext();
                }, settings['timeout']);
              }
            }
            if (typeof settings['aftershow'] == 'function') {
              settings['aftershow'];
            };
          };
        };
        EasySlidesNext(settings['startslide']);
        $(slides).click(function() {
          need_slide = $(this_slider).children().index(this);
          if (settings['stepbystep']) {
            EasySlidesLoopToNeeded()
          } else {
            EasySlidesNext(need_slide);
          }
        });
        $(this_slider).children('.nav_indicators').find('ul').find('li').click(function() {
          need_slide = $(this_slider).find('.nav_indicators ul li').index(this);
          if (settings['stepbystep']) {
            EasySlidesLoopToNeeded()
          } else {
            EasySlidesNext(need_slide);
          }
        });
        $(this_slider).on('click touchend', '.next_button', function() {
          EasySlidesCanChange = true;
          EasySlidesNext();
        });
        $(this_slider).on('click touchend', '.prev_button', function() {
          EasySlidesCanChange = true;
          cur_slide--;
          EasySlidesNext(cur_slide);
        });
        if (settings['touchevents']) {
          var EasySliderMoved = function(xcur, ycur) {
            var offset = $(slides).find('.active').offset();
            var left = 0;
            var top = 0;
            if (typeof offset !== 'undefined') {
              left = offset.left;
              top = offset.top;
            }
            var p0 = $(this_slider).data('posstart'),
              p1 = {
                x: xcur,
                y: ycur,
                l: left,
                t: top,
              },
              d = 0;
            if (typeof p0 === 'undefined') {
              p0 = p1;
              $(this_slider).data('posstart', p1);
            }
            if (settings['vertical']) {
              d = p1.y - p0.y;
              top = p0.t + d;
            } else {
              d = p1.x - p0.x;
              left = p0.l + d;
            }
            if (settings['reverse']) {
              d = -d;
            }
            if ((Math.abs(d) > settings['distancetochange']) && (EasySlidesCanChange)) {
              $(this_slider).data('posstart', p1);
              if (d > 0) {
                cur_slide--;
              } else {
                cur_slide++;
              }
              EasySlidesNext(cur_slide);
            }
          }
          /*События*/
          $(this_slider).bind('mousemove', function(e) {
            e.preventDefault();
            if (e.buttons > 0) {
              EasySliderMoved(e.pageX, e.pageY);
              mousedowned = true;
            } else {
              if (mousedowned) {
                EasySliderMoved(e.pageX, e.pageY);
                $(this_slider).removeData('posstart');
                mousedowned = false;
              }
            }
          });
          $(this_slider).bind('mouseup', function(e) {
            e.preventDefault();
            if (mousedowned) {
              EasySliderMoved(e.pageX, e.pageY);
              $(this_slider).removeData('posstart');
              mousedowned = false;
            }
          })
          $(this_slider).bind('touchmove', function(e) {
            e.preventDefault();
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            EasySliderMoved(touch.pageX, touch.pageY);
          });
          $(this_slider).bind('touchend', function(e) {
            e.preventDefault();
            $(this_slider).removeData('posstart');
          });
        }
      }
    });
  }
})(jQuery);