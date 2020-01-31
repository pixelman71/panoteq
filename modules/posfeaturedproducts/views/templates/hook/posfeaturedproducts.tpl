
<div class="pos-featured-products  product_block_container" 
		data-items="{$slider_options.number_item}" 
		data-speed="{$slider_options.speed_slide}"
		data-autoplay="{$slider_options.auto_play}"
		data-time="{$slider_options.auto_time}"
		data-arrow="{$slider_options.show_arrow}"
		data-pagination="{$slider_options.show_pagination}"
		data-move="{$slider_options.move}"
		data-pausehover="{$slider_options.pausehover}"
		data-md="{$slider_options.items_md}"
		data-sm="{$slider_options.items_sm}"
		data-xs="{$slider_options.items_xs}"
		data-xxs="{$slider_options.items_xxs}">
	<div class="container">
		{if $title}
		<div class="pos_title">
			 <h2>
			{l s='Featured products' mod='posfeaturedproducts'}
			</h2>	
		</div>
		{/if}
		<div class="row">
			<div class="col-lg-6 col-sm-12 col-md-12 col-xs-12">
				<div class="banner-box">
					<a href="{$image_link}"><img class="img-responsive" src="{$banner_img|escape:'htmlall':'UTF-8'}" alt="" title=""/></a>
				</div>
			</div>	
			<div class="col-lg-6 col-sm-12 col-md-12 col-xs-12">
				{$rows= $slider_options.rows}
				<div class=" pos_content row">
					<div class="feature-item">
					{foreach from=$products item=product name=myLoop}
						{if $smarty.foreach.myLoop.index % $rows == 0 || $smarty.foreach.myLoop.first }
							<div class="item-product">
						{/if}
						
							{include file="catalog/_partials/miniatures/product.tpl" product=$product}
							
						{if $smarty.foreach.myLoop.iteration % $rows == 0 || $smarty.foreach.myLoop.last  }
							</div>
						{/if}
					{/foreach}
					</div>
				</div>
			</div>
		</div>	
	</div>	
</div>
