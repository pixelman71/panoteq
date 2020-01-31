{block name='block_social'}
  <div class="social_follow col-sm-12 col-md-4 col-lg-4 col-xs-12">  
	<h4>{l s='Follow us' d='Modules.SocialFollow.Shop'}</h4>
    <ul>
      {foreach from=$social_links item='social_link'}
        <li class="{$social_link.class}"><a href="{$social_link.url}" target="_blank">{$social_link.label}</a></li>
      {/foreach}
    </ul>
	{hook h='displayBlockFooter1'} 
  </div>
{/block}
