<div id="language_selector" class="localiz_block dropdown js-dropdown">
      <span class="expand-more" data-toggle="dropdown">
		{$current_language.name_simple}
		<i class="fa-angle-down"></i>
	  </span>
      <ul class="dropdown-menu">
        {foreach from=$languages item=language}
          <li {if $language.id_lang == $current_language.id_lang} class="current" {/if}>
            <a href="{url entity='language' id=$language.id_lang}" class="dropdown-item">{$language.name_simple}</a>
          </li>
        {/foreach}
      </ul>
</div>
