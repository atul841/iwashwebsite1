(function ($, Drupal, window, document, drupalSettings) {
  'use strict';
  var executedOnce = false;
  Drupal.behaviors.homepage = {
    attach: function (context, settings) {
      // Function calls.
      if (!executedOnce) {
        slickHomePage();
        executedOnce = true;
      }

      // tabindex added to form select option
      jQuery('.js-form-item').attr('tabindex', '0');

      //Select box css styling specific to homepage
      jQuery('.page_node_homepage_new .ui-menu.ui-widget.ui-widget-content.ui-autocomplete.ui-front').css({
        "width": "100%",
        "max-width": "500px",
        "max-height": "230px",
        "overflow-y": "auto",
        "padding": "2px",
      });
      jQuery('.page_node_homepage_new .ui-menu .ui-menu-item').css({
        "padding": "10px 5px",
      });

      function slickHomePage() {
        //New Homepage Designs
        jQuery('.facts-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          fade: true,
          autoplaySpeed: 2000,
          speed: 900,
          dots: false,
          arrows: false,
          infinite: true,
          cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
          touchThreshold: 100
        });
      }
      jQuery('.form-select').change(function (event) {
        // if (jQuery('.icon-wrapper').hasClass('slick-initialized')) {
        //   jQuery('.icon-wrapper').slick('unslick');
        // }
      });


      //banner Video Speed reduce
      if (jQuery('.banner-img-video video').length) {
        document.querySelector('.banner-img-video video').playbackRate = .5;
      }

      //Popup box open on button click
      jQuery('.about-us .play-btn-outer').click(function () {
        var buttonId = $(this).attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        var videoLink = jQuery(".videosrc").text();
        jQuery(".modal").html("<div class='cross'></div><button class='play-btn play-btn-inner'>&nbsp;</button></div><video id='video' class='video' controls type='video/mp4'></video>");
        var video = document.getElementById('video');
        var source = document.createElement('source');
        source.setAttribute('src', videoLink);
        video.appendChild(source);

        jQuery(".modal .play-btn-inner").on("click", function () {
          var video = jQuery('.video');
          video.trigger("play");
          jQuery(".modal .play-btn-inner").css("display", "none");
        });

        jQuery('.modal .cross').on("click", function () {
          var video = jQuery('.video');
          video.trigger("pause");
          $('#modal-container,.modal-container').addClass('out');
          $('body').removeClass('modal-active');
          jQuery(".modal .play-btn-inner").css("display", "block");
        });

      })

      $(window).keydown(function (e) {
        if (e.which == 32) {
          if (video.paused === false) {
            video.pause();
          } else {
            video.play();
          }

          return false;

        }
      });

      jQuery(document).on("click", ".explore_single .exploreHover a", function () {
        var approvalsId = jQuery(this)?.next()[0]?.children[0]?.getAttribute("data-id");
        localStorage.setItem('approvalsId', approvalsId);
      });

      jQuery(document).ajaxComplete(function () {
        jQuery(document).on("click", ".state_single .stateHover a", function () {
          var approvalsId = jQuery(this).next()[0].children[0].getAttribute("data-id");
          localStorage.setItem('approvalsId', approvalsId);
        });
      });

  // dsc-popup
  $(document).ready(function () {
    const hasPopupBeenShown =
      window.performance.getEntriesByType("navigation")[0].type ===
        "reload" ||
      (window.performance.getEntriesByType("navigation")[0].type ===
        "navigate" &&
        JSON.parse(sessionStorage.getItem("popupShown")) === true);
    if (!hasPopupBeenShown && hasPopupBeenShown != null) {
      $(".dsc-popup").css("display", "flex");
      jQuery("body").css("overflow", "hidden");
      $("#close-popup").click(function () {
        $(".dsc-popup").hide();
        $(".dsc1-popup").show();
        $(".dsc1-popup").css("display", "flex");
        sessionStorage.setItem("popupShown", true);
        jQuery("body").css("overflow", "auto");
      });
    }
  });

  //Udyam PopUp
  $(document).ready(function () {
    $(".dsc1-popup").click(function () {
      $(".dsc1-popup").hide();
      sessionStorage.setItem("popupShown", true);
      jQuery("body").css("overflow", "auto");
    });
  });
    },
  };
})(jQuery, Drupal, this, this.document, drupalSettings);
