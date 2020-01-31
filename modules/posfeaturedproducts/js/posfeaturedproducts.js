$(document).ready(function() {
	var $featuredSlideConf = $('.pos-featured-products');
	var items       = parseInt($featuredSlideConf.attr('data-items'));
	var speed     	= parseInt($featuredSlideConf.attr('data-speed'));
	var autoPlay    = parseInt($featuredSlideConf.attr('data-autoplay'));
	var time    	= parseInt($featuredSlideConf.attr('data-time'));
	var arrow       = parseInt($featuredSlideConf.attr('data-arrow'));
	var pagination  = parseInt($featuredSlideConf.attr('data-pagination'));
	var move        = parseInt($featuredSlideConf.attr('data-move'));
	var pausehover  = parseInt($featuredSlideConf.attr('data-pausehover'));
	var md          = parseInt($featuredSlideConf.attr('data-md'));
	var sm          = parseInt($featuredSlideConf.attr('data-sm'));
	var xs          = parseInt($featuredSlideConf.attr('data-xs'));
	var xxs         = parseInt($featuredSlideConf.attr('data-xxs'));
	
	if(autoPlay==1) {
		if(time){
			autoPlay = time;
		}else{
			autoPlay = '3000';
		}
	}else{
		autoPlay = false;
	}
	if(pausehover){pausehover = true}else{pausehover=false}
	if(move){move = false}else{move=true}
	if(arrow){arrow =true}else{arrow=false}
	if(pagination==1){pagination = true}else{pagination=false}

	var featuredSlide = $(".pos-featured-products .feature-item");
	featuredSlide.owlCarousel({
		items :items,
		itemsDesktop : [1199,md],
		itemsDesktopSmall : [991,sm],
		itemsTablet: [767,xs],
		itemsMobile : [480,xxs],
		autoPlay : autoPlay ,
		slideSpeed: speed,
		stopOnHover: pausehover,
		addClassActive: true,
		scrollPerPage: move,
		navigation : arrow,
		pagination : pagination,
	});
});

