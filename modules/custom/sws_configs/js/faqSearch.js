jQuery("#faqs-new-search").on('autocompleteselect', function (event, node) {

  // Show dialogue.
  jQuery('<div class="faq-dialog" id="faq-dialog"></div>').dialog({
    modal: true,
    title: "Faq Details",
    open: function () {
      jQuery('#faq-dialog').html(node.item.desc);
    }
  });

  // Empty search box on press enter.
  jQuery("input").on("keydown", function search(e) {
    if (e.keyCode == 13) {
      jQuery('.faqs-search-box').val('');
    }
  });
});