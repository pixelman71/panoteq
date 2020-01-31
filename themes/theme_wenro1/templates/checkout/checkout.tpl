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
	  <div class="header-container">
		  <header id="header">
			{block name='header'}
			  {include file='_partials/header.tpl'}
			{/block}
		  </header>
			{block name='breadcrumb'}
				{include file='_partials/breadcrumb.tpl'}
			{/block}
	  </div>

    {block name='notifications'}
      {include file='_partials/notifications.tpl'}
    {/block}

    <section id="wrapper">
      <div class="container inner-wrapper">

      {block name='content'}
        <section id="content">
          <div class="row">
            <div class="col-md-8">
              {render file='checkout/checkout-process.tpl' ui=$checkout_process}
            </div>
            <div class="col-md-4">

              {include file='checkout/_partials/cart-summary.tpl' cart = $cart}

              {hook h='displayReassurance'}
            </div>
          </div>
        </section>
      {/block}
      </div>
    </section>
	{hook h='displayBrandSlider'}
    <footer id="footer">
      {block name='footer'}
        {include file='checkout/_partials/footer.tpl'}
      {/block}
    </footer>

    </main>
    {hook h='displayBeforeBodyClosingTag'}

  </body>

</html>
