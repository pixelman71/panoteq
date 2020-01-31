
<div class="footer_block col-xs-12 wrapper">
  {assign var=_expand_id value=10|mt_rand:100000}
  <ul class="links_list" id="footer_sub_menu_{$_expand_id}">
  {foreach $linkBlocks as $linkBlock}
	{foreach $linkBlock.links as $link}
	  <li>
		<a
			id="{$link.id}-{$linkBlock.id}"
			class="{$link.class}"
			href="{$link.url}"
			title="{$link.description}">
		  {$link.title}
		</a>
	  </li>
	{/foreach}
	{/foreach}
  </ul>
</div>
