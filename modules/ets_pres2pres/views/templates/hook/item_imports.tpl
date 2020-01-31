{*
* 2007-2019 ETS-Soft ETS-Soft
*
* NOTICE OF LICENSE
*
* This file is not open source! Each license that you purchased is only available for 1 wesite only.
* If you want to use this file on more websites (or projects), you need to purchase additional licenses.
* You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please, contact us for extra customization service at an affordable price
*
*  @author ETS-Soft <etssoft.jsc@gmail.com>
*  @copyright  2007-2019 ETS-Soft ETS-Soft
*  @license    Valid for 1 website (or project) for each purchase of license
*  International Registered Trademark & Property of ETS-Soft
*}
{if isset($imports) && $imports}{foreach from=$imports item='import'}
	<tr>
		<td>{$import.id_import_history|intval}</td>
		<td>
			{$import.content nofilter}
		</td>
		<td>
			{$import.date_import|escape:'html':'UTF-8'}
			{if $import.cookie_key &&  (in_array('customers',explode(',',$import.data)) || in_array('employees',explode(',',$import.data)))}
			<br /><span class="cookie_key" >_COOKIE_KEY_ {l s='of source website' mod='ets_pres2pres'}: <span>{$import.cookie_key|escape:'html':'UTF-8'}</span>
                                    <p>{l s='Install' mod='ets_pres2pres'} <a href="{$mod_dr_pres2pres|escape:'html':'UTF-8'}plugins/ets_pres2prespwkeeper.zip" target="_blank">{l s='"Prestashop Password Keeper"' mod='ets_pres2pres'}</a> {l s='to recover customer passwords' mod='ets_pres2pres'}</p>
                                {/if}
		</td>
		<td>
			{if $pres2pres_import_last==$import.id_import_history&&!$import.import_ok}
				<a href="{$link->getAdminLink('AdminPresToPresImport',true)|escape:'html':'UTF-8'}&resumeImport&id_import_history={$import.id_import_history|intval}"><i class="icon icon-undo"> </i> {l s='Resume migration' mod='ets_pres2pres'}</a>
			{/if}
			<a href="{$link->getAdminLink('AdminPresToPresImport',true)|escape:'html':'UTF-8'}&restartImport&id_import_history={$import.id_import_history|intval}"><i class="icon icon-refresh"> </i> {l s='Restart migration' mod='ets_pres2pres'}</a>
			<a href="{$link->getAdminLink('AdminPresToPresHistory',true)|escape:'html':'UTF-8'}&deleteimporthistory&id_import_history={$import.id_import_history|intval}"><i class="icon icon-trash"> </i> {l s='Delete' mod='ets_pres2pres'}</a>
			{if $import.new_passwd_customer}
				<a href="{$link->getAdminLink('AdminPresToPresHistory',true)|escape:'html':'UTF-8'}&downloadpasscustomer&id_import_history={$import.id_import_history|intval}"><i class="icon icon-cloud-download"> </i>  {l s='Download new customer passwords' mod='ets_pres2pres'}</a>
			{/if}
			{if $import.new_passwd_employee}
				<a href="{$link->getAdminLink('AdminPresToPresHistory',true)|escape:'html':'UTF-8'}&downloadpassemployee&id_import_history={$import.id_import_history|intval}"><i class="icon icon-cloud-download"> </i> {l s='Download new employee passwords' mod='ets_pres2pres'}</a>
			{/if}
		</td>
	</tr>
{/foreach}{/if}