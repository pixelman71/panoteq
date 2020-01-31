{*
* 2007-2018 ETS-Soft
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
* needs, please contact us for extra customization service at an affordable price
*
*  @author ETS-Soft <etssoft.jsc@gmail.com>
*  @copyright  2007-2019 ETS-Soft
*  @license    Valid for 1 website (or project) for each purchase of license
*  International Registered Trademark & Property of ETS-Soft
*}
<div class="step6_success">
    <span class="success_i"></span>
    <h3 class="tit_success"><b>{l s='Migration is completed!' mod='ets_pres2pres'}</b></h3>
    <p class="sub_success">{l s='You`re almost done, please do some final tweaks before putting your website to live' mod='ets_pres2pres'}</p>
</div>

<div class="step6_listbutton">
    <a class="ets_pres2pres_clearcache" target="_blank" href="{$link_cache|escape:'html':'UTF-8'}"><i class="fa fa-trash-o"></i> {l s='Clear cache' mod='ets_pres2pres'}</a>
    <a class="ets_pres2pres_friendly_url" target="_blank" href="{$link_seo|escape:'html':'UTF-8'}"><i class="fa fa-random"></i> {l s='Regenerate friendly URL' mod='ets_pres2pres'}</a>
    <a class="ets_pres2pres_search" target="_blank" href="{$link_serach_index|escape:'html':'UTF-8'}"><i class="fa fa-wrench"></i> {l s='Re-build the entire index' mod='ets_pres2pres'}</a>
</div>
{if $OLD_COOKIE_KEY && in_array('customers',$import_datas)}
    <div class="help_block_step6">
        <h4><i class="fa fa-cogs"></i> {l s='Keep customer passwords' mod='ets_pres2pres'}</h4>
        <ul>
            <li><span class="6_step">{l s='Step 1:' mod='ets_pres2pres'}</span> {l s='Download ' mod='ets_pres2pres'} <a href="{$mod_dr_pres2pres|escape:'html':'UTF-8'}plugins/ets_pres2prespwkeeper.zip"><b style="color:#d57897">"{l s='Prestashop Password Keeper' mod='ets_pres2pres'}"</b></a>{l s='(it is free)' mod='ets_pres2pres'}</li>
            <li><span class="6_step">{l s='Step 2:' mod='ets_pres2pres'}</span> {l s='Install that module on [1]this site[/1] (Target site)' tags=['<b style="color:#6d5b97">'] mod='ets_pres2pres'}</li>
            <li><span class="6_step">{l s='Step 3:' mod='ets_pres2pres'}</span> {l s='Copy this _COOKIE_KEY_ of source website: ' mod='ets_pres2pres'} <span class="cookie_key">{$OLD_COOKIE_KEY|escape:'html':'UTF-8'}</span><br /> {l s='then paste into [1]"Prestashop Password Keeper"[/1] module configuration to keep customer passwords' tags=['<b style="color:#d57897">'] mod='ets_pres2pres'}</li>
        </ul>
    </div>
{/if}
{if in_array('shops',$import_datas)}
    <div class="help_block_step6">
        <h4><i class="fa fa-link"></i> {l s='Setup multiple shops URL' mod='ets_pres2pres'}</h4>
        <ul>
            <li>{l s='1. Navigate to [1]"Advanced parameters > Multistore"[/1] (Refresh back office if you do not see the "Multistore" link)' tags=['<a class="icion_link">'] mod='ets_pres2pres'}</li>
            <li>{l s='2. In [1]"Multistore tree"[/1] box, click on the new shop names' tags=['<b>'] mod='ets_pres2pres'}</li>
            <li>{l s='3. Click on [1]"Click here to set a URL for this shop"[/1] link to set shop URL' tags=['<b>'] mod='ets_pres2pres'}</li>
            <li>{l s='4. In [1]"Virtual URL"[/1] box, enter valid parameters to configure your shop URL then save' tags=['<b>'] mod='ets_pres2pres'}</li>
        </ul>
        <a class="step6_redmore" href="{$link_multi_shop|escape:'html':'UTF-8'}">{l s='Read more detail here' mod='ets_pres2pres'} >></a>
    </div>
{/if}