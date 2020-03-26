<div class="img_content">
	<img class="product-image img-responsive" src="{$product.cover.small.url}" alt="{$product.cover.legend}" title="{$product.cover.legend}">
	<span class="product-quantity">{$product.quantity}x</span>
</div>
<div class="right_block">
	<span class="product-name">{$product.name}</span>
	<div class="product-name">
		{if $product.customizations|count}
			<br>
			{block name='cart_detailed_product_line_customization'}
				{foreach from=$product.customizations item="customization"}
					{foreach from=$customization.fields item="field"}
						<div class="product-customization-line row">
							<div class="col-sm-12 col-xs-12 value">
								{$field.text nofilter}
							</div>
						</div>
					{/foreach}

					<div class="modal fade customization-modal" id="product-customizations-modal-{$customization.id_customization}" tabindex="-1" role="dialog" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">{l s='Product customization' d='Shop.Theme.Catalog'}</h4>
								</div>
								<div class="modal-body">
									{foreach from=$customization.fields item="field"}
										<div class="product-customization-line row">
											<div class="col-sm-12 col-xs-12 value">
												{$field.text nofilter}
											</div>
										</div>
									{/foreach}
								</div>
							</div>
						</div>
					</div>
				{/foreach}
			{/block}
		{/if}
	</div>
	<span class="product-price">{$product.price}
	</span>
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
