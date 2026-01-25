(function ($, Drupal, window, document, drupalSettings) {
  "use strict";
  Drupal.behaviors.faqs = {
    attach: function (context, settings) {
      // Function calls.

      //Tabs + Accordian  Calls
      $(function () {
        $(".accordion").accordion({
          collapsible: true
        });
        jQuery(".tabs, .tab-content").tabs();
      });
      // Add slick to horizontal faq tabs.
      jQuery('#tabs .top-slider').not('.slick-initialized').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        focusOnSelect: true,
        infinite: false,
        draggable: true,
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
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });

    },
  };
})(jQuery, Drupal, this, this.document, drupalSettings);
