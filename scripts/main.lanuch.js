var targetNodeGlobal = 0;
var targetContentGlobal = 0;
var columNum = 4;
if(screen.width < 500) columNum = 3;
var targetAppendNodeGlobal = 0;
var targetArray = [];
var getInsideDropdown = false;
var getInsideDropdownItem = false;
var CURRENT_PATCH = 0;
var item_per_patch = 20;
var currentUri = location.protocol + "//" + location.host + location.pathname;
var CURRENT_REGION = -1;
var REGIONS = ["southeast","southwest","northeast","west","midwest"];
var CURRENT_FILTER = "All Items";
var CURRENT_FILTER_STATE = "All States";

function resetParameter(){
	targetAppendNodeGlobal = 0;
	targetNodeGlobal = 0;
}

function closeNewInfluencer(){
	$(".closeBtn").hide();
	$('.detailView').removeClass('expand newExpand');
	resetParameter();
	setTimeout(function(){
		$('.detailView').addClass('noborder');
	}, 250);
	if(screen.width< 740){
		 $('.detailView').off('touchmove');
	}
} 

function renderNewInfluencer(index){
	var source = $('#influencerDetail-template').html();
	if(screen.width< 740)  source = $('#influencerDetailMobile-template').html();
	var template = Handlebars.compile(source);
	var appIns = targetArray[index];
	appIns.arrowIndex = index % columNum + 1;
	if(appIns.look1_cat_name.length && appIns.look1_cat_name.indexOf("//") == -1) appIns.look1_cat_name += " //";
	if(appIns.look2_cat_name.length && appIns.look2_cat_name.indexOf("//") == -1) appIns.look2_cat_name += " //";
	if(appIns.look3_cat_name.length && appIns.look3_cat_name.indexOf("//") == -1) appIns.look3_cat_name += " //";
	if(appIns.look4_cat_name.length && appIns.look4_cat_name.indexOf("//") == -1) appIns.look4_cat_name += " //";
	targetContentGlobal = appIns.influencer_id - 1;
	if( index == 0 ) appIns.first = true;
	if( index == targetArray.length - 1) appIns.last  = true;
	var htmlNode = template(appIns);
	$('.detailView').html(htmlNode);
	utag.view({
			"page_name":"50styles 50states styles " + appIns.influencer_name,
			"template_type": "gallery"
	});
	setTimeout(function(){
		$('.detailView').addClass('newExpand');
	}, 5);
}

function moveNewInfluencer(divIndex,preNext){
	var targetIndex = (Math.floor(divIndex/columNum) + 1) * columNum - 1;
	if(targetIndex >= $('.influencerImgWrapper').length) targetIndex = $('.influencerImgWrapper').length - 1;
	var targetNode = $('.influencerImgWrapper').eq(targetIndex);
	targetNodeGlobal = divIndex;
	if(targetAppendNodeGlobal != targetIndex || $('.influencerImgWrapper').length == 1){
		if(typeof preNext != "undefined") {
			$('.detailView').insertAfter(targetNode);
			setScrollTop(targetNode);
		}else{
			$('.detailView').removeClass('expand newExpand').insertAfter(targetNode);
			$('.detailView').removeClass('noborder').addClass('expand');
			if(typeof targetNode != 'undefined') scrollToDiv(targetNode);
		}	
	}
	targetAppendNodeGlobal = targetIndex;


	if(screen.width< 740){
		

		var $scroller = $(".detailView");
		$scroller.on('touchmove', function (ev) {
		    var $this = $(this);
		    var scroller = $scroller.get(0);
		    if ($this.scrollTop() === 0) $this.scrollTop(1);
		    var scrollTop = scroller.scrollTop;
		    var scrollHeight = scroller.scrollHeight;
		    var offsetHeight = scroller.offsetHeight;
		    var contentHeight = scrollHeight - offsetHeight;
		    if (contentHeight == scrollTop) $this.scrollTop(scrollTop-1);
		});

		/*$('body').on('touchmove', function(e) {
		         e.preventDefault();
	    });

	    $('.detailView').off('touchmove');*/

	}
}

function setScrollTop(element) {
	var defaultVal = -20;
	if(screen.width < 500) defaultVal = -105;
	$('html,body').scrollTop($(element).offset().top + defaultVal);
}

function scrollToDiv(element) {
	var defaultVal = -20;
	if(screen.width < 500) defaultVal = -105;
	$('html,body').animate({
	   scrollTop: $(element).offset().top + defaultVal
	},300);
}

function filterBy(targetArray,keyVal,value){
	var keyVal = keyVal;
	var result = _.filter(targetArray,function(element) {
	    return element[keyVal].toLowerCase() == value || element[keyVal] == value;
	});
	return result;
}


function renderItem(objectVal,targetText){
	if($('#retrieveCover_list_item').children(".dropdown_state_items").text().indexOf(targetText) == -1){	
		objectVal.cat_name = targetText;
		var statelistSource_item   = $('#itemList-template').html();
		var statelistTemplate_item = Handlebars.compile(statelistSource_item);
		var statelistNode_item = statelistTemplate_item(objectVal);
		$('#retrieveCover_list_item').append(statelistNode_item);
	}
}

function renderByData(data,updateState,removeChilren,allstate){
	if(updateState){
		$('#retrieveCover_list').find('.dropdown_state_items').remove();
		$('#retrieveCover_list_item').find('.dropdown_state_items').remove();
	}
	if($('#retrieveCover_list').find(".dropdown_state_items").text().indexOf("All States") == -1){	
		var defaultState = " <span class='dropdown_state_items'>All States</span>";
		$('#retrieveCover_list').prepend(defaultState);
	}
	if($('#retrieveCover_list_item').find(".dropdown_state_items").text().indexOf("All Items") == -1){	
		var defaultState_Item = " <span class='dropdown_state_items'>All Items</span>";
		$('#retrieveCover_list_item').prepend(defaultState_Item);
	}
	if(removeChilren) $('.hero-unit').children('.influencerImgWrapper').remove();
	for(var i=0; i < data.length; i++){
		var objectVal = data[i];
		var listSource   = $('#influencerList-template').html();
		var listTemplate = Handlebars.compile(listSource);
		var stateIns = _.where(STATE_DATA,{"state_abbr":objectVal.state});
		objectVal.state_full = stateIns[0].state_full;
		var listNode = listTemplate(objectVal);
		$('.hero-unit').append(listNode);
		if(!allstate){
			if(updateState){
				var statelistSource   = $('#stateList-template').html();
				var statelistTemplate = Handlebars.compile(statelistSource);
				var statelistNode = statelistTemplate(objectVal);
				$('#retrieveCover_list').append(statelistNode);
				renderItem(objectVal,objectVal.look1_cat_name);
				renderItem(objectVal,objectVal.look2_cat_name);
				renderItem(objectVal,objectVal.look3_cat_name);
				renderItem(objectVal,objectVal.look4_cat_name);
			}
		}
	}

	if(CURRENT_REGION == -1 && CURRENT_FILTER == "All Items") data = APP_DATA;
	if(CURRENT_FILTER != "All Items") $('.btn_load_more_styles').addClass('hidden');
	else{
		if(CURRENT_FILTER_STATE == "All States"){
			if((CURRENT_PATCH + 1) * item_per_patch > data.length) $('.btn_load_more_styles').addClass('hidden');
			else $('.btn_load_more_styles').removeClass('hidden'); 
		}else{
			$('.btn_load_more_styles').addClass('hidden');
		}
	}

	if(allstate){
		for(var i=0; i < APP_DATA.length; i++){
			var objectVal = APP_DATA[i];
			var statelistSource   = $('#stateList-template').html();
			var statelistTemplate = Handlebars.compile(statelistSource);
			var statelistNode = statelistTemplate(objectVal);
			$('#retrieveCover_list').append(statelistNode);
			renderItem(objectVal,objectVal.look1_cat_name);
			renderItem(objectVal,objectVal.look2_cat_name);
			renderItem(objectVal,objectVal.look3_cat_name);
			renderItem(objectVal,objectVal.look4_cat_name);
		}
	}

}


function resetDefaltTargetArray(){
	targetArray = APP_DATA.slice(CURRENT_PATCH*item_per_patch, (CURRENT_PATCH + 1) * item_per_patch);
}

$(function() {

	//init List

	resetDefaltTargetArray();
	renderByData(targetArray,true,true,true);

	$('.btn_load_more_styles').click(function(){
		utag.view({
			"page_name":"50styles 50states",
			"template_type": "landing"
		});
		if((CURRENT_PATCH + 1) * item_per_patch < APP_DATA.length){
			CURRENT_PATCH ++;
			var newtargetArray = APP_DATA.slice(CURRENT_PATCH*item_per_patch, (CURRENT_PATCH + 1) * item_per_patch);
			renderByData(newtargetArray,true,false,false);
			targetArray = targetArray.concat(newtargetArray);
		}
	});

	$('.region').click(function(){
		var regionIndex = $(".region").index(this);
		CURRENT_REGION = regionIndex;
		$('.region').each(function(){
			var currentAttr  = $(this).attr('class');
			currentAttr = currentAttr.replace('active','');
			$(this).attr('class',currentAttr);
			$(this).removeAttr('filter');
			$(this).find("path").removeAttr('filter');
		});
		var currentAttr  = $(this).attr('class');
		$(this).attr('class',currentAttr + ' active' );
		if($(this).data("region") == "west"){
			$(this).find("#W").attr('filter'," url(#dropShadow)");
			$(this).find("#AK_1").attr('filter'," url(#dropShadowRevised)");
			$(this).find("#HI_1").attr('filter'," url(#dropShadowRevised)");
		}else $(this).attr('filter'," url(#dropShadow)");
		var regionData = $(this).data('region');
		var result = filterBy(APP_DATA,'region',regionData);
		targetArray = result;
		if(targetArray.length){
			closeNewInfluencer();
			resetParameter();
			scrollToDiv($('.filter_bar'));
			renderByData(targetArray,true,true,false);
		}else{
			alert('No styles in selected region');
		}
	}).hover(function(){
		if($(this).attr('class').indexOf('active') == -1){
			if($(this).data("region") == "west"){
				$(this).find("#W").attr('filter'," url(#dropShadow)");
				$(this).find("#AK_1").attr('filter'," url(#dropShadowRevised)");
				$(this).find("#HI_1").attr('filter'," url(#dropShadowRevised)");
			}else $(this).attr('filter'," url(#dropShadow)");
		}
	},function(){
		if($(this).attr('class').indexOf('active') == -1){
			var regionIndex = $(".region").index(this);
			if(CURRENT_REGION != regionIndex) {
				$(this).removeAttr('filter');
				$(this).find("path").removeAttr('filter');
			}
		}
	});

	$('body').on('click', '.influencerImgWrapper', function(){
		var divIndex = $('.influencerImgWrapper').index(this);
		moveNewInfluencer(divIndex);
		scrollToDiv($(this));
		renderNewInfluencer(divIndex);

		
	});

	$('body').on('click', '.closeBtn', function(){
		closeNewInfluencer();
	});

	$('body').on('click', '.nextBtn', function(){
		if(targetNodeGlobal+1 < $('.influencerImgWrapper').length){
			targetNodeGlobal++
			moveNewInfluencer(targetNodeGlobal,true);
			renderNewInfluencer(targetNodeGlobal);
		}
	});

	$('body').on('click', '.prevBtn', function(){
		if(targetNodeGlobal-1 >= 0){
			targetNodeGlobal--;
			moveNewInfluencer(targetNodeGlobal,true);
			renderNewInfluencer(targetNodeGlobal);
		}
	});

	$( ".detailView" ).on( "swipeleft", function(){
		if(targetNodeGlobal+1 < $(".influencerImgWrapper").length){
			targetNodeGlobal++
			moveNewInfluencer(targetNodeGlobal);
			renderNewInfluencer(targetNodeGlobal);
		}
	});
    

	$( ".detailView" ).on( "swiperight", function(){
		if(targetNodeGlobal-1 >= 0){
			targetNodeGlobal--;
			moveNewInfluencer(targetNodeGlobal);
			renderNewInfluencer(targetNodeGlobal);
		}
	});

	
   /*
	$('.detailView').swipe( {
	    //Generic swipe handler for all directions
	    swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
				if(targetNodeGlobal+1 < $('.influencerImgWrapper').length){
					targetNodeGlobal++
					moveNewInfluencer(targetNodeGlobal,true);
					renderNewInfluencer(targetNodeGlobal);
				}
	    },
	    swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
				if(targetNodeGlobal-1 >= 0){
					targetNodeGlobal--;
					moveNewInfluencer(targetNodeGlobal,true);
					renderNewInfluencer(targetNodeGlobal);
				}
	    }
	 });*/


    $('#filter_state').click(function(){
    	if($(this).siblings('#retrieveCover_list').is(":visible")){
    		$('#retrieveCover_list').mCustomScrollbar('destroy'); 		   
			$('#retrieveCover_list').slideUp('slow');
		    $(document).unbind('mouseup');
		    $('html, body').css({
			    'overflow': 'auto',
			    'height': 'auto'
			});
		}else{
	 		 $(this).siblings('#retrieveCover_list').slideDown('slow',function(){
	  			$('#retrieveCover_list').mCustomScrollbar({
						theme:'dark'
			    });	
	        });
			$(document).bind('mouseup', function(){
				if(!getInsideDropdown) {
				    $('#retrieveCover_list').mCustomScrollbar('destroy'); 		   
					$('#retrieveCover_list').slideUp('slow');
				    $(document).unbind('mouseup');
				    $('html, body').css({
					    'overflow': 'auto',
					    'height': 'auto'
					});
				 }
			});
		}
    });


    $('#retrieveCover_list').on('click','.dropdown_state_items',function(){
		var stateTarget = $(this).text();
		var result = filterBy(APP_DATA,'state',stateTarget);
		CURRENT_FILTER_STATE = stateTarget;
		if(stateTarget == "All States"){
			CURRENT_PATCH = 0;
			CURRENT_REGION = -1;
			$('.region').each(function(){
				var currentAttr  = $(this).attr('class');
				currentAttr = currentAttr.replace('active','');
				$(this).attr('class',currentAttr);
				$(this).removeAttr('filter');
				$(this).find("path").removeAttr('filter');
			});
			result = APP_DATA.slice(CURRENT_PATCH*item_per_patch, (CURRENT_PATCH + 1) * item_per_patch);
		}
		targetArray = result;
		if(targetArray.length){
			closeNewInfluencer();
			resetParameter();
			scrollToDiv($('.hero-unit'));
			utag.view({
				"site_section2": stateTarget,
				"site_section3": ""
			});
			renderByData(targetArray,false,true,false);
		}else{
			alert('No styles in selected region');
		}
		$('#retrieveCover_list').mCustomScrollbar('destroy'); 	
		$('#retrieveCover_list').slideUp('slow');
		if(stateTarget == "All States") $('.btn_load_more_styles').removeClass('hidden'); 
	}).on('mouseover','.dropdown_state_items',function(){
		getInsideDropdown = true;
	}).on('mouseout','.dropdown_state_items',function(){
		getInsideDropdown = false;
	});


    $('#filter_item').click(function(){
    	if($(this).siblings('#retrieveCover_list_item').is(":visible")){
		    $('#retrieveCover_list_item').mCustomScrollbar('destroy'); 		   
			$('#retrieveCover_list_item').slideUp('slow');
		    $(document).unbind('mouseup');
    	}else{
		    $(this).siblings('#retrieveCover_list_item').slideDown('slow',function(){
				$('#retrieveCover_list_item').mCustomScrollbar({
						theme:'dark'
			    });	
		    });
			$(document).bind('mouseup', function(){
				if(!getInsideDropdownItem) {
				    $('#retrieveCover_list_item').mCustomScrollbar('destroy'); 		   
					$('#retrieveCover_list_item').slideUp('slow');
				    $(document).unbind('mouseup');
				 }
			});
    	}
    });


    $('#retrieveCover_list_item').on('click','.dropdown_state_items',function(){
    	var itemTarget = $(this).text();
    	CURRENT_FILTER = itemTarget;
    	if(itemTarget == "All Items"){
    		if(CURRENT_REGION != -1){
    			var currentRegionName = REGIONS[CURRENT_REGION];
				result = filterBy(APP_DATA, "region",currentRegionName);
    		}else{
    			CURRENT_PATCH = 0;
    			result = APP_DATA.slice(CURRENT_PATCH*item_per_patch, (CURRENT_PATCH + 1) * item_per_patch);
    		}
		}else{
			var regionArray = [];
			if(CURRENT_REGION == -1)  regionArray = APP_DATA;
			else{
				var regionData = REGIONS[CURRENT_REGION];
				var result = filterBy(APP_DATA,'region',regionData);
				regionArray = result;
			}
			var result1 = filterBy(regionArray,'look1_cat_name',itemTarget);
			var result2 = filterBy(regionArray,'look2_cat_name',itemTarget);
			var result3 = filterBy(regionArray,'look3_cat_name',itemTarget);
			var result4 = filterBy(regionArray,'look4_cat_name',itemTarget);
			result = _.union(result1,result2,result3,result4);	
		}
		targetArray = result;
		if(targetArray.length){
			closeNewInfluencer();
			resetParameter();
			scrollToDiv($('.hero-unit'));
			renderByData(targetArray,false,true,false);
			utag.view({
				"site_section2":"",
				"site_section3": CURRENT_FILTER
			});
		}else{
			alert('No styles in selected region');
		}

		//var result = filterBy('state',stateTarget);

		$('#retrieveCover_list_item').mCustomScrollbar('destroy'); 	
		$('#retrieveCover_list_item').slideUp('slow');
	}).on('mouseover',function(){
		getInsideDropdownItem = true;
	}).on('mouseout',function(){
		getInsideDropdownItem = false;
	});


	$('.detailView').on('click','.fa-facebook',function(){
		utag.link({ "click_id": "share-facebook" });
		var targetInfluncer = APP_DATA[targetContentGlobal];
		//var shareTitle = "Old Navy’s 50 Styles, 50 States";
		//var shareDesc = "At Old Navy, we believe in fashion for all — so we challenged a style star in every state to rep their area’s personal style. Click through & explore your state on our interactive map.";
		var shareImage = targetInfluncer.influencer_image;
		var shareUri = "http://people.staging.secondthought.com/50styles50states/?xid=fbshare_people-branded-oldnavy%26influencerId=" + targetInfluncer.influencer_id +"%26shareImage=" + shareImage;
		//console.log(shareUri);
		var facebookUri = "https://www.facebook.com/sharer/sharer.php?u=" + shareUri;
		window.open(facebookUri);
	});

	$('.detailView').on('click','.fa-twitter',function(){
		utag.link({ "click_id": "share-twitter" });
		var targetInfluncer = APP_DATA[targetContentGlobal];
		var shareTitle = "Old Navy’s 50 Styles, 50 States";
		var shareDesc = "At Old Navy, we believe in fashion for all — so we challenged a style star in every state to rep their area’s personal style. Click through & explore your state on our interactive map.";
		var shareImage = targetInfluncer.influencer_image;
		var shareUri = "http://people.staging.secondthought.com/50styles50states/?xid=twittershare_people-branded-oldnavy%26influencerId=" + targetInfluncer.influencer_id  +"%26shareImage=" + shareImage;
		//console.log(shareUri);
		var twitterText = "Old Navy’s 50 Styles, 50 States";
		var twitterUri = "https://twitter.com/intent/tweet?text=" + shareTitle + " " + shareUri;
		window.open(twitterUri);
	});


	$('.detailView').on('click','.fa-pinterest-p',function(){
		//debugger;
		//alert(targetNodeGlobal);
		utag.link({ "click_id": "share-pinterest" });
		var targetInfluncer = APP_DATA[targetContentGlobal];
		var shareTitle = targetInfluncer.influencer_name;
		var shareDesc = "Old Navy’s 50 Styles, 50 States. We believe in fashion for all — so we challenged a style star in every state to rep their area’s personal style. Click through %26 see your state on our interactive map.";
		var shareImage = targetInfluncer.influencer_image;
		var shareUri = currentUri + "?xid=pinterestshare_people-branded-oldnavy%26influencerId=" + targetInfluncer.influencer_id;
		shareImage = currentUri + "images/share/" +shareImage;
		var pinterstUri = "https://www.pinterest.com/pin/create/button/?url="+ shareUri +"&media="+ shareImage +"&description=" + shareDesc;
		window.open(pinterstUri);
	});

	


});