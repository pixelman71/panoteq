{if $testimonials}
<div class="testimonials_container">

	<div class="container">

		<div class="pos_title_homepage">
			<h2>{l s='Testimonials' d='Modules.Postestimonials.Shop'}</h2>
		</div>

		<div class="block-content pos_content">
			<ul class="thumb">
			{$j=0} 
			  {foreach from=$testimonials name=myLoop item=testimonial}
				 {if $testimonial.active == 1}
						{if in_array($testimonial.media_type,$arr_img_type)}
							<li class="testithumb{$j}" onclick="testislider({$j})">
								<img src="{$mediaUrl}{$testimonial.media}" alt="Image Testimonial">
							</li>
						{/if}
				{/if}
				{$j = $j + 1} 
			  {/foreach}
			</ul>
			<div class="testimonialsSlide">
			  {foreach from=$testimonials name=myLoop item=testimonial}
				{if $testimonial.active == 1}
					{if $smarty.foreach.myLoop.index % 1 == 0 || $smarty.foreach.myLoop.first }
					<div class="item-testimonials">
					{/if}	
						<div class="item">						
							<div class="content_author">
								<div class="content_test">
									<p class="des_email">{$testimonial.email}</p>
									<p class="des_testimonial">{$testimonial.content|escape:'html':'UTF-8'}</p>
									<p class="des_namepost"><span>{$testimonial.name_post}</span></p>
								</div>							
							</div>
						
						</div>
					{if $smarty.foreach.myLoop.iteration % 1 == 0 || $smarty.foreach.myLoop.last  }
					</div>
					{/if}
				{/if}
			  {/foreach}
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	var testi = $(".testimonialsSlide");
		testi.owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [991,1],
		itemsTablet: [767,1],
		itemsMobile : [479,1],
		autoPlay : true,
		stopOnHover: true,
		slideSpeed : 1000,
		addClassActive: true,
		scrollPerPage: true,
		navigation :true,
		pagination : false,
		afterMove: function(){
			x = $( ".block-content .owl-item" ).index( $( ".block-content .testimonialsSlide .active" ));
			var testithumb = ".testithumb"+x;
			$(".block-content .thumb li").removeClass('active');
			$(testithumb).addClass('active');
		}
	});
	var owlslider = $(".block-content .testimonialsSlide").data('owlCarousel');
	function testislider(x)
	{
		owlslider.goTo(x)
	}
	var y= Math.round($('.testimonialsSlide .owl-item').length/2-1);
		owlslider.goTo(y)

</script>

 {/if}