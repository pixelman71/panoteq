<div id="user_info_top" class="localiz_block">
	<span class="expand-more">
		{l s='my account' d='Shop.Theme.CustomerAccount'}
	 </span>
	 <ul> 
	 	<li>
			<a href="{$my_account_url}" rel="nofollow" class="dropdown-item">{l s='my account' d='Shop.Theme.CustomerAccount'}</a>
		</li>
		<li>
			<a href="{$link->getPageLink("cart", true)|escape:"html":"UTF-8"}" class="dropdown-item">{l s='Checkout' d='Shop.Theme.Actions'}</a>
		</li>
		<li>
			{if $logged}
			  <a
				class="logout hidden-sm-down dropdown-item"
				href="{$logout_url}"
				rel="nofollow"
			  >
				{l s='Sign out' d='Shop.Theme.Actions'}
			  </a>
			{else}
			  <a
				href="{$my_account_url}"
				title="{l s='Log in to your customer account' d='Shop.Theme.CustomerAccount'}"
				rel="nofollow" class="dropdown-item"
			  >
				{l s='Sign in' d='Shop.Theme.Actions'}
			  </a>
			{/if}
		</li>
	
	</ul>
</div>