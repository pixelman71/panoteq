<!--- Author : Posthemes.com -->

<div id="instagram_block" class="footer_block col-xs-12 col-md-6 col-sm-12 col-lg-4">
	<h3>{l s='Instagram' mod='posinstagramblock'}</h3>
	<div class="item-instagram footer_list toggle-footer" style="margin:0 -4px;" >
		{foreach from=$instagrams item=instagram}
			<a class="fancybox col-xs-{12/$row}" href="{$instagram['image']}" data-fancybox-group="gallery" style="padding:4px;"><img class="instagram_image" src="{$instagram['thumbnail']}" alt="" style="max-width: 100%;"/></a>
		{/foreach}
		<div class="our_instagram">
		<a href="https://www.instagram.com/{$username}/" target="_blank"  ><span>{l s='Follow our instagram' mod='posinstagramblock'}</span></a>
		</div>
	</div>
	
</div>
<script>    
    $(document).ready(function ($) {
					
	$('#instagram_block .fancybox').fancybox({
		'hideOnContentClick': true,
		'prevEffect'		: 'none',
		'nextEffect	'	: 'none',
		'openEffect'    : 'elastic',
		'closeEffect'   : 'elastic'
	});
						
});
</script>


