<%@ page 
  language="java" 
  contentType="text/html; charset=UTF-8"
  import="com.catalyticgroup.cgi.params.beans.*"
  import="com.catalyticgroup.cgi.util.beans.*" 
  import="java.util.*"
%>

<%
  String userAgent = request.getHeader("user-agent");

  String shareTitle  = "";
  if (request.getParameter("shareTitle") !=null)  shareTitle =  request.getParameter("shareTitle").replace("__"," ");
  String shareDesc  = "";
  if (request.getParameter("shareDesc") !=null)  shareDesc =  request.getParameter("shareDesc");
  String shareImage = "";
  String currentUri = request.getScheme() + "://" + request.getServerName()  + request.getContextPath();
 
  String cdnUri  = "http://50.secondthought.com/";

  if (request.getParameter("shareImage") !=null)  shareImage =  currentUri + "/images/share/" + request.getParameter("shareImage");

%>

<!doctype html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1,height=device-height">
    <title>50 Styles, 50 States</title>

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Old Navy’s 50 Styles, 50 States">
    <meta name="twitter:description" content="At Old Navy, we believe in fashion for everyone. To prove it, we asked 50 people across all 50 states to rep their zip's unique style. Want to see your state's look? Click into the interactive map below, shop each style star's outfit and be prepared to catch some serious road-trippin' fever.">
    <meta name="twitter:image" content="<%= shareImage %>">
    <meta name="twitter:image:alt" content="<%= shareTitle %>">
    <meta name="twitter:domain" content="secondthought.com">

    <meta property="og:title" content="Old Navy’s 50 Styles, 50 States " />
    <meta property="og:description" content="At Old Navy, we believe in fashion for everyone. To prove it, we asked 50 people across all 50 states to rep their zip's unique style. Want to see your state's look? Click into the interactive map below, shop each style star's outfit and be prepared to catch some serious road-trippin' fever." />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="<%= shareImage %>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <link rel="apple-touch-icon" href="">

    <!-- Place favicon.ico in the root directory -->

    <!-- build:css styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="styles/reset.css">
    <link rel="stylesheet" href="styles/fontawesome.css">
    <link rel="stylesheet" href="styles/jquery.mCustomScrollbar.css">
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->
  
    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
    <script type="text/javascript" src="scripts/lib/jquery.js"></script>
    <script type="text/javascript" src="scripts/lib/underscore.js"></script>
    <script type="text/javascript" src="scripts/lib/handlebars.js"></script>
    <script type="text/javascript" src="scripts/lib/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript" src="scripts/lib/jquery.touchSwipe.js"></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <!--endbower -->
    <!-- endbuild -->
    <jsp:include page="jsonData.jsp" />
    <!-- build:js scripts/main.js -->
    <script src="scripts/main_revised_launch.js"></script>
    <!-- endbuild -->
    

  </head>
  <body>


  <script type="text/javascript">

  (function(a,b,c,d){
  a='//tags.tiqcdn.com/utag/timeinc/people.com/prod/utag.js';
  b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
  a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
  })();

 </script>



  <script type="text/javascript">
    var utag_data = {
        channel : "people.com", // Brand name of the web property (channel) eg. departures.
        page_name : "50styles50states", // Unique page name value that is easily distinguishable from pageName.
        site_section1 : "native", //
        site_section2 : "", // Value is from the BY STATES dropdown
        site_section3 : "", // Value is from the BY ITEMS dropdown
        template_type : "landing", // Template type for the current page eg. landing, article, gallery, etc.
        sponsored_content : "branded" , // Native, branded, sponsored, or tentpole
        sponsor_client : "old_navy", // Name of the client
        publish_date: "2016-09-01"
      };
  </script>


  	

    <div class="header"></div>

    <div class="intro">
      <div class="container">We believe in fashion for everyone. To prove it, we asked 50 people across all 50 states to rep their zip's unique style. Want to see your state's look? Click into the interactive map below, shop each style star's outfit and be prepared to catch some serious road-trippin' fever.</div>
    </div>  

    <div class="container">
  		
  	  <jsp:include page="map.jsp" />
  	  	
      <div class="filter_bar">

            <div class="optionWrapper">
                <span id="filter_state" class="filter_bar_by_states_by_items">
                  by states <i class="fa fa-angle-down"></i>
                </span>
                <div id="retrieveCover_list">

                </div>
            </div>

            <div class="optionWrapper">
                <span id="filter_item" class="filter_bar_by_states_by_items">
                  by items <i class="fa fa-angle-down"></i>
                </span>
                <div id="retrieveCover_list_item">

                </div>
            </div>

      </div>

      <div class="hero-unit row clearfix"></div>


      <div class="btn_load_more_styles">load more styles</div>


      <div class="col-md-12 detailView expand_background clearfix noborder"></div>
     

    </div><!-- end of container -->


      <div class="footer">
          <a class="footer_logo"></a>
          <div class="footer_text">
            Got style? Show us! Take a snap of your best Old Navy look, then tag us on IG — @oldnavy & #50Styles50States
          </div>
          <div class="footer_share_icons">
              <a class="fa fa-facebook" target="_blank" href="https://www.facebook.com/oldnavy/"></a>
              <a class="fa fa-twitter" target="_blank" href="https://twitter.com/oldnavy"></a>
              <a class="fa fa-instagram" target="_blank" href="https://www.instagram.com/oldnavy/"></a>
              <a class="fa fa-pinterest-p" target="_blank" href="https://www.pinterest.com/oldnavy/"></a>
          </div>
      </div>



    <script id="influencerDetail-template" type="text/x-handlebars-template">

        <div class="col-md-7">
           <div class="expand_name">{{influencer_name}}</div>
           <div class="full_state">{{state_full}}</div>
           <a target="_blank" class="expand_link" href="{{blog_url}}">{{blog_display}}</a>
           <div class="expand_text">{{statement}}</div>
           <div class="col-md-12 expandDetail">
              <div class="shopthelook_header">shop the look</div>
              <div class="row">
                        <div class="col-md-12 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look1_cat_name_show}} </div>

                             {{#if look1_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look1_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look1_prod_name}}</a>
                            {{/if}} 

                            {{#if look1_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look1_url}}">{{look1_prod_name}}</a>
                            {{/if}}   

                        </div> 

                        <div class="col-md-12 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look2_cat_name_show}} </div>

                            {{#if look2_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look2_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look2_prod_name}}</a>
                            {{/if}} 

                            {{#if look2_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look2_url}}">{{look2_prod_name}}</a>
                            {{/if}}   

                        </div> 

                        <div class="col-md-12 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look3_cat_name_show}} </div>

                            {{#if look3_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look3_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look3_prod_name}}</a>
                            {{/if}} 

                            {{#if look3_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look3_url}}">{{look3_prod_name}}</a>
                            {{/if}}   

                        </div> 

                        <div class="col-md-12 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look4_cat_name_show}} </div>

                             {{#if look4_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look4_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look4_prod_name}}</a>
                            {{/if}} 

                             {{#if look4_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look4_url}}">{{look4_prod_name}}</a>
                            {{/if}}   

                        </div> 


              </div>
            </div>
        </div>   

        <div class="col-md-5 rightColumDetail">
          <img class="expand_photo" src="<%= cdnUri %>images/original/{{influencer_image}}" />
          <div class="expand_two_letter_state">{{state}}</div>
        </div>

        <div class="row shareRow col-md-3">
            <div class="col-md-2">
              <div class="shopthelook_share_header">share</div>
            </div>
            <div class="col-md-8">
              <a class="shopthelook_share_icons fa fa-facebook" href="javascript:void(0);"></a>
              <a class="shopthelook_share_icons fa fa-twitter" href="javascript:void(0);"></a>
              <a class="shopthelook_share_icons fa fa-pinterest-p" href="javascript:void(0);"></a>
             </div>
        </div> 

        {{#unless first}}
          <a href="javascript:void(0);" class="prevBtn sprite"></a>
        {{/unless}}
        
        {{#unless last}}
          <a href="javascript:void(0);" class="nextBtn sprite"></a>
        {{/unless}}

        <a href="javascript:void(0);" class="closeBtn sprite"></a>
        <div class="sprite navigationArrow state{{arrowIndex}}"></div>

    </script>


    <script id="influencerDetailMobile-template" type="text/x-handlebars-template">

        <div class="col-md-5 rightColumDetail">
          <img class="expand_photo" src="<%= cdnUri %>images/original/{{influencer_image}}" />
          <div class="expand_two_letter_state">{{state}}</div>
        </div>

        <div class="col-md-7">
           <div class="expand_name">{{influencer_name}}</div>
           <div class="full_state">{{state_full}}</div>
           <a target="_blank" class="expand_link" href="{{blog_url}}">{{blog_display}}</a>
           <div class="expand_text">{{statement}}</div>
           <div class="col-md-12 expandDetail">
              <div class="shopthelook_header">shop the look</div>
              <div class="row">
                        <div class="col-md-6 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look1_cat_name_show}} </div>
                            {{#if look1_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look1_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look1_prod_name}}</a>
                            {{/if}} 

                            {{#if look1_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look1_url}}">{{look1_prod_name}}</a>
                            {{/if}}   
                        </div> 

                        <div class="col-md-6 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look2_cat_name_show}} </div>

                            {{#if look2_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look2_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look2_prod_name}}</a>
                            {{/if}} 

                            {{#if look2_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look2_url}}">{{look2_prod_name}}</a>
                            {{/if}}  
                        </div> 
 
                        <div class="col-md-6 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look3_cat_name_show}} </div>
                            {{#if look3_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look3_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look3_prod_name}}</a>
                            {{/if}} 

                            {{#if look3_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look3_url}}">{{look3_prod_name}}</a>
                            {{/if}}   
                        </div> 

                        <div class="col-md-6 shopthelook_wrapper">
                            <div class="shopthelook_subheader">{{look4_cat_name_show}} </div>
                           {{#if look4_mpn}}
                              <a target="_blank" class="shopthelook_item" href="http://oldnavy.gap.com/browse/product.do?pid={{look4_mpn}}&mlink=0,people_50states&tid=onsm004625">{{look4_prod_name}}</a>
                            {{/if}} 

                             {{#if look4_url}}
                                <a target="_blank" class="shopthelook_item" href="{{look4_url}}">{{look4_prod_name}}</a>
                            {{/if}}   
                        </div> 
              </div>
            </div>
        </div>   

        <div class="row shareRow col-md-3">
            <div class="col-md-2">
              <div class="shopthelook_share_header">share</div>
            </div>
            <div class="col-md-8">
              <a class="shopthelook_share_icons fa fa-facebook" href=""></a>
              <a class="shopthelook_share_icons fa fa-twitter" href=""></a>
              <a class="shopthelook_share_icons fa fa-pinterest-p" href=""></a>
             </div>
        </div> 


        {{#unless first}}
          <a href="javascript:void(0);" class="prevBtn sprite"></a>
        {{/unless}}
        
        {{#unless last}}
          <a href="javascript:void(0);" class="nextBtn sprite"></a>
        {{/unless}}
        
        <a href="javascript:void(0);" class="closeBtn sprite"></a>

    </script>

    <script id="influencerList-template" type="text/x-handlebars">
          <div class="col-md-3 influencerImgWrapper ">
              <div class="stateWrapper">
                <span class="state two_letter_state_box">{{state}}</span>
                <img src="<%= cdnUri %>images/original/{{influencer_image}}" />
                <div class="grid_hover_bg">
                    <div class="grid_hover_name">{{influencer_name}}</div>
                    <div class="grid_hover_state">{{state_full}}</div>
                </div>
              </div>  
         </div>
    </script>


    <script id="stateList-template" type="text/x-handlebars">
          <span class="dropdown_state_items">{{state}}</span>
    </script>

    <script id="itemList-template" type="text/x-handlebars">
          <span class="dropdown_state_items">{{cat_name}}</span>
    </script>

  </body>
</html>
