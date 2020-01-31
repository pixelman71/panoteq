<div id="block_myaccount_infos" class="col-xs-12 col-md-4 col-lg-2 col-xl-2 links wrapper">
	<div class="footer_block">
  <h3 class="footer_header">
      {l s='Your account' d='Shop.Theme.CustomerAccount'}
  </h3>
  <ul class="account-list footer_list toggle-footer" id="footer_account_list">
    {foreach from=$my_account_urls item=my_account_url}
        <li>
          <a href="{$my_account_url.url}" title="{$my_account_url.title}" rel="nofollow">
            {$my_account_url.title}
          </a>
        </li>
    {/foreach}
    {hook h='displayMyAccountBlock'}
	</ul>
</div>
</div>
