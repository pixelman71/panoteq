{block name='social_sharing'}
  {if $social_share_links}
    <div class="social-sharing">
      <span>{l s='Share' d='Shop.Theme.Actions'}</span>
      <ul>
        {foreach from=$social_share_links item='social_share_link'}
          <li><a href="{$social_share_link.url}" title="{$social_share_link.label}" target="_blank"><i class="fa-{$social_share_link.class}"></i></a></li>
        {/foreach}
      </ul>
    </div>
  {/if}
{/block}
