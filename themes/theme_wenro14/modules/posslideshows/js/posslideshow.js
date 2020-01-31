jQuery(document).ready(function ($) {
		$(document).off('mouseenter').on('mouseenter', '.pos-slideshow', function(e){
		$('.pos-slideshow .timethai').addClass('pos_hover');
		});

		 $(document).off('mouseleave').on('mouseleave', '.pos-slideshow', function(e){
		   $('.pos-slideshow .timethai').removeClass('pos_hover');
		 });
        $('#pos-slideshow-home').nivoSlider({
			effect: 'random',
			slices: 15,
			boxCols: 8,
			boxRows: 4,
			animSpeed: 600,
			pauseTime: POSSLIDESHOW_SPEED,
			startSlide: 0,
			directionNav: true,
			controlNav: true,
			controlNavThumbs: false,
			pauseOnHover: true,
			manualAdvance: false,
			prevText: '<i class="fa-angle-left"></i>',
			nextText: '<i class="fa-angle-right"></i>',
                        afterLoad: function(){
                         $('.pos-loading').css("display","none");
						 	 var top_position = Math.round($('.pos-slideshow').height()/2) + $('#header').height();
							$('.open-sidebar').css('top', top_position+'px');
							
							$(window).resize(function() {
							 var top_position = Math.round($('.pos-slideshow').height()/2) + $('#header').height();
							 $('.open-sidebar').css('top', top_position+'px');
							});
                        },     
                        beforeChange: function(){ 
                            $('.bannerSlideshow1').removeClass("pos_in"); 
                            $('.bannerSlideshow2').removeClass("pos_in"); 
                            $('.bannerSlideshow3').removeClass("pos_in"); 
                        }, 
                        afterChange: function(){ 
                             $('.bannerSlideshow1').addClass("pos_in"); 
                            $('.bannerSlideshow2').addClass("pos_in"); 
                            $('.bannerSlideshow3').addClass("pos_in"); 
                        }
 		});
    });