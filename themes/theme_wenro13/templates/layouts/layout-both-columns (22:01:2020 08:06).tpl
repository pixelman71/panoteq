{**
 * 2007-2016 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2016 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<!doctype html>
<html lang="{$language.iso_code}">

  <head>
    {block name='head'}
      {include file='_partials/head.tpl'}
    {/block}
  </head>

  <body id="{$page.page_name}" class="{$page.body_classes|classnames} {if $page.page_name != 'index'}sub-page{/if}">

    {hook h='displayAfterBodyOpeningTag'}
    <main>
      {block name='product_activation'}
        {include file='catalog/_partials/product-activation.tpl'}
      {/block}
	  <div class="header-container">
		  <header id="header">
			{block name='header'}
			  {include file='_partials/header.tpl'}
			{/block}
		  </header>
			 {if $page.page_name == 'category'}
		  	{if $category.name}
		     <div class="name_category"><h2>{$category.name}</h2></div>
			 {/if}
			 
			 {/if}
			
			{block name='breadcrumb'}
				{include file='_partials/breadcrumb.tpl'}
			{/block}
	  </div>

      {block name='notifications'}
        {include file='_partials/notifications.tpl'}
      {/block}
	 {if $page.page_name == 'index'}
	 	{hook h='displayTopColumn'}
		{hook h='displayBlockPosition1'}
		{hook h='displayBlockPosition2'}
		{hook h='displayBlockPosition3'}
	  {/if}
      <div id="wrapper">
        <div class="inner-wrapper container">
			<div class="row">
			  {block name="left_column"}
				<div id="left-column" class="col-xs-12 col-sm-4 col-md-3">TEMPLATES/LAYOUTS/LAYOUT-BOTH-COLUMNS.TPL
				  {if $page.page_name == 'product'}
					{hook h='displayLeftColumnProduct'}
				  {else}
					{hook h="displayLeftColumn"}
				  {/if}
				</div>
			  {/block}

			  {block name="content_wrapper"}
				<div id="content-wrapper" class="left-column right-column col-sm-4 col-md-6">
				  {block name="content"}
					<p>Hello world! This is HTML5 Boilerplate.</p>
				  {/block}
				</div>
			  {/block}

			  {block name="right_column"}
				<div id="right-column" class="col-xs-12 col-sm-4 col-md-3">
				  {if $page.page_name == 'product'}
					{hook h='displayRightColumnProduct'}
				  {else}
					{hook h="displayRightColumn"}
				  {/if}
				</div>
			  {/block}
			</div>
			{if $page.page_name == 'product'}
			{block name='product_accessories'}
			  {if $accessories}
				<section class="product-accessories clearfix">
					<div class="pos_title">
						<h2>{l s='related products' d='Shop.Theme.Catalog'}</h2>
					</div>
					<div class="pos_content">
						<div class="product_accessoriesslide">
							{foreach from=$accessories item="product_accessory"}
								{block name='product_miniature'}
									<div class="item-product">
										{include file='catalog/_partials/miniatures/product.tpl' product=$product_accessory}
									</div>
								{/block}
							{/foreach}
						</div>
					</div>
				</section>
			  {/if}
			{/block}

			{block name='product_footer'}
				{hook h='displayFooterProduct' product=$product category=$category}
			{/block}
			 {/if}
        </div>
		
      </div>
	 {hook h='displayBrandSlider'}
      <footer id="footer">
        {block name="footer"}
          {include file="_partials/footer.tpl"}
        {/block}
      </footer>

    </main>

    

    {hook h='displayBeforeBodyClosingTag'}
	<div class="back-top"><a href= "#" class="back-top-button"></a></div>

  </body>
</html>
