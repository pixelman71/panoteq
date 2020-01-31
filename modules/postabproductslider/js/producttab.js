jQuery(document).ready(function($) {

	$(".tab_content").hide();
	$(".tab_content:first").show(); 

	$("ul.tabs_slider li span").click(function() {
		$("ul.tabs_slider li").removeClass("active");
		$(this).parent().addClass("active");
		$(".tab_content").hide();
		var activeTab = $(this).parent().attr("rel"); 
		$("#"+activeTab) .fadeIn().addClass("animatetab");  
	});
	
	if(POS_HOME_PRODUCTTAB_PAGINATION==null || POS_HOME_PRODUCTTAB_PAGINATION =="") {POS_HOME_PRODUCTTAB_PAGINATION = false} else { POS_HOME_PRODUCTTAB_PAGINATION = true}
	if(POS_HOME_PRODUCTTAB_NAV==null || POS_HOME_PRODUCTTAB_NAV =="") {POS_HOME_PRODUCTTAB_NAV = false} else {POS_HOME_PRODUCTTAB_NAV = true}
	var test=[0, 1 ,2, 3];
	test.forEach(function(j) {
		$(".productTabContent" + j).owlCarousel({
			items :POS_HOME_PRODUCTTAB_ITEMS,
			slideSpeed: POS_HOME_PRODUCTTAB_SPEED,
			pagination :POS_HOME_PRODUCTTAB_PAGINATION,
			navigation : POS_HOME_PRODUCTTAB_NAV,
			scrollPerPage: true,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [991,3],
			itemsTablet: [767,2],
			itemsMobile : [480,1]
		});
		
	});
});
