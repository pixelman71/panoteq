{*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @version  Release: $Revision$
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<div class="poslistcategories">
	<div class="pos_title">
		<h2>{l s='Shop by collection' mod='poslistcategories'}</h2>
	</div>
	<div class="row  pos_content">
		<div class="block_content">
		{$count=0}
		{foreach from=$categories item=category name=poslistcategories}
			<div class="list-categories">
				{if $category.image}
				<div class="thumb-category">
					<a href="{$link->getCategoryLink($category['id_category'])}" target="_blank"><img src="{$link->getMediaLink("`$smarty.const._MODULE_DIR_`poslistcategories/images/`$category.image|escape:'htmlall':'UTF-8'`")}" alt="" /></a>
			
				</div>
				{/if}
				<div class="desc-listcategoreis">
					<div class="content-listcategoreis">
						<div class="name_categories">
							<a href="{$link->getCategoryLink($category['id_category'])}" target="_blank">{$category.category_name}</a>
						</div>
						{if $category.description}
						<div class="description-list">
							<div class="desc-content">
								{$category.description nofilter}
							</div>
								
						</div>
						{/if}
						<a href="{$link->getCategoryLink($category['id_category'])}" target="_blank" class="links_cate" >shop now</a>
					</div>
				</div>		
			</div>			
			{$count= $count+1}
		{/foreach}		
		</div>
	</div>	
</div>
<script type="text/javascript">
	$(document).ready(function() {
		var poslistcategories = $(".poslistcategories .block_content");
		poslistcategories.owlCarousel({
			items : {$slider_options.number_item},
			itemsDesktop : [1199,{$slider_options.items_md}],
			itemsDesktopSmall : [991,{$slider_options.items_sm}],
			itemsTablet: [767,{$slider_options.items_xs}],
			itemsMobile : [479,{$slider_options.items_xxs}],
			autoPlay :  {if $slider_options.auto_play}{if $slider_options.delay}{$slider_options.delay}{else}3000{/if}{else} false{/if},
			slideSpeed : {if $slider_options.speed_slide}{$slider_options.speed_slide}{else}1000{/if},
			addClassActive: true,
			navigation : {if $slider_options.show_arrow} true {else} false {/if},
			pagination : {if $slider_options.show_pagination} true {else} false {/if},
		});
	});
</script>
