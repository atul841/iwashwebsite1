(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.investindia = {
    attach: function (context, settings) {

      jQuery(document).ready(function () {
        jQuery('#explore').slick({
          infinite: false,
          // slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 2,
          rows: 2,
          vertical: true,
          verticalSwiping: true,
          responsive: [
            {
              breakpoint: 767,
              settings: "unslick",
            }
          ]
        });

        // Data upto 3 line
        if (jQuery('.explore_single').length) {
          jQuery(".explore_single h4").text(function (index, currentText) {
            var maxLength = 110;
            if (currentText.length >= maxLength) {
              return currentText.substring(0, maxLength) + "...";
            } else {
              return currentText
            }
          });
        }

        jQuery('.exploreHover .h4outer h4').hover(function () {
          jQuery(this).first().append('<div class="exploreLinkBtn"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 58.665 58.652"> <path id="Shape_9_copy_5" data-name="Shape 9 copy 5" class="cls-1" d="M1495.2,5545.758l-.3-.266a1.007,1.007,0,0,1,.047-1.544l2.142-1.681a1.007,1.007,0,0,1,1.281.029l.209.181a24.616,24.616,0,1,0-8.427-20.973h25.783l-9.338-7.328a1.006,1.006,0,0,1-.17-1.412l1.657-2.11a1.006,1.006,0,0,1,1.413-.17l15.654,12.285a1.375,1.375,0,0,1,0,2.165l-15.654,12.285a1.007,1.007,0,0,1-1.413-.171l-1.657-2.108a1.008,1.008,0,0,1,.17-1.414l9.336-7.326h-30.564a.029.029,0,0,1-.029-.029v-1.747c0-17.061,13.967-30.812,31-29.851a29.326,29.326,0,1,1-21.146,51.185Z"transform="translate(-1485.338 -5494.526)"/></svg> </div>');
        }, function () {
          jQuery(this).first().children('.exploreLinkBtn').remove();
        });

        jQuery(document).on(
            "click","#explore .h4outer h4" ,
            function(e){
              e.preventDefault();
              dataLayer.push({
                'event': 'Central_View_Details',
                'approvalName': jQuery(e.target).parents('.explore_single').find('> h4').text()
                });
                window.location.href = jQuery(e.target).parents('.explore_single').find('a.button.addapproval').attr('href')
            }
          )

        jQuery(document).on(
          "click","#explore a.button.addapproval" ,
          function(e){
            e.preventDefault();
            dataLayer.push({
              'event': 'Central_View_Details',
              'approvalName': jQuery(e.target).parents('.explore_single').find('> h4').text()
              });
              window.location.href = jQuery(e.target).parents('.explore_single').find('a.button.addapproval').attr('href')
          }
        )
        jQuery(document).on(
          "click","#explore .button-outline" ,
          function(e){
            e.preventDefault();
            dataLayer.push({
              'event': 'Add In Dashboard',   
              'approvalName': jQuery(e.target).parents('.explore_single').find('> h4').text()
              });
          }
        )

        jQuery('.explore_single .exploreHover .button-group .button.addapproval').hover(function () {
          var offsetButton = jQuery(this).offset();
          if (jQuery(this).hasClass('disabled')) {
            jQuery('.tooltip-crf').show();
            jQuery('.tooltip-crf').css('top', offsetButton.top - 1100);
            jQuery('.tooltip-crf').css('left', offsetButton.left - 100);
          }
        }, function () {
          jQuery('.tooltip-crf').hide();
        });
      });

    }
  }
})(jQuery, Drupal, this, this.document);





