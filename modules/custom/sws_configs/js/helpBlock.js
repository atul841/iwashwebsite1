jQuery(document).ready(function () {
  jQuery(document).ajaxComplete(function () {
    jQuery('.sector-outer .sectors .left_side .views-exposed-form').appendTo('.sector-outer .sectors .left_side .heading-select');
  });
  jQuery('#icon-wrapper-inner').slick({
    infinite: false,
    // slidesToShow: 4,
    slidesToScroll: 1,
    rows: 3,
    slidesPerRow: 4,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 12,
        }
      },
      {
        breakpoint: 767,
        settings: "unslick",
      }
    ]
  });
  jQuery('#sector-wrapper').slick({
    infinite: false,
    slidesToShow: 2.6,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
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
});




