(function ($, Drupal, window, document, drupalSettings) {
  "use strict";
  Drupal.behaviors.faqs = {
    attach: function (context, settings) {
      // Function calls.

      jQuery(document).ajaxSend(function (event, jqxhr, settings) {
        if (settings.url.indexOf("frontpage/autocomplete/search") > -1) {
          var approvalType = jQuery("input.approvals-search-box:focus").parents(".homepage-approvals-search").find("[data-drupal-selector='edit-select-approvals']").val();
          settings.url = settings.url + '&approvalType=' + approvalType;
          var urlSections = settings.url.split('&');
          if (urlSections[0] && urlSections[1]) {
            var newurl = urlSections[0] + '&' + urlSections[1];
          }
          settings.url = newurl;
        }
      });

      // Autocomplete Redirect url
      jQuery(".homepage-approvals-search").on('autocompleteselect', function (event, node) {
        dataLayer.push({ 'event': 'searchSuggestedApprovals', 'Approval Name': node.item.urlTitle });
        var url = '';
        if (node.item.approvalType == "centralApprovals") {
          localStorage.setItem("approvalsId", node.item.licenseId);
          url = '/portal/approval-details/' + node.item.ministryUrlTitle + '/' + node.item.departmentUrlTitle + '/' + node.item.urlTitle;
        }
        if (node.item.approvalType == "stateApprovals") {
          localStorage.setItem("approvalsId", node.item.licenseId);
          url = '/portal/approval-details/' + node.item.stateUrlTitle + '/' + node.item.authorityUrlTitle + '/' + node.item.urlTitle;
        }
        if (node.item.schemeUrl) {
          url = node.item.schemeUrl;
        }
        if (url) {
          window.open(url, '_blank');
        }
        jQuery("input").on("keydown", function search(e) {
          if (url && e.keyCode == 13) {
            window.open(url, '_blank');
            url = '';
            jQuery('.approvals-search-box').val('');
          }
          if (url && e.keyCode == 8) {
            url = '';
            jQuery('.approvals-search-box').val('');
          }
        });
      });

      jQuery("input").bind('keydown', function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });

      //Direct click

      jQuery('.approvals-search-box').autocomplete({
        select: showResult,
        change: showResult
        });
        function showResult(event, ui) { 
        jQuery('.button-green').click()
        }
        

      //added specific urls for approval types
      jQuery('.button-green').on('click', function (e) {
        var approvalVal = jQuery('.banner-content .approval-type').val();
        var redirectUrl = '';
        if(approvalVal == "centralApprovals"){
          redirectUrl = '/portal/approvalsandregistrations';
        }
        else if(approvalVal == "stateApprovals"){
          redirectUrl = '/state-list';
        }
        else if(approvalVal == "allSchemes"){
          redirectUrl = '/government-schemes';
        }
        window.open(redirectUrl, '_blank');
      });

      jQuery("#edit-select-approvals--2").on('change', function () {
        jQuery('.approvals-search-box').val('');
      });

      jQuery("#edit-select-approvals").on('change', function () {
        jQuery('.approvals-search-box').val('');
      });

    },
  };
})(jQuery, Drupal, this, this.document, drupalSettings);
