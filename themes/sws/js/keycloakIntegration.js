jQuery(document).ready(function () {
  window.onpopstate = function (event) {
    window.history.state = event.state;
    window.location.href = location.href;
  };
  var baseUrl = window.location.origin;
  var clientId = "";
  var ownerOrganizationName = [];
  var memberOrganizationsName = [];
  var userName = "";
  var approvalsId = "";
  var crfData = false;


  switch (baseUrl) {
    case "https://uat-nsws.investindia.gov.in":
      keycloakUrl = "https://sso-uat-nsws.investindia.gov.in";
      clientId = "portal-stage";
      break;
    case "https://dev-nsws.investindia.gov.in":
      keycloakUrl = baseUrl;
      clientId = "portal-dev";
      break;
    case "https://qa-nsws.investindia.gov.in":
      keycloakUrl = baseUrl;
      clientId = "portal-qa";
      break;
    case "https://www.ppe.nsws.gov.in":
      keycloakUrl = baseUrl;
      clientId = "portal-ppe";
      break;
    case "https://www.nsws.gov.in":
      keycloakUrl = baseUrl;
      clientId = "portal-prod";
      break;
    case "https://www.demo.nsws.gov.in":
      keycloakUrl = baseUrl;
      clientId = "portal-ppe-stage";
      break;
    default:
      keycloakUrl = "https://sso-uat-nsws.investindia.gov.in";
      baseUrl = "https://uat-nsws.investindia.gov.in";
      clientId = "portal-stage";
      break;
  }

  var keycloak = new Keycloak({
    realm: "madhyam",
    url: keycloakUrl + "/auth/",
    clientId: clientId,
  });

  keycloak
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      checkLoginIframe: true,
    })
    .success(function (authenticated) {
      if (authenticated) {
        showMultiProjects();
        userProfileCentral();
        userDTO();
        if (localStorage.getItem("userDTO")) {
          switchOrg();
        }
        // if (!localStorage.getItem("userDTO")) {
        //   userDTO();
        // }
        if (getCookie("userDTO") && localStorage.getItem("approvalID")) {
          document.cookie = "userDTO=false";
          var redirection = localStorage.getItem("redirectionHomepage");
          setTimeout(function () {
            if (
              !jQuery(".addapproval").hasClass("disabled") ||
              redirection == 0
            ) {
              updateTokenDrupal(localStorage.getItem("approvalID"), redirection);
              localStorage.removeItem("approvalID");
              localStorage.removeItem("redirectionHomepage");
            }
          }, 2000);
        }
      }
      return false;
    })
    .error(function () {
      console.log("Failed to check sso");
    });

   jQuery(document).on("click", ".addapproval", function () {
  //   localStorage.setItem("redirectionHomepage", 1);
  //   localStorage.setItem("redirectHome", 1);
  //   jQuery("body").append(
  //     " <div class='loader-wrapper'><img src='themes/sws/images/loader.gif' alt='loader-img' /></div>"
  //   );
     var approvalsId = jQuery(this).attr("data-id");
     localStorage.setItem("approvalsId", approvalsId);
  });

  

  function initKeycloak() {
    keycloak
      .init({ onLoad: "login-required" })
      .success(function (authenticated) { })
      .error(function () {
        console.log("Failed to initialize init");
      });
  }

  function updateTokenDrupal(approvalId, redirection = 1) {
    keycloak
      .updateToken(30)
      .success(function () {
        if (crfData) {
          addApprovalToCart(approvalId, redirection);
        }
        else {
          // showNotification( "Complete your organisation profile", "error");
          if (localStorage.getItem("redirectHome")) {
            localStorage.removeItem("redirectHome");
            jQuery(".loader-wrapper").hide();
            jQuery("#modal-content,#modal-background")
              .toggleClass("modal-active")
              .css("display", "block");
            if (
              jQuery("#modal-content,#modal-background").hasClass("modal-active")
            ) {
              jQuery("body").css("overflow", "hidden");
            } else {
              jQuery("body").css("overflow", "auto");
            }
          }
        }
      })
      .error(function () {
        console.log("Failed to refresh token");
      });
  }

  // POST API to Add Users Permissions.
  var userDTO = function () {
    var url = baseUrl + "/gateway/user/user/getUserPermission";
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var parseData = JSON.parse(req.response);
          let data;
          data = parseData.data;
          data.user.permission = data.permission;
          localStorage.setItem("userDTO", JSON.stringify(data.user));
          jQuery(".header_main_section #login-block").hide();
          jQuery(".header_main_section .dashboard-btn").show();
          jQuery(".header_main_section .cart-icon").show();
          jQuery(".user-info-header").show();
          switchOrg();
          let isAdmin = data.user.permission.includes(
            "Admin_Dashboard_FE_View"
          );
          if (isAdmin) {
            jQuery(".btn-dashboard a").attr("href", "/portal/admin-dashboard");
            jQuery(
              ".header_main_section .header_section .cart-icon a, .header_main_section .header_section .mobile-icon a.cart"
            ).hide();
          }
          let drupal_header = data.user.permission.includes(
            "DRUPAL_HEADER_FE_View"
          );
          if (!drupal_header) {
            localStorage.removeItem("userDTO");
            localStorage.setItem("userSignout", true);
            keycloak.logout();
            sessionStorage.clear();
          }
        } else if (req.status == 403) {
          console.log("Failed to get userDto");
        }
      }
    };
    req.send();
    document.cookie = "userDTO=true";
    return false;
  };

  // POST API to Add Users to Cart.
  var addApprovalToCart = function (approvalId, redirection = 1) {
    var url = baseUrl + "/gateway/form-builder/marketplace/add-approval";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var parseData = JSON.parse(req.response);
          var statusType = parseData.status ? "success" : "error";
          if (redirection === 1) {
            showNotification(parseData.message, statusType);
          }
          else {
            showNotification(
              statusType == "success"
                ? "Approval added to dashboard successfully"
                : parseData.message,
              statusType
            );
          }
          if (approvalId === null) {
            jQuery(".loader-wrapper").hide();
          }
          else if (crfData) {
            jQuery(".loader-wrapper").hide();
            userCart(approvalId, redirection, parseData.status);
          }
        } else if (req.status == 403) {
          console.log("Failed to add approval");
        }
      }
    };
    req.send(
      JSON.stringify({ id: approvalId, username: keycloak.idTokenParsed.email })
    );
    return true;
  };

  var staticCount = 0;
  // POST API to get Users Data from cart.
  var userCart = function (approvalId, redirection = 1, addedApprovalStatus) {
    var url = baseUrl + "/gateway/form-builder/marketplace/user-cart";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var parseData = JSON.parse(req.response);
          let data;
          data = parseData.data;
          if (redirection != 1 && addedApprovalStatus) {
            localStorage.removeItem("homepageRedirection");
            staticCount += 1;
            jQuery(
              ".header-new .header_main_section .header_section .user_info.dashboard-btn.cart-count-animation .cart-count"
            ).css("visibility", "visible");
            jQuery(".cart-count").html(`+${staticCount}`);
          } else if (redirection == 1 && addedApprovalStatus) {
            localStorage.removeItem("homepageRedirection");
            jQuery(".loader-wrapper").hide();
            // cafRedirection(approvalId, data);
          }
        } else if (req.status == 403) {
          console.log("403 Forbidden to Add Approval to Cart");
        }
      }
    };
    req.send(JSON.stringify({ username: keycloak.idTokenParsed.email }));
  };

  jQuery(".user_info .dashboard-button").click(function () {
    staticCount = 0;
    jQuery(".cart-count-animation .cart-count").css("visibility", "hidden");
  });

  function userProfileCentral(approvalID) {
    var url = baseUrl + "/gateway/user/investor/org/fetchOrgProfile";
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var parseData = JSON.parse(req.response);
          let data;
          data = parseData.data;
          localStorage.setItem('fetchProfileData' , JSON.stringify(data));
          crfData = data.crfSubmittedOrNot ;
          // userName = data.authorizedSignatory.firstName;
          jQuery(".members-multiproject").parent().addClass("disable-member");
          if (data.crfSubmittedOrNot) {
            jQuery(".loader-wrapper").hide();
          } else {
            jQuery(".loader-wrapper").hide();
            jQuery(".addapproval").addClass("disabled");
          }
          if (data.roleType === "OWNER") {
            jQuery(".members-multiproject").parent().show();
          }
          if (data.organization.incorporationFlow) {
            jQuery(".incorporate-multiproject")
              .parent()
              .addClass("disable-list");
            jQuery(".ml-button a").addClass("disable-list");
          }
          if(data.organization.orgVerifiedOrNot === false){
            jQuery(".ml-button").hide();
          }
          else{
            jQuery(".ml-button").show();
          }
        } 
        else if (req.status == 403) {
          localStorage.removeItem('fetchProfileData');
          console.log("403 Forbidden User Profile Check");
        }
        else{
          localStorage.removeItem('fetchProfileData');
        }
      }
    };
    req.send();
    return true;
  }

  // Get cookie by name.
  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }

  function getProfileData(){
    let data = localStorage.getItem('fetchProfileData');
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
    return jsonData;
  }

  // Remove login token if Signout link is clicked.
  jQuery(".header-dashboard-dropdown .header-dashboard-menu li .sign-out").on(
    "click",
    function (e) {
      localStorage.removeItem("userDTO");
      localStorage.removeItem("member");
      localStorage.removeItem("owner");
      localStorage.removeItem("fetchProfileData");
      localStorage.setItem("userSignout", true);
      // localStorage.removeItem("anonymousInvestor");
      keycloak.logout({ redirectUri: `${window.location.origin}/` });
      sessionStorage.clear();
      sessionStorage.setItem("popupShown", true);
    }
  );

  // Show notification.
  function showNotification(message, msgType) {
    var notification = new Noty(
      { text: message, type: msgType, layout: "topRight" },
      500
    );
    notification.show();
  }

  // Header changes google analytics
  // jQuery(document).on(
  //   "click","#explore .h4outer h4" ,
  //   function(e){
  //     e.preventDefault();
  //     dataLayer.push({
  //       'event': 'Central_View_Details',
  //       'approvalName': jQuery(e.target).parents('.explore_single').find('> h4').text()
  //       });
  //       window.location.href = jQuery(e.target).parents('.explore_single').find('a.button.addapproval').attr('href')
  //   }
  // )

  // jQuery(document).on(
  //   "click","#explore a.button.addapproval" ,
  //   function(e){
  //     e.preventDefault();
  //     dataLayer.push({
  //       'event': 'Central_View_Details',
  //       'approvalName': jQuery(e.target).parents('.explore_single').find('> h4').text()
  //       });
  //       window.location.href = jQuery(e.target).parents('.explore_single').find('a.button.addapproval').attr('href')
  //   }
  // )
  jQuery(document).on(
    "click","#state .h4outer h4" ,
    function(e){
      e.preventDefault();
      dataLayer.push({
        'event': 'State_View_Details',
        'approvalName': jQuery(e.target).parents('.state_single').find('> h4').text()
        });
        window.location.href = jQuery(e.target).parents('.state_single').find('.stateHover > a').attr('href')
    }
  )

  jQuery(document).on(
    "click","#state .button" ,
    function(e){
      e.preventDefault();
      dataLayer.push({
        'event': 'State_Add_to_dashboard',   
          'approvalName': jQuery(e.target).parents('.state_single').find('> h4').text()
        });
    }
  )
  // jQuery(document).on(
  //   "click","#explore .button-outline" ,
  //   function(e){
  //     e.preventDefault();
  //     dataLayer.push({
  //       'event': 'Add In Dashboard',   
  //       'approvalName': jQuery(e.target).parents('.explore_single').find('> h4').text()
  //       });
  //   }
  // )


// Header changes
  jQuery(document).on(
    "click",
    ".explore_single .exploreHover .button-group .button-outline, .state_single .stateHover .button-group .button",
    function () {
      localStorage.setItem("redirectionHomepage", 0);
      localStorage.setItem("redirectHome", 0);
      jQuery(".user_info.dashboard-btn.btn-dashboard").addClass(
        "buzz-out-on-hover"
      );
      jQuery(".buzz-out-on-hover").removeClass("cart-count-animation");
      setTimeout(function () {
        jQuery(".user_info.dashboard-btn.btn-dashboard").addClass(
          "cart-count-animation"
        );
      }, 300);
      // jQuery(".user_info.dashboard-btn.btn-dashboard").addClass("cart-count-animation");
      setTimeout(function () {
        jQuery(".user_info.dashboard-btn.btn-dashboard").removeClass(
          "buzz-out-on-hover"
        );
      }, 800);

      if(getProfileData() && ((getProfileData().organization.investorJourneyFlow === "INCORPORATION_OF_COMPANY") || (getProfileData().organization.investorJourneyFlow ==="FOREIGN_INVESTOR"))){
        jQuery("#modal-content,#modal-background")
        .toggleClass("modal-active")
        .css("display", "block");
          if (jQuery("#modal-content,#modal-background").hasClass("modal-active")) {
            jQuery("body").css("overflow", "hidden");
          } else {
            jQuery("body").css("overflow", "auto");
          }
          return 
      }

      approvalsId = jQuery(this).attr("data-id");
      if (localStorage.getItem("userDTO")) {
        updateTokenDrupal(approvalsId, 0);
      } else {
        // localStorage.setItem("anonymousInvestor", "true");
        localStorage.setItem("homepageRedirection", "true");
        localStorage.setItem("approvalID", approvalsId);
        initKeycloak();
      }

      
     
      if (localStorage.getItem("redirectHome")) {
        if (
          localStorage.getItem("member") === "0" &&
          localStorage.getItem("owner") === "0"
        ) {
          localStorage.removeItem("redirectHome");
          jQuery("#modal-content,#modal-background")
            .toggleClass("modal-active")
            .css("display", "block");
          if (
            jQuery("#modal-content,#modal-background").hasClass("modal-active")
          ) {
            jQuery("body").css("overflow", "hidden");
          } else {
            jQuery("body").css("overflow", "auto");
          }
        }
      }
    }
  );

  // Modal close when profile is incomplete of user
  jQuery("#modal-close").click(function () {
    jQuery("#modal-content,#modal-background").css("display", "none");
    jQuery("body").css("overflow", "auto");
    localStorage.removeItem("member");
    localStorage.removeItem("owner");
    localStorage.removeItem("redirectHome");

  });
  jQuery(".profile-popup").click(function () {
    jQuery("#modal-content,#modal-background").css("display", "none");
    jQuery("body").css("overflow", "auto");

  });


  // Get Project list
  var showMultiProjects = function () {
    keycloak
      .updateToken(30)
      .success(function () {
        var url = baseUrl + "/gateway/user/investor/project/dashboard";
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
        req.onreadystatechange = function () {
          if (req.readyState == 4) {
            if (req.status == 200) {
              var parseData = JSON.parse(req.response);
              let data;
              data = parseData.data;
              if (data.length) {
                showMultiProjectHeader(data);
              } else {
                createDefaultProject();
              }
            } else if (req.status == 403) {
              console.log("Failed to show multi projects");
            }
          }
        };
        req.send();
      })
      .error(function () {
        console.log("Failed to refresh token");
      });
  };

  // Get Active Project Data for user
  function showActiveProject(projectId, defaultProjectData = null) {
    keycloak
      .updateToken(30)
      .success(function () {
        var url = baseUrl + "/gateway/user/investor/project/" + projectId;
        var req = new XMLHttpRequest();
        req.open("POST", url, true);
        req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
        req.onreadystatechange = function () {
          if (req.readyState == 4) {
            if (req.status == 200) {
              if (defaultProjectData) {
                showMultiProjectHeader(defaultProjectData);
              } else {
                window.location.reload();
              }
            } else if (req.status == 403) {
              console.log("Failed to show active project");
            }
          }
        };
        req.send();
      })
      .error(function () {
        console.log("Failed to refresh token");
      });
  }

  // Change Active Project on clicking project.
  jQuery(document).on("click", ".multiproject-block", function () {
    var projectId = jQuery(this).attr("data-id");
    showActiveProject(projectId);
  });

  // Show hide multiproject dropdown if projects are available.
  function showMultiProjectHeader(data) {
    var multiprojects = "";
    var len = data.length;
    var dashboardIcon = data[0].name
      .match(/\b(\w)/g)
      .join("")
      .substring(0, 2);
    jQuery(".dashboard-button").prepend(
      `<div class="dashboard-svg">${dashboardIcon}</div>`
    );
    jQuery(".dashboard-button .single-project-svg").hide();
    jQuery.each(data, function (key, valueObj) {
      var activeBlockClass = key ? "" : "active";
      var profileStatus = valueObj.isProfileComplete ? "comp" : "pending";
      var icon = valueObj.name
        .match(/\b(\w)/g)
        .join("")
        .substring(0, 2);
      if (key == 5) {
        multiprojects += `
        <a href="/portal/investor-dashboard/profile?profiletab=2" class="multiproject-block">
          <span class="project">+${len - 5} </span>
          <div class="multiproject-title">
            <h3 class="ml-heading"> View all projects</h3>
            <p>${len - 5} more projects are there</p>
          </div>
          <div class="view-btn">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="#7b7b7b" aria-hidden="true">
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z">
              </path>
            </svg>
          </div>
        </a>
      `;
        return false;
      }
      
      multiprojects += `
       
        <div class="multiproject-block  ${activeBlockClass} ${profileStatus} " data-id=${valueObj.id}>
          <span class="project"> ${icon} </span>
          <div class="multiproject-title">
            <h3 class="ml-heading"> ${valueObj.name}</h3>
            <p>Project No. - ${valueObj.displayId}</p>
          </div>
        </div>
       
      `;
    });
    jQuery(".multi-project-list").html(multiprojects);
    jQuery(
      ".header-dashboard-dropdown .header-dashboard-inner .multi-project"
    ).css({ display: "block" });
    jQuery(".pending").prop('disabled', true);
    jQuery(".pending").hover(function () {
      var dynamicHeight = jQuery(this).offset().top;
      jQuery('.incomplete-profile-popup .incomplete-profile-title').css("top",dynamicHeight);
      jQuery('.incomplete-profile-popup').toggle();
   
    });
  }

  // Post API to create default "Project 1" for newly created user.
  function createDefaultProject() {
    var url = baseUrl + "/gateway/user/investor/project/create";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var parseData = JSON.parse(req.response);
          let data;
          data = parseData.data;
          showActiveProject(data[0].id, data);
        } else if (req.status == 403) {
          console.log("Failed to show active project");
        }
      }
    };
    req.send(JSON.stringify({ id: null, name: "Project 1" }));
  }

  // Refresh keycloak token manually calling this function.
  function updateTokenLocal() {
    keycloak
      .updateToken(30)
      .success(function () {
        console.log("token refresh");
      })
      .error(function () {
        console.log("Failed to refresh token");
      });
  }

  // Switch Organizations
  var switchOrg = function () {
    const userDetails = localStorage.getItem("userDTO");
    const userDTO = JSON.parse(userDetails);
    var url =
      baseUrl +
      `/gateway/user/org/fetchUsersOrganizations?userId=${userDTO.id}`;
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var parseData = JSON.parse(req.response);
          let data;
          data = parseData.data;
          const organisationCount =
            data?.memberOrganizations?.length +
            (data?.ownerOrganization?.organizationId ? 1 : 0);
          ownerOrganizationName = data?.ownerOrganization?.organizationName;
          for (
            let member = 0;
            member < data.memberOrganizations.length;
            member++
          ) {
            memberOrganizationsName[member] =
              data.memberOrganizations[member].organizationName;
          }
          localStorage.setItem("member", data?.memberOrganizations?.length);
          localStorage.setItem(
            "owner",
            data?.ownerOrganization?.organizationId ? 1 : 0
          );
          if (localStorage.getItem("redirectHome")) {

            if (
              localStorage.getItem("member") === "0" &&
              localStorage.getItem("owner") === "0"
            ) {

              localStorage.removeItem("redirectHome");
              jQuery("#modal-content,#modal-background")
                .toggleClass("modal-active")
                .css("display", "block");
              if (
                jQuery("#modal-content,#modal-background").hasClass(
                  "modal-active"
                )
              ) {
                jQuery("body").css("overflow", "hidden");
              } else {
                jQuery("body").css("overflow", "auto");
              }
            }
            
          }
          if (organisationCount <= 1) {
            jQuery(".switch-organization").parent().hide();
          } else {
            jQuery(".switch-organization").parent().show();
          }
        } else if (req.status == 403) {
          console.log("Failed to switch projects");
        }
      }
    };
    req.send();
  };


   // Redirect Sector to Investor KYA
   function getMasterKYA(sectorId) {
    var url = baseUrl + "/gateway/investor-kya/kya/getMasterKYA";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    // req.setRequestHeader("Authorization", "Bearer " + keycloak.token);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          localStorage.setItem("sectorRedirectionHomepage", JSON.stringify({organizationType:"SECTOR",sectorId: sectorId}))
          window.location.href = "/portal/investorKya";
        } else if (req.status == 403) {
          console.log("Failed to redirect to KYA");
        }
      }
    };
    
    req.send(JSON.stringify({ organizationType:"SECTOR",sectorId: sectorId }));
  }

  // Sector dropdown list redirection
  jQuery('.no-ex-link,.sector-wrapper .sector-container .full-link' ).on('click', function () {
    var sectorId = jQuery(this).attr('id');
    var sectorIdrel = jQuery(this).attr('rel');
    if((sectorId !== "0" && sectorId !== undefined)){
      getMasterKYA(sectorId);
    }
    else{
      localStorage.removeItem("sectorRedirectionHomepage");
      window.location.href = "/portal/investor-decision";
    }
  });
  jQuery(".sector-list-li a").unbind("mouseup").bind("mouseup",function(e){
    e.preventDefault();
    var sectorIdrel = jQuery(this).attr('rel');
    if((sectorIdrel !== "0" && sectorIdrel !== undefined)){
      getMasterKYA(sectorIdrel);
    }
    else{
      localStorage.removeItem("sectorRedirectionHomepage");
      window.location.href = "/portal/investor-decision";
    }
  });
});