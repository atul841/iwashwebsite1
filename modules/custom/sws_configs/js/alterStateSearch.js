
jQuery(document).ready(function() {
  function renderStateList (){
    var searchTag = jQuery(".state-page-box").val();
    
    jQuery.ajax({
      url: "/state-approvals?title=" + searchTag,
      type: "GET",
      dataType: "json", // Expect JSON response
      success: function (response) {
        var html = ''; // Initialize a variable to store HTML content

        for (var i = 0; i < response.length; i++) {
          var state = response[i];
          // Customize the HTML structure to display the JSON data
          html += '<div class="all-states-list">';
          html += '<a href="' + state.URL + '">' ;
          html += '<div class="state-list-wrapper">';
          html += '<div class="state-data">';
          html += '<div class="all-states">';
          html += '<div class="state-left">';
          html += '<span> State </span>';
          html += '<h2>Government of <br> ' + state.Title + ' </h2>';
          html += '</div>';
          html += '<div class="state-right">';
          html += '<img src="' + state.Image + '" alt="' + state.imageAlt + '" title="' + state.imageTitle + '">';
          html += '</div>';
          html += '<div class="redirection-button">' ;
          html += '</div>';
          html += '</div>';
          html += '</div>';
          html += '</div>';
          html += '</a>';
          html += '</div>';
        }
        
        // Update the DOM with the generated HTML
        jQuery('#state-data-container').html(html);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
  jQuery("#state-page").on('keyup', function (event, node) {
    renderStateList() ;
    
    // Empty search box on press enter.
    jQuery("input").on("keydown", function search(e) {
      if (e.keyCode == 13) {
        jQuery('.state-page-box').val('');
      }
    });
  });
    renderStateList();
});