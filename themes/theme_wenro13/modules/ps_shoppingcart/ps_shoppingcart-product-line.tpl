<div class="img_content">
	<img class="product-image img-responsive" src="{$product.cover.small.url}" alt="{$product.cover.legend}" title="{$product.cover.legend}">
	<span class="product-quantity">{$product.quantity}x</span>
</div>
<div class="right_block">
	<span class="product-name">{$product.name}</span>
	<span class="product-price">{$product.price}</span>
	<a  class="remove-from-cart"
		rel="nofollow"
		href="{$product.remove_from_cart_url}"
		data-link-action="remove-from-cart"
		title="{l s='Remove from cart' d='Shop.Theme.Actions'}"
	>
		<i class="fa-remove"></i>
	</a>
	<div class="attributes_content">
		{foreach from=$product.attributes item="property_value" key="property"}
		  <span><strong>{$property}</strong>: {$property_value}</span><br>
		{/foreach}
	</div>
</div>