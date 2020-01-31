<div id="currency_selector" class="localiz_block dropdown js-dropdown">
    <span class="expand-more" data-toggle="dropdown">
		{$current_currency.iso_code}
		<i class="fa-angle-down"></i>
	</span>
    <ul class="dropdown-menu">
      {foreach from=$currencies item=currency}
        <li {if $currency.current} class="current" {/if}>
          <a title="{$currency.name}" rel="nofollow" href="{$currency.url}" class="dropdown-item"> {$currency.sign} {$currency.name}</a>
        </li>
      {/foreach}
    </ul>
</div>