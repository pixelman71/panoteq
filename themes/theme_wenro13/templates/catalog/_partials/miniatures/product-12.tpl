<article class="js-product-miniature item_in" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}" itemscope itemtype="http://schema.org/Product">
	<div class="img_block">
		{*block name='product_thumbnail'}
		  <a href="{$product.url}" class="thumbnail product-thumbnail">
			<img
			  src = "{$product.cover.bySize.home_default.url}"
			  alt = "{$product.cover.legend}"
			  data-full-size-image-url = "{$product.cover.large.url}"
			>
			{hook h="rotatorImg" product=$product}		
		  </a>
		{/block*}
		
		{block name='product_thumbnail'}
		  <div class="thumbnail product-thumbnail">
			<img
			  src = "{$product.cover.bySize.home_default.url}"
			  alt = "{$product.cover.legend}"
			  data-full-size-image-url = "{$product.cover.large.url}"
			>
			{*hook h="rotatorImg" product=$product*}		
		  </div>
		{/block}
		
		
		{block name='product_flags'}
		  <ul class="product-flag">
			{foreach from=$product.flags item=flag}
				{if $flag.type == "discount"}
					{continue}
				{/if}
				<li class="{$flag.type}"><span>{$flag.label}</span></li>
			{/foreach}
		  </ul>
		{/block}
		<ul class="add-to-links">
			<li class="cart">
				{include file='catalog/_partials/customize/button-cart.tpl' product=$product}
			</li>
<!--
			<li>
				<a href="#" class="quick-view" data-link-action="quickview" title="{l s='Quick view' d='Shop.Theme.Actions'}">{l s='Quick view' d='Shop.Theme.Actions'}</a>
			</li>
-->		
		</ul>
		{block name='product_price_and_shipping'}
			{if $product.show_price}
			  <div class="product-price-and-shipping">
				{if $product.has_discount}
				  {hook h='displayProductPriceBlock' product=$product type="old_price"}

				  <span class="regular-price">{$product.regular_price}</span>
				  {if $product.discount_type === 'percentage'}
					<span class="discount-percentage"><span>{$product.discount_percentage}</span></span>
				  {/if}
				{/if}

				{hook h='displayProductPriceBlock' product=$product type="before_price"}

				<span itemprop="price" class="price">{$product.price}</span>

				{hook h='displayProductPriceBlock' product=$product type='unit_price'}

				{hook h='displayProductPriceBlock' product=$product type='weight'}
			  </div>
			{/if}
		{/block}
	</div>
    <div class="product_desc">
      {block name='product_name'}
       <h4><a href="{$product.url}" title="{$product.name}" itemprop="name" class="product_name">{$product.name}</a></h4>
      {/block}
	 {block name='product_reviews'}
	 	<div class="hook-reviews">
        {hook h='displayProductListReviews' product=$product}
		</div>
      {/block}
	{block name='product_description_short'}
		<div class="product-desc" itemprop="description">{$product.description_short nofilter}</div>
	{/block}
	{block name='product_variants'}
			{if $product.main_variants}
			  {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
			{/if}
      {/block}
    </div>
</article>
