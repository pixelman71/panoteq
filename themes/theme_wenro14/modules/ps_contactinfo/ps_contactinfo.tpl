<div class="block-contact col-lg-4 col-xl-2 links wrapper">
	<div class="footer_block">
		<h3 class="footer_header">{l s='Store' d='Shop.Theme'}</h3>
		<div class="ft_contact_info toggle-footer">
			<div class="info_box">
				<i class="fa-map-marker"></i>
				{$contact_infos.address.formatted nofilter}
			</div>
			{if $contact_infos.phone}
				<div class="info_box">
					<i class="fa-phone"></i>
						{* [1][/1] is for a HTML tag. *}
						{l s='[1]%phone%[/1]'
						sprintf=[
						'[1]' => '<span>',
						'[/1]' => '</span>',
						'%phone%' => $contact_infos.phone
						]
						d='Shop.Theme'
						}
				</div>
			{/if}
			{if $contact_infos.fax}
				<div class="info_box">
					<i class="fa-fax"></i>
						{l
						s='[1]%fax%[/1]'
						sprintf=[
						'[1]' => '<span>',
						'[/1]' => '</span>',
						'%fax%' => $contact_infos.fax
						]
						d='Shop.Theme'
						}
				</div>
			{/if}
			{if $contact_infos.email}
				<div class="info_box">
					<i class="fa-envelope"></i>
						{l
						s='[1]%email%[/1]'
						sprintf=[
						'[1]' => '<span>',
						'[/1]' => '</span>',
						'%email%' => $contact_infos.email
						]
						d='Shop.Theme'
						}
				</div>
			{/if}
		</div>
	</div>
</div>