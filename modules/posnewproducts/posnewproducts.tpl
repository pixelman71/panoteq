{if count($products) > 0 && $products != null}
<div class="pos_new_product product_block_container">
	<div class="container">
		<div class="pos_title">
			<h2>{l s='New Products' mod='posnewsproducts'}</h2>
		</div>
		<div class="row pos_content">
			{$rows= $config['POS_HOME_NEW_ROWS']}
			<div class="newSlide">
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
{/if}