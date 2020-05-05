<!--- Author : Posthemes.com -->

<div id="instagram_block_home" class="block">
	<div class="container">
		<div class="title_instagram">
			<h2><span>{l s='#Wenro' mod='posinstagramblock'}</span>{l s='.Lookbook' mod='posinstagramblock'}</h2>
			<div class="des_intagram"><span>{l s='View our 2016 lookbook feed' mod='posinstagramblock'}</span>
			<a href="https://www.instagram.com/{$username}/" target="_blank"  >{l s='Follow our instagram' mod='posinstagramblock'}</a>
			</div>
		</div>
	</div>
	<div class="content_block row pos-content">
		{foreach from=$instagrams item=instagram}
		<div class="item-instagram">
			<a data-fancybox-group="gallery" class="fancybox" href="{$instagram['image']}" style="display: block;"><img src="{$instagram['low_resolution']}" alt="" /></a>
		</div>
		{/foreach}
	</div>
	<div class="text-bottom"><span>{l s='instagram -- @wenro' mod='posinstagramblock'}</span></div>
</div>
<script>    
    $(document).ready(function ($) {
					
	$("#instagram_block_home .content_block").owlCarousel({
		items : {$home_items},
        itemsDesktop : [1199, 5],
        itemsDesktopSmall : [991, 4],
        itemsTablet : [767, 3],
        itemsMobile : [479, 2],
		pagination:false,
	});
	$('#instagram_block_home .fancybox').fancybox({
		'hideOnContentClick': true,
		'prevEffect'		: 'none',
		'nextEffect	'	: 'none',
		'openEffect'    : 'elastic',
		'closeEffect'   : 'elastic'
	});
						
});
</script>


