(function ($, Drupal, window, document, drupalSettings) {
  'use strict';
  Drupal.behaviors.pages = {
    attach: function (context, settings) {
      jQuery(".tabs, .tabs .tab-content").tabs();
    },
  };
})(jQuery, Drupal, this, this.document, drupalSettings);
