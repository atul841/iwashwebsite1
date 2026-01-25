(function ($, Drupal, window, document, drupalSettings) {
  'use strict';
  var executedOnce = false;
  Drupal.behaviors.pages = {
    attach: function (context, settings) {
      // Function calls.
      if (!executedOnce) {
        activatePolicytab();
        slickMultiDomain();
        executedOnce = true;
      }

      // Add jquery tabs to faqs & website policies.
      jQuery("#tabs, #tabs .tab-content").tabs();

      //tab traverse in faqs page
      jQuery(".content-li").attr("tabindex","0");
      jQuery(".ui-icon").attr("tabindex","0");

      //tab traverse in website-policies page
       jQuery(".ui-tab").attr("tabindex","0");
       jQuery(".ui-tabs-anchor").attr("tabindex","-1");

        jQuery(".open").attr("tabindex","0");
      // Make policy tab active on click of footer links.
      function activatePolicytab() {
        if (document.location.pathname == '/website-policies') {
          jQuery("body a").on('click', function (e) {
            var hashValue = this.hash;
            if (hashValue) {
              var target = 'a[href=\"' + hashValue + '\"]';
              if (document.querySelector(target)) {
                document.querySelector(target).click();
                // Scroll to top.
                scrollToTop();
              }
            }
          });
          scrollToTop();
        }
      }

      // Scroll to top.
      function scrollToTop() {
        $('html, body').stop().animate({
          'scrollTop': 0
        }, 100, 'swing', function () { });
      }

      // Background image Lazy Load
      if(jQuery('.contact-detail.lazy-background').length) {
        var imageUrls = jQuery('.bg-lazyLoading').text();

        // Changes in css class
        function callback(mutationList, observer) {
          mutationList.forEach(function (mutation) {
            jQuery('.contact-detail.lazy-background.visible').css('background-image', imageUrls);
          })
        }
        const contact = document.querySelector('.contact-detail.lazy-background');
        const options = {attributes: true};
        const observer = new MutationObserver(callback);
        observer.observe(contact, options);
      }
      // Slick MultiDomain
      function slickMultiDomain() {
        var $slider = jQuery('#cover-slider');
        if ($slider.length) {
          var currentSlide;
          var slidesCount;
          var sliderCounter = document.createElement('div');
          sliderCounter.classList.add('slider__counter');

          var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            if (slidesCount == 1) {
              jQuery(".slider__counter").css("display", "none");
            }
            jQuery(sliderCounter).text(currentSlide + '/' + slidesCount)

          };

          $slider.on('init', function (event, slick) {
            $slider.append(sliderCounter);
            updateSliderCounter(slick);
          });

          $slider.on('afterChange', function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
          });

          $slider.not('.slick-initialized').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 1,

                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                }
              },
              {
                breakpoint: 555,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          });
        }

        jQuery('#important-links').not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 3,
          rows: 2,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,

              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 555,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
        });

        jQuery('#policies').not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,

              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 555,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
        });

        jQuery('#contact-slick').not('.slick-initialized').slick({
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,

              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              }
            },
            {
              breakpoint: 555,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });
        jQuery('#ministry-association .slick-slide > a,#cover-slider .slick-slide > a, #important-links .slick-slide > a, #policies .slick-slide > a, #contact-slick .slick-slide > a, #state-association .slick-slide > a, #central-department .slick-slide > a, #state-department .slick-slide > a').attr('target', '_blank');
      }
    },
  };
})(jQuery, Drupal, this, this.document, drupalSettings);

jQuery(document).ready(function(){
  //  About new js
  if(jQuery('.page_node_about_us_new').length) {
    var videoLink = jQuery(".file").text();
    jQuery('.features .feature-video .play-btn').on('click', function () {
      jQuery('.features .feature-video').append("<div class='cross-abt'></div><video id='video' class='video' controls autoplay preload='none' type='video/mp4'></video>");
      jQuery('.features .feature-video .media').css("display", "none");
      var video = document.getElementById('video');
      var source = document.createElement('source');
      source.setAttribute('src', videoLink);
      video.appendChild(source);
      jQuery('.features .feature-video .play-btn').css('display', 'none');
    });
    jQuery(document).on('click', '.feature-video .cross-abt', function () {
      jQuery('.feature-video .video').trigger("pause");
      jQuery('.features .feature-video .video,.features .feature-video .cross-abt').remove();
      jQuery('.features .feature-video .media').css("display", "block");
      jQuery('.features .feature-video .play-btn').css('display', 'block');
    });
    jQuery('.team-wrapper').slick({
      infinite: false,
      rows: 2,
      slidesToScroll: 1,
      slidesPerRow: 4,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToScroll: 1,
            slidesPerRow: 3,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToScroll: 1,
            slidesPerRow: 2,
          }
        }
      ]
    });
  }
})
