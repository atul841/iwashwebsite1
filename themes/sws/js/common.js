(function ($, Drupal, window, document, drupalSettings) {
  "use strict";
  var executedOnce = false;

  Drupal.behaviors.common = {
    attach: function (context, settings) {
      const cartList = JSON.parse(sessionStorage.getItem("cartList"));
      localStorage.removeItem("investorKyaData");
      // Function calls.
      if (!executedOnce) {
        loader();
        lazyLoadImages();
        clock();
        addNofollowBlank();
        addActiveClass();
        confirmationPopup();
        loginTokenExists();
        searchAllApprovals();
        slickAboutUs();
        headerResponse();
        faqsAccordian();
        myPopupFunction();
        attachChatWidgetListeners();
        executedOnce = true;
      }

      //Wow Animation
      // new WOW().init();

      // Show NSWS loader.
      function loader() {
        jQuery(".loader-wrapper").hide();
      }

      // Lazyload background images.
      function lazyLoadImages() {
        var lazyBackgrounds = [].slice.call(
          document.querySelectorAll(".lazy-background")
        );
        if ("IntersectionObserver" in window) {
          // IntersectionObserver initialization code
          const images = document.querySelectorAll("[data-src]");
          function preloadImage(img) {
            const src = img.getAttribute("data-src");
            if (!src) {
              return;
            }
            img.src = src;
          }
          const imagOptions = {
            root: null,
            threshold: 0.5,
            effect: "fadeIn",
          };
          const imgObserver = new IntersectionObserver(
            (entries, imgObserver) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                  return;
                } else {
                  preloadImage(entry.target);
                  imgObserver.unobserve(entry.target);
                }
              });
            },
            imagOptions
          );
          images.forEach((image) => {
            var b = imgObserver.observe(image);
          });

          let lazyBackgroundObserver = new IntersectionObserver(function (
            entries,
            observer
          ) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                lazyBackgroundObserver.unobserve(entry.target);
              }
            });
          });

          lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
          });
        } else {
          // make lazy loading elements to be loaded right away
          const images = document.querySelectorAll("[data-src]");

          Object.keys(images).forEach((key) => {
            jQuery(images[key]).attr(
              "src",
              jQuery(images[key]).attr("data-src")
            );
          });

          Object.keys(lazyBackgrounds).forEach((key) => {
            jQuery(lazyBackgrounds[key]).addClass("visible");
          });
        }
      }

      // Background image Lazy Load for banner
      if (jQuery('.banner-home .banner-img-video.lazy-background').length) {
        var imageUrls = jQuery('.bg-lazyLoading').text();

        // Changes in css class
        function callback(mutationList, observer) {
          mutationList.forEach(function (mutation) {
            jQuery('.banner-home .banner-img-video.lazy-background.visible video source').attr('src', imageUrls);
          })
        }
        const contact = document.querySelector('.banner-home .banner-img-video.lazy-background');
        const options = { attributes: true };
        const observer = new MutationObserver(callback);
        observer.observe(contact, options);
      }

      // Background image Lazy Load for schemes and explore
      if (jQuery('.govt-scheme .left_side.lazy-background,.explore.lazy-background').length) {
        var imageUrls = jQuery('.bg-lazyLoading-img').text();
        var imageUrl2 = jQuery('.bg-lazyLoading2').text();

        // Changes in css class
        function callback(mutationList, observer) {
          mutationList.forEach(function (mutation) {
            jQuery('.govt-scheme .left_side.lazy-background.visible .chakra img').attr('src', imageUrls);
            jQuery('.explore.lazy-background.visible .img-bg').attr('src', imageUrl2);
          })
        }
        const govtScheme = document.querySelector('.govt-scheme .left_side.lazy-background');
        const explorebg = document.querySelector('.explore.lazy-background');
        const options = { attributes: true };
        const observer = new MutationObserver(callback);
        observer.observe(govtScheme, options);
        observer.observe(explorebg, options);

      }
      // Show live Clock.
      function clock() {
        if (document.querySelector("div.clock-right")) {
          setInterval(() => {
            let monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let date = new Date();
            let place = String(date).split(/[{()}]/g);
            let month = monthNames[date.getMonth()];
            let day = date.getDate();
            let year = date.getFullYear();
            let days = dayNames[date.getDay()];
            let hours = date.getHours();
            if (place[1] == "India Standard Time") {
              place[1] = "IST";
            }
            let minutes =
              date.getMinutes() >= 10
                ? date.getMinutes()
                : "0" + date.getMinutes();
            let seconds =
              date.getSeconds() >= 10
                ? date.getSeconds()
                : "0" + date.getSeconds();
            document.querySelector("div.clock-right").innerHTML =
              '<p class="time-wrap sensex-box-cont"><span class="date">' +
              days +
              ", " +
              day +
              " " +
              month +
              " " +
              year +
              '</span><span class="time"><span class="current-time">' +
              hours +
              ":" +
              minutes +
              ":" +
              seconds +
              "</span><span class='ist'>" +
              place[1] +
              "</span></span></span></p>";
          }, 1000);
        }
      }

      // No Follow And Target Blank To External Links.
      function addNofollowBlank() {
        jQuery("body a").each(function (index, value) {
          var aLink = jQuery(this).attr("href");
          if (aLink) {
            var hasHTTP = aLink.match(/^http:/);
            var hasHTTPS = aLink.match(/^https/);
            var hasSwsLink = aLink.match(
              /^http(s)?:\/\/(dev-nsws\.investindia|qa-nsws\.investindia|www\.ppe\.nsws|www\.nsws)(\.)?(gov)?(\.)?(in)/
            );
            var hasNoFollow = jQuery(this).attr("rel");
            var hasTarget = jQuery(this).attr("target");
            if (hasHTTP || hasHTTPS) {
              if (!hasSwsLink) {
                if (!hasNoFollow) {
                  jQuery(this).attr("rel", "nofollow");
                }
                if (!hasTarget) {
                  jQuery(this).attr("target", "_blank");
                }
              }
            }
          }
        });
      }

      // Add active class to main navigation by checking current url.
      function addActiveClass() {
        var anchors = jQuery(".navbar ul").find("a");
        jQuery.each(anchors, function (key, value) {
          var url = jQuery(value).attr("href");
          if (window.location.pathname == url) {
            jQuery(value).addClass("is-active");
          }
        });
      }

      // Show disclaimer before redirecting to external links.
      var googleanalytics = {

      }
      function confirmationPopup() {
        // Open disclaimer box for external links
        var gethref;
        jQuery("body a").on("click", function (e) {
          if (jQuery(this).hasClass('no-ex-link')) {
            jQuery(".ui-widget.ui-widget-content.ui-front.ui-dialog-buttons").css("display", "none", "important");
          }
          var datalayer_obj;
          if (jQuery(this).parents(".ministry-slick").length) {
            datalayer_obj = {
              event: "Footer - Ministry First Click",
              "Ministry Name": jQuery(this).children().attr("title"),
            }
            dataLayer.push(datalayer_obj);
            googleanalytics = datalayer_obj;
            googleanalytics.event = googleanalytics.event.replace('First', 'Confirm');
          } else if (jQuery(this).parents(".state-slick").length) {
            datalayer_obj = {
              event: "Footer - State First Click",
              "State Name": jQuery(this).children().attr("title"),
            }
            dataLayer.push(datalayer_obj);
            googleanalytics = datalayer_obj;
            googleanalytics.event = googleanalytics.event.replace('First', 'Confirm');
          }

          document
            .getElementById("confirmation-dialog")
            .style.setProperty("display", "block", "important");
          var aLink = jQuery(this).attr("href");
          if (aLink) {
            var hasHTTP = aLink.match(/^http:/);
            var hasHTTPS = aLink.match(/^https/);
            var hasSwsLink = aLink.match(
              /^http(s)?:\/\/(dev-nsws\.investindia|qa-nsws\.investindia|www\.ppe\.nsws|www\.nsws)(\.)?(gov)?(\.)?(in)/
            );
            gethref = jQuery(this).attr("href");
            if (
              hasHTTP ||
              (hasHTTPS && !aLink.match(/(nodal-authority|nsws-mnstrportal)/gm))
            ) {
              if (!hasSwsLink) {
                e.preventDefault();
                jQuery("#confirmation-dialog").dialog("open");
                jQuery('body').css('overflow', 'hidden');
              }
            }
          } else {
            e.preventDefault();
          }
        });

        // Redirect to external links
        jQuery("#confirmation-dialog").dialog({
          autoOpen: false,
          modal: true,
          buttons: [
            {
              class: "butt-2",
              text: "Cancel",
              click: function () {
                jQuery(this).dialog('close');
                jQuery('body').css('overflow', 'auto');
              }
            },
            {
              text: "Confirm",
              click: function () {
                window.open(gethref, "_blank");
                console.log(jQuery(this).parent())
                dataLayer.push(googleanalytics);
                jQuery(this).dialog("close");
                jQuery('body').css('overflow', 'auto');
              },
            },
          ],
        });
        jQuery('.ui-dialog .ui-dialog-titlebar-close').click(function () {
          jQuery('body').css('overflow', 'auto');
        });
      }

      // Add MyProfile/Signout block if login token exists.
      function loginTokenExists() {
        if (localStorage.getItem("userDTO")) {
          const user = JSON.parse(localStorage.getItem("userDTO"));
          // jQuery.ajax({
          //     type: 'POST',
          //     url: 'https://uat-nsws.investindia.gov.in/gateway/form-builder/marketplace/user-cart',
          //     contentType: 'application/json',
          //     data: JSON.stringify({ "username": user.email }),
          //     dataType: "json",
          //     success: function (responce) {
          //       if (responce.data.approvalCount !== 0) {
          //         jQuery('.header_main_section .header_section .cart-icon a, .header_main_section .header_section .mobile-icon a.cart').prepend(`<span class="count">${responce.data.approvalCount}</span>`);
          //       }
          //     },
          //     error: function (err) {
          //       console.log(err);
          //     }
          //   });
          jQuery(".header_main_section .dashboard-btn").show();
          jQuery(".user-info-header").show();
          jQuery(".header_main_section #login-block").hide();
          jQuery(".login-mobile").hide();
          // jQuery('.login-bottom-mobile strong').text("Dashboard");
          // jQuery('.login-bottom-mobile a').attr('href', '/portal/investor-dashboard/dashboard');
          // jQuery('.login-bottom-mobile a').prepend("<span class='cart-count'>0</span>");
          // jQuery('.login-bottom-mobile .header-login-dropdown').remove();
          jQuery(".header_main_section .mobile-icon .login-icon ").hide();
          jQuery(".header_main_section .mobile-icon .register-icon ").hide();
          jQuery(".header_main_section .login-section .login-btn .name").text(
            user.name
          );
          jQuery(".header_main_section .cart-icon").show();
          let isAdmin = user.permission.includes("Admin_Dashboard_FE_View");
          if (isAdmin) {
            jQuery(".btn-dashboard a").attr("href", "/portal/admin-dashboard");
            jQuery(
              ".header_main_section .header_section .cart-icon a, .header_main_section .header_section .mobile-icon a.cart"
            ).hide();
          }
          getMinistryNotification(user.swsId);
        } else {
          jQuery(".header_main_section .dashboard-btn").hide();
          //jQuery('.dashboard-mobile-menu').hide();
          // jQuery('.login-mobile').show();
          jQuery(".user-info-header").hide();
          jQuery(".header_main_section .login-section ").hide();
          jQuery(".header_main_section .mobile-icon .login-icon ").show();
          jQuery(".header_main_section .mobile-icon .register-icon ").show();
          jQuery(".header_main_section .mobile-icon .notify ").hide();
          //tabindex
          if (cartList && cartList.length !== 0) {
            jQuery(
              ".header_main_section .header_section .cart-icon a, .header_main_section .header_section .mobile-icon a.cart"
            ).prepend(`<span class="count">${cartList.length}</span>`);
          }
        }
      }

      // Show ministry notifications.
      function getMinistryNotification(swsId) {
        var refinedData = {};
        var htmlObject = "";
        jQuery.ajax({
          url: "/gateway/admin/conversation/unread/" + swsId,
          method: "GET",
          async: false,
          success: function (result) {
            if (result.status) {
              var notificationList = result.data;
              console.log(notificationList);
              if (!result.data.length) {
                htmlObject =
                  '<div class="no-notification"> No Notification, You Are All Caught Up.</div>';
              } else {
                var element = document.getElementById("myDiv");
                element.classList.add("count");
                jQuery(".approvals-count").append(notificationList.length);
                jQuery.each(notificationList, function (key, val) {
                  if (!refinedData[val.projectName]) {
                    refinedData[val.projectName] = [];
                  }
                  let fullMessageObject;
                  try{
                    fullMessageObject = JSON.parse(val.fullMessage)
                  }
                  catch(e){
                    fullMessageObject = {};
                    console.log(e)
                  }
                  var tempList = {
                    subject: val.subject,
                    fullMessage: fullMessageObject,
                  };
                  refinedData[val.projectName].push(tempList);

                });
                htmlObject += '<div class="notifications-box">';
                jQuery.each(refinedData, function (key, value) {
                  htmlObject +=
                    '<div class="notification"><h2>' +
                    key +
                    "</h2><h4>You have received a clarification request on your application for:</h4><ul class='notification-list'>";
                  jQuery.each(value, function (subkey, content) {
                    htmlObject +=
                      "<li>" +
                      content.subject +
                      ":" +
                      content.fullMessage.message +
                      "</li>";
                  });
                  htmlObject += "</ul></div>";
                });
                htmlObject += "</div>";
              }
            } else {
              htmlObject = "NO NOTIFICATION. YOU ARE ALL CAUGHT UP.";
            }
            jQuery(".popuptext").append(htmlObject);
          },
          error: function (request) {
            console.log("Error Occured with status: " + request.status);
          },
        });
      }

      
    

        var maxLength = 300;
        $(".notification-list li").each(function () {
          var myStr = $(this).text();
          if (myStr.length > maxLength) {
            var newStr = myStr.substring(0, maxLength);
            var removedStr = myStr.substring(maxLength, myStr.length);
            $(this).empty().html(newStr);
            $(this).append(
              ' <a href="javascript:void(0);" class="read-more">Show more</a>'
            );
            $(this).append('<span class="more-text">' + removedStr + "</span>");
          }
        });
        $(".read-more").on("click", function () {
          readMore($(this))
        });
        function readMore($this){
          $($this).siblings(".more-text").contents().unwrap();
          
         $($this).parent('li').append(
          ' <a href="javascript:void(0);" class="read-less">Show less</a>'
        );
          $(".read-less").on("click", function () {
            readLess($(this))
          });
          $($this).remove();
        }
        function readLess($this){
          // let updatedContent = $($this).parent('li').text()
          var myStr = $($this).parent("li").text();
            if (myStr.length > maxLength) {
              var newStr = myStr.substring(0, maxLength);
              var removedStr = myStr.substring(maxLength, myStr.length).toString().replaceAll(/Show less/g,'');
              console.log(removedStr)
              $($this).parent("li").empty().html(newStr).append(
                ' <a href="javascript:void(0);" class="read-more">Show more</a>'
              ).append('<span class="more-text">' + removedStr.toString().replaceAll(/Show less/g,'') + "</span>");
            } 
            $(".read-more").on("click", function () {
              readMore($(this))
            });
        }
    



      // Show notification popup.
      function myPopupFunction() {
        jQuery(".popup").on("click", function (e) {
          var popup = document.getElementById("myPopup");
          popup.classList.toggle("show");
          jQuery(document).on("click", function (event) {
            if (
              jQuery(event.target).parents(".popuptext")
                .length === 0 && jQuery(event.target).parents(".anticon-bell").length === 0 
            ) {
              jQuery(".popuptext").removeClass("show");
            }
          });
        });
        jQuery(".popuptext").on("click", function (e) {
          e.preventDefault()
          e.stopPropagation()
        });
        jQuery(".close-icon").on("click", function (e) {
          jQuery(".popup").trigger("click");
        });

      }

      // Search all approvals.
      function searchAllApprovals() {
        jQuery("#approval-search, #approval-search-mobile").on(
          "input",
          function (e) {
            jQuery("#approval-search, #approval-search-mobile").autocomplete({
              source: function (request, response) {
                jQuery.ajax({
                  type: "POST",
                  url: "/gateway/form-builder/marketplace/license-summary-list",
                  contentType: "application/json",
                  data: JSON.stringify({
                    start: 0,
                    length: 20,
                    searchTag: e.target.value,
                    sortBy: "name",
                    filters: { ministry_id: [], department_id: [] },
                  }),
                  dataType: "json",
                  success: function (data) {
                    jQuery("input.suggest-user").removeClass(
                      "ui-autocomplete-loading"
                    );
                    response(
                      jQuery.map(data.data, function (item) {
                        return {
                          label: item.licenseName,
                          value: item.licenseName,
                          id: item.licenseId,
                        };
                      })
                    );
                  },
                  error: function (data) {
                    jQuery("input.suggest-user").removeClass(
                      "ui-autocomplete-loading"
                    );
                  },
                });
              },
              select: function (event, ui) {
                dataLayer.push({
                  event: "searchSuggestedApprovals",
                  approvalName: ui.item.value,
                });
                var approvalId = ui.item ? ui.item.id : 0;
                const url = "/portal/approvaldetails/" + approvalId;
                window.open(url, "_blank");
              },
              appendTo: jQuery(this).parent(".autocomplete")[0],
            });
          }
        );

        jQuery(
          ".header_main_section .header_section .search-icon, .header_main_section .header_section .mobile-icon .search,.header-menu-sticky li a.search-icon"
        ).on("click", function (e) {
          jQuery("#approval-search").val("");
          jQuery("#approval-search-mobile").val("");
        });
      }

      //Slick in about us section
      function slickAboutUs() {
        jQuery("#central-department, #state-department")
          .not(".slick-initialized")
          .slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 550,
                settings: {
                  slidesToShow: 2,
                },
              },
            ],
          });

        jQuery("#ministry-association")
          .not(".slick-initialized")
          .slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 555,
                settings: {
                  slidesToShow: 1,
                },
              },
            ],
          });

        jQuery("#state-association")
          .not(".slick-initialized")
          .slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 555,
                settings: {
                  slidesToShow: 2,
                },
              },
            ],
          });
        jQuery("#ministry-slick").slick({
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: "unslick",
            },
          ],
        });
        jQuery("#state-slick").slick({
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: "unslick",
            },
          ],
        });
      }

      // Responsive header.
      function headerResponse() {
        var animation = "rubberBand";
        jQuery(
          ".header_main_section .header_section .approvals-count:empty"
        ).hide();
        jQuery(".header_main_section .header_section .mobile-icon .icon").on(
          "click",
          function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery(
              ".header_main_section .header_section .mobile-icon .icon"
            ).toggleClass("icon--active");
            jQuery(".header_top_section .right_panel .navbar").toggleClass(
              "open"
            );
            jQuery(".icon").attr("tabindex", "2");
            jQuery(".navbar.open .list-item.menu-dropdown").attr(
              "tabindex",
              "1"
            );
            jQuery(".icon--active").attr("tabindex", "3");
            jQuery("li").attr("tabindex", "0");
            jQuery("body").toggleClass("body-overflow-hidden");
            jQuery(this)
              .addClass("animated " + animation)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                  jQuery(this).removeClass("animated " + animation);
                }
              );
          }
        );

        jQuery(
          ".header_main_section .header_section .search-icon, .header_main_section .header_section .mobile-icon .search,.header-menu-sticky li a.search-icon"
        ).on("click", function (e) {
          jQuery(".header_main_section .header_section .search-box").toggle();
          jQuery(".header-menu-sticky li .st-dropdown").hide();
          jQuery(".search-box .search-input").focus();

          jQuery(".header_main_section .header_section .navbar").toggleClass(
            "nav-search"
          );
          jQuery(
            ".header_main_section .header_section .search-icon"
          ).toggleClass("search-close");
          jQuery(
            ".header_main_section .header_section .mobile-icon"
          ).toggleClass("search-open");
          return false;
        });
        jQuery(".header-menu-sticky li .st-close").on("click", function (e) {
          jQuery(".header-menu-sticky li .st-dropdown").hide();
        });
        //Mob St Menu
        jQuery(".header-menu-sticky li .st-scheme").on("click", function (e) {
          jQuery(this).next().toggle();
          jQuery(this).parent().siblings().children(".st-dropdown").hide();
          jQuery(".search-box").hide();
          jQuery(
            ".header_main_section .header_section .search-icon"
          ).removeClass("search-close");
        });
        //approvals tabs
        jQuery("li").on("keydown", function (event) {
          if (event.which == 13) {
            jQuery(this).toggleClass("first-dropdown");
            if (jQuery("li").hasClass("first-dropdown")) {
              jQuery(".first-dropdown > .st-dropdown").css({
                visibility: "visible",
                transition: "max-height 0.2s ease-in",
                "max-height": "200px",
                opacity: "1",
              });
            } else {
              jQuery(".first-dropdown > .st-dropdown").attr("style", "");
            }
            jQuery(
              ".first-dropdown > .st-dropdown > .st-dropdown-menu > li:last-child"
            ).on("keydown", function () {
              jQuery("li").removeClass("first-dropdown");
              jQuery(".st-dropdown").attr("style", "");
            });
          }
        });
        //login tab before user-login
        jQuery(".custom-dropmenu").on("keydown", function (event) {
          if (event.which == 13) {
            jQuery(".custom-dropmenu").toggleClass("login-info");
            if (jQuery(".custom-dropmenu").hasClass("login-info")) {
              jQuery(".login-info > .header-login-dropdown").css({
                visibility: "visible",
                transition: "max-height 0.2s ease-in",
                "max-height": "200px",
                opacity: "1",
                "z-index": "2",
                top: "42px",
              });
            } else {
              jQuery(".custom-dropmenu > .header-login-dropdown").attr(
                "style",
                ""
              );
            }
            jQuery("li:last-child").on("keydown", function () {
              jQuery(".custom-dropmenu > .header-login-dropdown").attr(
                "style",
                ""
              );
            });
          }
        });
        //login tab after user login
        jQuery(".dashboard-btn").on("keydown", function (event) {
          if (event.which == 13) {
            jQuery(".dashboard-btn").toggleClass("profile-details");
            if (jQuery(".dashboard-btn").hasClass("profile-details")) {
              jQuery(".profile-details > .header-dashboard-dropdown").css({
                display: "block",
                visibility: "visible",
                transition: "max-height 0.2s ease-in",
                "max-height": "200px",
                opacity: "1",
              });
            } else {
              jQuery(".dashboard-btn > .header-dashboard-dropdown").attr(
                "style",
                ""
              );
            }
            jQuery("li").attr("tabindex", "0");
            jQuery(
              ".header-dashboard-dropdown >.header-dashboard-inner > ul > li:last-child"
            ).on("keydown", function () {
              jQuery(".dashboard-btn > .header-dashboard-dropdown").attr(
                "style",
                ""
              );
            });
          }
        });
        //search bar close and open
        jQuery(".search-container").on("keydown", function (event) {
          jQuery(".button-green").attr("tabindex", "0");
          if (event.which == 13) {
            jQuery(".button-green ").on("keydown", function (event) {
              if (event.which == 9) {
                jQuery(".search-close").click();
              }
            });
          }
        });
        //notification
        jQuery(".profile-list > .list-content").attr("tabindex", "0");
        jQuery(".user-info-header").on("keydown", function (event) {
          if (event.which == 13) {
            if (jQuery(".notification").hasClass("notification")) {
              jQuery(".popuptext").css({
                animation: "fadeIn 1s",
                visibility: "visible",
                top: "44px",
                "z-index": "1",
                opacity: "1",
                "min-height": "50px",
              });
            }
            jQuery(".notification").on("keydown", function (event) {
              if (event.which == 9) {
                jQuery(".close-icon").click();
                jQuery(".popuptext").attr("style", "");
              }
            });
          }
        });
        jQuery(".language").on('keydown', function (event) {
          if (event.which === 13) {
            jQuery(".lang-hover").css({ display: "block" })
            jQuery(".lang-arrow").css({ display: "block" })
            jQuery(".language").on('keydown', function (event) {
              if (event.which === 9) {
                jQuery(".lang-hover").attr('style', "");
                jQuery(".lang-arrow").attr('style', "");
                jQuery(".icon--active").click();
                jQuery(".icon").attr("tabindex", "0");
              }

            })
          }
        })

        //side nav close after tab comes to notification icon
        jQuery(".mobile-icon > button").on("keydown", function (event) {
          if (event.which == 13) {
            if (localStorage.getItem("userDTO")) {
              jQuery(".user-profile").on("keydown", function (event) {
                jQuery(".icon--active").click();
                jQuery(".icon").attr("tabindex", "0");
              });
              // } else {
              //   jQuery(".language").on("keydown", function (event) {
              //     jQuery(".icon--active").click();
              //     jQuery(".icon").attr("tabindex", "0");
              //   });
            }
          }
        });
        // Header & Banner
        if ($(".banner-offset").length) {
          var bannerOffset = $(".banner-offset").offset().top;
        }
        // var headerTop = $('.header_top_section').outerHeight();
        $(window).scroll(function () {
          //Header sticky
          if ($(window).scrollTop() >= 42) {
            $(".header_main_section").addClass("sticky");
            $("body").css("padding-top", "76px");
          } else {
            $(".header_main_section").removeClass("sticky");
            $("body").css("padding-top", "");
          }
        });
        if (jQuery(window).width() > 1199) {
          jQuery(window).scroll(function () {
            //OffSet Banner for Header Search Icon
            if (jQuery(window).scrollTop() >= bannerOffset + 1) {
              jQuery("body.path-frontpage").addClass("search-display");
            } else {
              jQuery("body.path-frontpage").removeClass("search-display");
              jQuery(".path-frontpage .navbar").removeClass("nav-search");
              jQuery(".path-frontpage .search-icon").removeClass(
                "search-close"
              );
              jQuery(".path-frontpage .search-box").hide();
            }
          });
        }

        // resize by AA+
        // jQuery('.header_top_section .right_panel .navbar >ul >li:nth-last-child(2)').html("<div class='font-action'><img src='themes/sws/assets/images/font-incdec.svg' width='18px' alt/><div>");
        // jQuery('.header_top_section .right_panel .navbar >ul >li span.decrease-font').hide();
        jQuery(".font-action").attr("tabindex", "0");
        let baseFontSize = 16;
        if (!sessionStorage.getItem("currentFontSize")) {
          sessionStorage.setItem("currentFontSize", baseFontSize.toString());
          jQuery("html").css({ "font-size": baseFontSize });
        } else {
          let currentFontSize = parseInt(
            sessionStorage.getItem("currentFontSize")
          );
          jQuery("html").css({ "font-size": currentFontSize });

          if (
            currentFontSize === 16 ||
            currentFontSize === 17 ||
            currentFontSize === 18
          ) {
            jQuery(
              ".header_top_section .right_panel .navbar >ul >li span.increase-font"
            ).show();
            jQuery(
              ".header_top_section .right_panel .navbar >ul >li span.decrease-font"
            ).hide();
          } else if (currentFontSize === 19) {
            jQuery(
              ".header_top_section .right_panel .navbar >ul >li span.increase-font"
            ).hide();
            jQuery(
              ".header_top_section .right_panel .navbar >ul >li span.decrease-font"
            ).show();
          }
        }

        //font size dec/inc by tabs
        jQuery(".font-action").on("keydown", function (event) {
          //for increment
          var currentFontSize = parseInt(
            jQuery(this).parents("html").css("font-size")
          );
          if (
            currentFontSize === 16 ||
            currentFontSize === 17 ||
            currentFontSize === 18
          ) {
            jQuery("html").css({ "font-size": currentFontSize + 1 });
            sessionStorage.setItem("currentFontSize", currentFontSize + 1);
          }
          //for decrease
          else if (currentFontSize === 19) {
            jQuery("html").css({ "font-size": baseFontSize });
            sessionStorage.setItem("currentFontSize", baseFontSize.toString());
          }
        });
        jQuery(
          ".header_top_section .right_panel .navbar >ul >li:nth-last-child(2)"
        ).on("click", function () {
          let currentFontSize = parseInt(
            jQuery(this).parents("html").css("font-size")
          );
          if (currentFontSize === 16 || currentFontSize === 17) {
            jQuery("html").css({ "font-size": currentFontSize + 1 });
            sessionStorage.setItem("currentFontSize", currentFontSize + 1);
          } else if (currentFontSize === 18) {
            jQuery("html").css({ "font-size": currentFontSize + 1 });
            sessionStorage.setItem("currentFontSize", currentFontSize + 1);
          }
        });

        jQuery(
          ".header_top_section .right_panel .navbar >ul >li:nth-last-child(2)"
        ).on("click", function () {
          const currentFontSize = parseInt(
            jQuery(this).parents("html").css("font-size")
          );
          if (currentFontSize === 19) {
            jQuery("html").css({ "font-size": baseFontSize });
            sessionStorage.setItem("currentFontSize", baseFontSize.toString());
          }
        });
      }

      // Faqs Accordian.
      function faqsAccordian() {
        jQuery("#faqaccordian, .faq-lists").accordion({
          collapsible: true,
          animate: { duration: 50 },
        });
        const scrollDiv = document.querySelectorAll(".ui-accordion-content");
        var ps;
        for (var i = 0; i < scrollDiv.length; i++) {
          ps = new PerfectScrollbar(scrollDiv[i]);
        }
      }

      // Scroll to top.
      jQuery("#to-top").on("click", function () {
        window.scrollTo(0, 0);
      });

      //Search common
      if (document.getElementById("submitSearchForm")) {
        document
          .getElementById("submitSearchForm")
          .addEventListener("submit", submitSearch);
      }
      function submitSearch() {
        var serchQuery = jQuery(".search-box .search-input").val();
        localStorage.setItem("searchValue", serchQuery);
        window.open("/portal/approvalsandregistrations?q=" + serchQuery);
      }
      if (document.getElementById("submitSearchForm")) {
        document
          .getElementById("submitSearchMobileForm")
          .addEventListener("submit", submitSearchMobile);
      }
      function submitSearchMobile() {
        var serchQueryMobile = jQuery(".search-box .search-input").val();
        localStorage.setItem("searchValue", serchQueryMobile);
        window.open("/portal/approvalsandregistrations?q=" + serchQueryMobile);
      }
      if (jQuery(".readmore-sec,.content-about").length) {
        jQuery(".readmore-sec,.content-about").showMore({
          speedDown: 300,
          speedUp: 300,
          height: 260,
          showText: "Read More",
          hideText: "Read Less",
        });
      }

      //selectbox
      jQuery("#edit-country").selectBox({
        mobile: true,
        menuSpeed: "fast",
        keepInViewport: false,
        menuTransition: "fade",
      }).change(function () {
        jQuery(document).ajaxComplete(function (event, xhr, settings) {
          if (settings.url.indexOf("/contact-us") > -1 || settings.url.indexOf("/query-feedback") > -1) {
            if (jQuery("#edit-country").val() !== "IN") {
              jQuery("#state").hide();
              jQuery('.state-selectBox-dropdown-menu.selectBox-options-bottom').css("display", "none");
            }
            else {
              jQuery("#state").show();
              jQuery('.state-selectBox-dropdown-menu.selectBox-options-bottom').css("display", "block");
            }
          }
        });
      });

      jQuery("select:not(#edit-country)").selectBox({
        mobile: true,
        menuSpeed: "fast",
        keepInViewport: false,
        menuTransition: "fade",
      });

      //hide empty div
      //$('.inner-s-box:empty').remove();

      jQuery('.adv-close').on('click', function () {
        jQuery('.adv-popup-outer').hide();
        sessionStorage.setItem("popup-banner", "true")
      });
      if (window.performance.getEntriesByType("navigation")[0].type === 'reload' || window.performance.getEntriesByType("navigation")[0].type === 'navigate' && sessionStorage.getItem("popup-banner") === 'true') {
        jQuery('.adv-popup-outer').hide();
      }


      jQuery('.stateList-header li a').on('click', function () {
        var link = jQuery(this).attr("href");
        localStorage.setItem('stateLink', link);
      });
      // widget

      FreshworksWidget('hide', 'launcher');
      
      jQuery( ".widget" ).on( "click", function() {
        jQuery('.widget-icons').toggleClass('active');
        jQuery(".widget").toggleClass("active-widget");
        FreshworksWidget('hide'); 
      });
   
      jQuery('.call-option').hover(function(){ 
        jQuery('.call-text').show(400);
        }, function(){
          $('.call-text').hide();
        });
        jQuery('.email-option').hover(function(){ 
          jQuery('.email-text').show(400);
      }, function(){
        $('.email-text').hide();
      }
      );
      
      function attachChatWidgetListeners(){
        jQuery('.chat-option').on('click' , function(){
          FreshworksWidget('open'); 
          setTimeout(() => {
            const iframe = $('#widget-frame');
            const iframeWindow = iframe[0].contentWindow;
            const iframeDocument = iframeWindow.document;
            const elementInsideIframe = $('[data-testid="header-close"]', iframeDocument);
            elementInsideIframe.on('click', () =>{
              jQuery( ".widget" ).trigger( "click");
            });
          }, 1000);
          
        })
  
        jQuery('#widget-chat-option').on('click' , function(){
          FreshworksWidget('open'); 
        })
        
        jQuery('.chck-call').on('click' , function(){
          jQuery(".widget").trigger('click');
        })

        jQuery('.chck-email').on('click' , function(){
          jQuery(".widget").trigger('click');
        })
      }
      
    },
    
  };
})(jQuery, Drupal, this, this.document, drupalSettings);
