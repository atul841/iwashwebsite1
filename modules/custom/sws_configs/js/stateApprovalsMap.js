(function ($, Drupal, window, document, drupalSettings) {
  Drupal.behaviors.lazy_load = {
    attach: function (context, settings) {
      statesInfo = drupalSettings.statesInfo;
      var selectStateFromMap;
      var SelectedState;
      let $description;
      $description = jQuery(".description");
      // getStateName("Andhra Pradesh");
      // getStateLogo("Andhra Pradesh");

      

      

      jQuery('.enabled').click(clickedAnimation);

      jQuery('.india-map-details').on('mouseenter', function (e) {
        stopAutoAnim();
      });

      jQuery('.india-map').on('mouseenter', function (e) {
        stopAutoAnim();
      });

      jQuery('.state .left_side .state_box').on('mouseenter', function (e) {
        stopAutoAnim();
      });

      jQuery('.state .left_side').on('mouseleave', function (e) {
        startAutoAnim();
      });
      jQuery('.india-map').on('mouseleave', function (e) {
        startAutoAnim();
      });

      jQuery('.enabled').on('mouseenter', function (e) {
        mouseEneter(e);
      });

      jQuery('.india-map').on('mouseleave', function (e) {
        var _autoAnim = setTimeout(function () {
          clearTimeout(_autoAnim);
        }, 0);
      });

      

      var autoStart = null;
      var index = 0;

      function stopAutoAnim() {
        autoStart && clearInterval(autoStart);
      }

      function startAutoAnim() {
        stopAutoAnim();
        autoStart = setInterval(function () {
          var listOfStates = ['Uttar Pradesh (Lucknow)', 'IN-AP', 'IN-AR', 'IN-AS', 'IN-BR', 'IN-CH', 'IN-CT', 'IN-DD', 'IN-DL','IN-DN', 'IN-GA', 'IN-GJ', 'IN-HR', 'IN-HP', 'IN-JK', 'IN-JH', 'IN-KA', 'IN-KL', 'IN-LAD', 'IN-MP', 'IN-MH', 'IN-MN', 'IN-ML', 'IN-MZ', 'IN-NL', 'IN-OR', 'IN-PB', 'IN-PY', 'IN-RJ', 'IN-SK', 'IN-TN', 'IN-TG', 'IN-TR', 'IN-UP', 'IN-UT', 'IN-UP', 'IN-WB'];
         
          var listOfPaths = jQuery('.enabled');  
          listOfPaths.map(function (currentPath) {
            if (jQuery(listOfPaths[currentPath]).attr('id') === listOfStates[index]) {
              jQuery(listOfPaths[currentPath]).trigger('click');
              $description.addClass('active');
              $description.html(jQuery(this).attr('title'));
              mouseEneter(listOfPaths[currentPath]);
            }
          });
          index++;
          if (index >= listOfStates.length) {
            index = 0;
          }
        }, 5000);
      }

      // startAutoAnim(); 

  
      

  const stateContentMap = {
  "Andhra Pradesh":
    "iWash Hub\nMG Road, Vijayawada, Andhra Pradesh\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nMadhurawada, Visakhapatnam, Andhra Pradesh\n📞 8948310077\n⭐ 4.4/5",

  "Arunachal Pradesh":
    "iWash Hub\nGanga Market, Itanagar, Arunachal Pradesh\n📞 8948310077\n⭐ 4.3/5\n\n" +
    "iWash Hub\nNaharlagun Main Road, Arunachal Pradesh\n📞 8948310077\n⭐ 4.5/5",

  "Assam":
    "iWash Hub\nGS Road, Guwahati, Assam\n📞 8948310077\n⭐ 4.7/5\n\n" +
    "iWash Hub\nJorhat Central, Assam\n📞 8948310077\n⭐ 4.4/5",

  "Bihar":
    "iWash Hub\nFraser Road, Patna, Bihar\n📞 8948310077\n⭐ 4.7/5\n\n" +
    "iWash Hub\nBhagalpur Main Market, Bihar\n📞 8948310077\n⭐ 4.3/5\n\n" +
    "iWash Hub\nDarbhanga Tower Chowk, Bihar\n📞 8948310077\n⭐ 4.5/5",

  "Chhattisgarh":
    "iWash Hub\nPandri Market, Raipur, Chhattisgarh\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nNehru Nagar, Bilaspur, Chhattisgarh\n📞 8948310077\n⭐ 4.4/5",

  "Goa":
    "iWash Hub\nPanaji City Center, Goa\n📞 8948310077\n⭐ 4.8/5\n\n" +
    "iWash Hub\nMargao Market Road, Goa\n📞 8948310077\n⭐ 4.5/5",

  "Gujarat":
    "iWash Hub\nCG Road, Ahmedabad, Gujarat\n📞 8948310077\n⭐ 4.7/5\n\n" +
    "iWash Hub\n GF-11, Saamarth, Heaven 6, Opp. Radhey Greens 2,  koba , Gandhinagar, Gujarat \n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nAthwalines, Surat, Gujarat\n📞 8948310077\n⭐ 4.5/5",

  "Haryana":
    "iWash Hub\nSector 29, Gurugram, Haryana\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nSector 15, Faridabad, Haryana\n📞 8948310077\n⭐ 4.3/5",

  "Himachal Pradesh":
    "iWash Hub\nMall Road, Shimla, Himachal Pradesh\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nDharamshala Market, Himachal Pradesh\n📞 8948310077\n⭐ 4.2/5",

  "Jharkhand":
    "iWash Hub\nMain Road, Ranchi, Jharkhand\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nSteel Gate, Bokaro, Jharkhand\n📞 8948310077\n⭐ 4.4/5",

  "Karnataka":
    "iWash Hub\nWhitefield, Bengaluru, Karnataka\n📞 8948310077\n⭐ 4.7/5\n\n" +
    "iWash Hub\nIndiranagar, Bengaluru, Karnataka\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nGokulam, Mysuru, Karnataka\n📞 8948310077\n⭐ 4.4/5",

  "Kerala":
    "iWash Hub\nMG Road, Kochi, Kerala\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nKowdiar, Thiruvananthapuram, Kerala\n📞 8948310077\n⭐ 4.5/5",

  "Madhya Pradesh":
    "iWash Hub\nMP Nagar, Bhopal, Madhya Pradesh\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nVijay Nagar, Indore, Madhya Pradesh\n📞 8948310077\n⭐ 4.7/5",

  "Maharashtra":
    "iWash Hub\nAndheri East, Mumbai, Maharashtra\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nViman Nagar, Pune, Maharashtra\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nCivil Lines, Nagpur, Maharashtra\n📞 8948310077\n⭐ 4.3/5",

  "Manipur":
    "iWash Hub\nKeishampat, Imphal, Manipur\n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nThangal Bazar, Imphal, Manipur\n📞 8948310077\n⭐ 4.3/5",

  "Meghalaya":
    "iWash Hub\nPolice Bazar, Shillong, Meghalaya\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nLaitumkhrah, Shillong, Meghalaya\n📞 8948310077\n⭐ 4.4/5",

  "Mizoram":
    "iWash Hub\nZarkawt, Aizawl, Mizoram\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nChanmari, Aizawl, Mizoram\n📞 8948310077\n⭐ 4.3/5",

  "Nagaland":
    "iWash Hub\nKohima Main Town, Nagaland\n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nDimapur City Center, Nagaland\n📞 8948310077\n⭐ 4.6/5",

  "Odisha":
    "iWash Hub\nJanpath Road, Bhubaneswar, Odisha\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nLink Road, Cuttack, Odisha\n📞 8948310077\n⭐ 4.4/5",

  "Punjab":
    "iWash Hub\nSector 22, Chandigarh, Punjab\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nModel Town, Ludhiana, Punjab\n📞 8948310077\n⭐ 4.3/5",

  "Rajasthan":
    "iWash Hub\nMI Road, Jaipur, Rajasthan\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nRatanada, Jodhpur, Rajasthan\n📞 8948310077\n⭐ 4.2/5",

  "Sikkim":
    "iWash Hub\nMG Marg, Gangtok, Sikkim\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nNamchi Market, Sikkim\n📞 8948310077\n⭐ 4.4/5",

  "Tamil Nadu":
    "iWash Hub\nT Nagar, Chennai, Tamil Nadu\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nRS Puram, Coimbatore, Tamil Nadu\n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nKK Nagar, Madurai, Tamil Nadu\n📞 8948310077\n⭐ 4.5/5",

  "Telangana":
    "iWash Hub\nHitech City, Hyderabad, Telangana\n📞 8948310077\n⭐ 4.7/5\n\n" +
    "iWash Hub\nKompally, Hyderabad, Telangana\n📞 8948310077\n⭐ 4.4/5",

  "Tripura":
    "iWash Hub\nAgartala Main Market, Tripura\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nUdaipur Town, Tripura\n📞 8948310077\n⭐ 4.3/5",

  "Uttar Pradesh":
    "iWash Hub\nGomti Nagar, Lucknow, Uttar Pradesh\n📞 8948310077\n⭐ 4.8/5\n\n" +
    "iWash Hub\nSector 18, Noida, Uttar Pradesh\n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nCivil Lines, Prayagraj, Uttar Pradesh\n📞 8948310077\n⭐ 4.6/5",

  "Uttarakhand":
    "iWash Hub\nRajpur Road, Dehradun, Uttarakhand\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nHaldwani Market, Uttarakhand\n📞 8948310077\n⭐ 4.4/5",

  "West Bengal":
    "iWash Hub\nSalt Lake, Kolkata, West Bengal\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nHowrah Station Road, Howrah, West Bengal\n📞 8948310077\n⭐ 4.4/5",

  /* Union Territories */
  "Delhi":
    "iWash Hub\nConnaught Place, New Delhi\n📞 8948310077\n⭐ 4.8/5\n\n" +
    "iWash Hub\nDwarka Sector 10, New Delhi\n📞 8948310077\n⭐ 4.5/5",

  "Jammu and Kashmir":
    "iWash Hub\nLal Chowk, Srinagar\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nGandhi Nagar, Jammu\n📞 8948310077\n⭐ 4.4/5",

  "Ladakh":
    "iWash Hub\nLeh Market, Ladakh\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nKargil Main Road, Ladakh\n📞 8948310077\n⭐ 4.3/5",

  "Puducherry":
    "iWash Hub\nWhite Town, Puducherry\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nMG Road, Puducherry\n📞 8948310077\n⭐ 4.4/5",

  "Chandigarh":
    "iWash Hub\nSector 17, Chandigarh\n📞 8948310077\n⭐ 4.6/5\n\n" +
    "iWash Hub\nSector 35, Chandigarh\n📞 8948310077\n⭐ 4.5/5",

  "Dadra and Nagar Haveli and Daman and Diu":
    "iWash Hub\nDaman City Center\n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nSilvassa Market Road\n📞 8948310077\n⭐ 4.3/5",

  "Andaman and Nicobar Islands":
    "iWash Hub\nPort Blair Market\n📞 8948310077\n⭐ 4.5/5\n\n" +
    "iWash Hub\nAberdeen Bazaar, Port Blair\n📞 8948310077\n⭐ 4.4/5",

  "Lakshadweep":
    "iWash Hub\nKavaratti Island\n📞 8948310077\n⭐ 4.4/5\n\n" +
    "iWash Hub\nAgatti Island\n📞 8948310077\n⭐ 4.3/5"
};






function updateStateContent(stateName) {
  let content =
    stateContentMap[stateName] ||
    "Is state ke liye jankari jald hi available hogi.";

  // ✅ iWash Hub ko bold karo (safe – double bold nahi hoga)
  content = content
    .replace(/iWash Hub/g, "<strong>iWash Hub</strong>")
    .replaceAll("\n", "<br>");

  jQuery("#stateDescription").fadeOut(150, function () {
    jQuery(this).html(content).fadeIn(200);
  });
}



      function clickedAnimation() {
        jQuery('.IN-LD').find('.enabled').prev().removeClass('makeVisible');
        jQuery('.IN-LD').find('.enabled').removeClass('selected');
        jQuery(this).addClass('selected');
        jQuery(this).addClass('headfromarey');
        jQuery('.enabled.dis').removeClass('selected');
        jQuery(this).prev().addClass('makeVisible');
        jQuery(this).parent().siblings().find('.enabled').prev().removeClass('makeVisible');
        jQuery(this).parent().siblings().find('.enabled').removeClass('selected');
        selectStateFromMap = jQuery(this).attr('title');
        updateStateContent(selectStateFromMap); // 👈 ADD THIS
        var parent = document.querySelector('#selectState');
        var child1 = parent.querySelector('.selectBox-label');
        let obj = statesInfo.find(o => o.title.includes(selectStateFromMap));
        if (!obj) {
          jQuery(this).addClass("dis");
        }
        if (!jQuery(this).hasClass("dis")) {
          child1.innerText = selectStateFromMap;
        }
        else {
          jQuery(".description.active").text("Coming Soon");
        }

        jQuery('.state-name').html(selectStateFromMap);
        if (jQuery(this).attr('id') != 'IN-LD') {
          jQuery(this).parent().appendTo('#map-parent');
        }
        if (!jQuery(this).hasClass("dis")) {
          if(["IN-DN" , "IN-DD"].includes(jQuery(this).attr('id')))  {
            selectStateFromMap = "Dadra and Nagar Haveli and Daman and Diu"
          }
          getStateName(selectStateFromMap);
          getStateLogo(selectStateFromMap);
        }
      }

      function mouseEneter(e) {
        var id = (e.hasOwnProperty('currentTarget') && e.currentTarget.id) || jQuery(e).attr('id');
        var idElem = document.getElementById(id);
        var clientReact = idElem.getBoundingClientRect();
        var description = document.querySelector('.description');
        var descPosition = description.getBoundingClientRect();
        var isSmallState = shiftPositionObject[id] || 0;
        if(id === "IN-DN"){
          jQuery(description).css({
            left: "1081px",
            top: "1921px",
          });
        }
         else if (id === "IN-DD") {
          jQuery(description).css({
            left: "861px",
            top: "1901px"
          });
         } 
        else {
          jQuery(description).css({
            left: clientReact.x + clientReact.width / 2 - descPosition.width / 2 - ((isSmallState && isSmallState.x) || isSmallState),
            top: document.documentElement.scrollTop + (clientReact.y - 110) - ((isSmallState && isSmallState.y) || isSmallState)
          });
        }
        
      }
        

      // Post API to get state id by passing state name.
      function getStateName(stateName) {
        SelectedState = stateName;
        jQuery.ajax({
          url: "/gateway/form-builder/state/fetch-by-name",
          type: "POST",
          data: JSON.stringify({
            'name': stateName,
          }),
          dataType: "json",
          contentType: "application/json",
          success: function (response) {
            if (response.data != null) {
              getStateApprovals(response.data.id);
            }
          },
          error: function (err) {
            console.log(err);
          }
        });
      }

      // // Post API to get state specific approvals by passing state id.
      function getStateApprovals(stateId) {
        jQuery.ajax({
          url: "/gateway/form-builder/marketplace/state-license-summary-list",
          type: "POST",
          data: JSON.stringify({
            "start": 0,
            "length": 20,
            "searchTag": "",
            "filters":
            {
              "state_id": [stateId],
              "authority_id": []
            }
          }),
          dataType: "json",
          contentType: "application/json",
          success: function (response) {
            var approvalBox = "";

            jQuery.each(response.data, function (key, valueObj) {
              var approvalUrlLink = "portal/approval-details";
              if (valueObj.stateUrlTitle) {
                approvalUrlLink += "/" + valueObj.stateUrlTitle;
              }
              if (valueObj.authorityUrlTitle) {
                approvalUrlLink += "/" + valueObj.authorityUrlTitle;
              }
              if (valueObj.urlTitle) {
                approvalUrlLink += "/" + valueObj.urlTitle;
              }
              approvalBox += `
                <div class="state_single">
                  <h3>${valueObj.authorityName}</h3>
                  <h4 class="show-read-more">${valueObj.licenseName}</h4>
                   <div class="stateHover">
                      <h3 class="pb5">${valueObj.authorityName}</h3>
                      <a href=" ${approvalUrlLink} " data-id=${valueObj.licenseId}>
                      <div class="h4outer">
                          <h4>${valueObj.licenseName}</h4>
                      </div>
                      </a>
                      <div class="button-group">
                           <a class="button" data-id=${valueObj.licenseId}>Add to Dashboard</a>
                      </div>
                  </div>
                </div>`;
            });

            // Data upto 3 line
            jQuery(document).ajaxComplete(function () {
              jQuery(".state_single h4").text(function (index, currentText) {
                var maxLength = 85;
                if (currentText.length >= maxLength) {
                  return currentText.substring(0, maxLength) + "...";
                } else {
                  return currentText
                }
              });
            });

            // Get state most popular approval count
            var approvalsAndAuthorities = document.getElementsByClassName('state-count');
            var stateRedirect;
            var searchIndex = statesInfo.findIndex((stateData) => stateData.title == SelectedState);
            jQuery(".selectBox-dropdown-menu .stateList:first-child a").attr("href", statesInfo[0]['urlAlias']);
            stateRedirect = statesInfo[searchIndex]['urlAlias'];
            approvalsAndAuthorities[0].innerHTML = response.count + ' ' + 'Approvals';
            approvalsAndAuthorities[1].innerHTML = `<a href=""> View All  Approvals</a>`;
            if (jQuery('#state').hasClass('slick-initialized')) {
              jQuery('#state').slick('unslick');
            }
            jQuery("#state").html(approvalBox);
            if (approvalBox.length) {
              getSlick();
              jQuery('.slick-slider').slick('setPosition');
            }
          },
          error: function (err) {
            console.log(err);
          },
        });
      }
      jQuery(document).ajaxComplete(function () {
        jQuery('.stateHover .h4outer h4').hover(function () {
          jQuery(this).first().once().append('<div class="exploreLinkBtn"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 58.665 58.652"> <path id="Shape_9_copy_5" data-name="Shape 9 copy 5" class="cls-1" d="M1495.2,5545.758l-.3-.266a1.007,1.007,0,0,1,.047-1.544l2.142-1.681a1.007,1.007,0,0,1,1.281.029l.209.181a24.616,24.616,0,1,0-8.427-20.973h25.783l-9.338-7.328a1.006,1.006,0,0,1-.17-1.412l1.657-2.11a1.006,1.006,0,0,1,1.413-.17l15.654,12.285a1.375,1.375,0,0,1,0,2.165l-15.654,12.285a1.007,1.007,0,0,1-1.413-.171l-1.657-2.108a1.008,1.008,0,0,1,.17-1.414l9.336-7.326h-30.564a.029.029,0,0,1-.029-.029v-1.747c0-17.061,13.967-30.812,31-29.851a29.326,29.326,0,1,1-21.146,51.185Z"transform="translate(-1485.338 -5494.526)"/></svg> </div>');
        }, function () {
          jQuery(this).first().once().children('.exploreLinkBtn').remove();
        });
      });
       
      // Get API to get state specific logo.
      function getStateLogo(stateName) {
        jQuery.ajax({
          url: "/api/get-state-logo/" + stateName,
          type: "GET",
          success: function (response) {
            if (response.length) {
              jQuery('.state-logo').html('<img src= "' + response[0].Image + '" width="80" height="80"  alt="state-logo"/>');
            }
          },
          error: function (err) {
            console.log(err);
          },
        });
      }

      // Slick initialised for state approvals.
      function getSlick() {
        jQuery('#state').slick({
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 767,
              settings: "unslick",
            }
          ]
        });
      }

      jQuery('#mySelect').on('change', function () {
        var link = jQuery(this).val();
        localStorage.setItem('stateLink', link);
        getStateName(this.value);
        selectStateFromMap = this.value;
        jQuery(this).addClass('selected');
        var searchIndex = statesInfo.findIndex((stateData) => stateData.value == SelectedState);
        window.location = statesInfo[searchIndex]['urlAlias'];
      }); 
         

       



      if ('IntersectionObserver' in window) {
        // IntersectionObserver initialization code
        const mapBlock = document.querySelectorAll("#block-stateapprovalsmap");
        const blockOptions = {
          root: null,
          threshold: 0.5
        };
        const mapObserver = new IntersectionObserver((entries, mapObserver) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              return;
            }
            else {
              getStateName(statesInfo[0]['title']);
              getStateLogo(statesInfo[0]['title']);
              startAutoAnim();
              mapObserver.unobserve(entry.target);
            }
          })
        }, blockOptions)
        mapBlock.forEach(image => {
          var b = mapObserver.observe(image);
        })

      } else {
        // make lazy loading elements to be loaded right away
        getStateName(statesInfo[0]['title']);
        getStateLogo(statesInfo[0]['title']);
        startAutoAnim();
      }

    }
  }
})(jQuery, Drupal, this, this.document, drupalSettings);


jQuery(document).ready(function () {
  jQuery('#mySelect').on('change', function () {
    const selectedText = jQuery(this)
      .find('option:selected')
      .text()
      .trim();

    const selectedVal = jQuery(this).val();

    if (selectedVal !== '')  { 
      jQuery('.state-name').text(selectedText);
      jQuery('.state-info-card').stop(true, true).fadeIn(200);
    } else {
      jQuery('.state-info-card').fadeOut(200);
    }
  });
});



