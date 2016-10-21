<!doctype html>
<html>
<head>
<title>TEALIUM tracking</title>


   <script type="text/javascript">
      function trackingView(){
      	utag.view({
	        channel : "people", // Brand name of the web property (channel) eg. departures.
	        page_name : "50styles50states", // Unique page name value that is easily distinguishable from pageName.
	        site_section1 : "native", //
	        template_type :  "influencer_detail", // Template type for the current page eg. landing, article, gallery, etc.
	        sponsored_content : "branded" , // Native, branded, sponsored, or tentpole
	        sponsor_client : "old_navy" // Name of the client
		});
      }

      function trackingEvent(){
      		utag.link({ "click_id": "share-pinterest" });
      };

  </script>
  
</head>
<body>

 <script type="text/javascript">
    var utag_data = {
        channel : "people", // Brand name of the web property (channel) eg. departures.
        page_name : "50styles50states", // Unique page name value that is easily distinguishable from pageName.
        site_section1 : "native", //
        site_section2 : "", // Value is from the BY STATES dropdown
        site_section3 : "", // Value is from the BY ITEMS dropdown
        template_type : "landing", // Template type for the current page eg. landing, article, gallery, etc.
        sponsored_content : "branded" , // Native, branded, sponsored, or tentpole
        sponsor_client : "old_navy" // Name of the client
      };
   </script>    

	<script type="text/javascript">
		(function(a,b,c,d){
		a='//tags.tiqcdn.com/utag/timeinc/people.com/qa/utag.js';
		b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
		a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
		})();
   </script>



    <h1>
    	This is a TEALIUM tracking testing page.
    </h1>
      
      <p>
      	    <button onClick="trackingView();">View Tracking</button> 
      </p>

       <p>
    		 <button onClick="trackingEvent();">Event
Tracking</button>
	   
	   </p>

<!-- Page Content -->
</body>
</html>