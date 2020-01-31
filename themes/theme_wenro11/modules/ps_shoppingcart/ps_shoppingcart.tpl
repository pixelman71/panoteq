<div class="blockcart cart-preview dropdown js-dropdown" data-refresh-url="{$refresh_url}">
  <div class="header" data-target="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
    <a rel="nofollow" href="{$cart_url}">
<!--       {l s='Your bag: Total' d='Shop.Theme.Actions'} {$cart.totals.total.value} -->
	  <span class="item_total">{$cart.products_count}</span>
    </a>
  </div>
  <div class="body dropdown-menu">
    <ul>
      {foreach from=$cart.products item=product}
        <li>{include 'module:ps_shoppingcart/ps_shoppingcart-product-line.tpl' product=$product}</li>
      {/foreach}
    </ul>
	<div class="price_content">
		<div class="cart-subtotals">
		  {foreach from=$cart.subtotals item="subtotal"}
			<div class="{$subtotal.type} price_inline">
			  <span class="label">{$subtotal.label}</span>
			  <span class="value">{$subtotal.value}</span>
			</div>
		  {/foreach}
		</div>
		<div class="cart-total price_inline">
		  <span class="label">{$cart.totals.total.label}</span>
		  <span class="value">{$cart.totals.total.value}</span>
		</div>
    </div>
	<div class="checkout">
		<a href="{$cart_url}" class="btn btn-primary">{l s='checkout' d='Shop.Theme.Actions'}</a>
	</div>
  </div>
</div>
