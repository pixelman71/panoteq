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

<div class="heading_step">
    <h2 class="step2_title">{l s='Review Migrate' mod='ets_pres2pres'}</h2>
    <span>{l s='Please review and confirm the migration before processing it!' mod='ets_pres2pres'}</span>
</div>
<div class="data-to-export col-sm-6">
    <div class="data-to-export-content">
    <div class="title_color">{l s='Selected data to migrate' mod='ets_pres2pres'}</div>
    <ul class="list-data-to-import">
        {if $ets_pres2pres_import}
            {foreach from=$ets_pres2pres_import item='data_import'}
                {if $data_import!='page_cms'}
                <li>
                    <div class="items_left col-xs-6 col-sm-7">
                    {if $data_import=='employees'}
                        <i class="i-employees"></i> {l s='Employees' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='categories'}
                        <i class="i-categories"></i> {l s='Product categories' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='manufactures'}
                        <i class="i-manufactures"></i> {l s='Manufacturers' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='suppliers'}
                        <i class="i-suppliers"></i> {l s='Suppliers' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='products'}
                        <i class="i-products"></i> {l s='Products' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='customers'}
                        <i class="i-customers"></i> {l s='Customers' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='carriers'}
                        <i class="i-carriers"></i> {l s='Carriers' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='cart_rules'}
                        <i class="i-cart_rules"></i> {l s='Cart rules' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='catelog_rules'}
                        <i class="i-catelog_rules"></i> {l s='Catalog rules' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='orders'}
                        <i class="i-orders"></i> {l s='Orders' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='CMS_categories'}
                        <i class="i-CMS_categories"></i> {l s='CMS categories' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='CMS'}
                        <i class="i-CMS"></i> {l s='CMSs' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='messages'}
                        <i class="i-messages"></i> {l s='Contact form messages' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='vouchers'}
                        <i class="i-vouchers"></i> {l s='Vouchers' mod='ets_pres2pres'}
                    {/if}
                    {if $data_import=='shops'}
                        <i class="i-shops"></i> {l s='Multi shops' mod='ets_pres2pres'}
                    {/if}
                    </div>
                    <div class="items_right col-xs-6 col-sm-5">
                        <span class="items_right_content">
                            {if $data_import=='cms' && isset($assign['page_cms'])}
                                {$assign[$data_import]+$assign['page_cms']|escape:'html':'UTF-8'}
                            {else}
                                {$assign[$data_import]|escape:'html':'UTF-8'}
                            {/if} 
                            {if $assign[$data_import]<=1}
                                <span class="i_item">{l s='item' mod='ets_pres2pres'}</span>
                            {else}
                                <span class="i_item">{l s='items' mod='ets_pres2pres'}</span>
                            {/if}
                        </span>
                    </div>
                </li>
                {/if}
            {/foreach}
        {/if}
    </ul>
    </div>
</div>
<div class="step4_right col-sm-6">
    <div class="data-format-to-import">
        
        <div class="title_color">{l s='Selected migrate option' mod='ets_pres2pres'}</div>
        <div class="data-to-export-content">
        <ul>
            <li>
                <div class="items_left col-xs-6 col-sm-6">
                    {l s='Delete data' mod='ets_pres2pres'}
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {if $ets_pres2pres_import_delete}{l s='Yes' mod='ets_pres2pres'}
                    {else}{l s='No' mod='ets_pres2pres'}{/if}
                </div>
            </li>
            <li>
                <div class="items_left col-xs-6 col-sm-6">
                {l s='Force ID' mod='ets_pres2pres'}
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {if $ets_pres2pres_import_force_all_id}{l s='Yes' mod='ets_pres2pres'}
                    {else}{l s='No' mod='ets_pres2pres'}{/if}
                </div>
            </li>
            {if in_array('employees',$ets_pres2pres_import) || in_array('customers',$ets_pres2pres_import)}
                <li>
                    <div class="items_left col-xs-6 col-sm-6">
                        {l s='Keep customer passwords' mod='ets_pres2pres'}
                    </div>
                    <div class="items_right col-xs-6 col-sm-6">
                        {if $ets_regenerate_customer_passwords}{l s='No' mod='ets_pres2pres'}
                        {else}{l s='Yes' mod='ets_pres2pres'}{/if}
                    </div>
                </li>
            {/if}
        </ul>
        </div>
    </div>
    <div class="data-format-to-import">
         <div class="title_color">{l s='Source server information' mod='ets_pres2pres'}</div>
        <div class="data-to-export-content">
        <ul>
            <li>
                <div class="items_left col-xs-6 col-sm-6">
                    {l s='Site URL ' mod='ets_pres2pres'}
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {if count($link_sites)>1}
                    {foreach from=$link_sites key='key' item='link_site'}
                        <p>{l s='Shop' mod='ets_pres2pres'}{$key+1|intval}: &nbsp;<a target="_blank" href="{$link_site|escape:'html':'UTF-8'}">{$link_site|escape:'html':'UTF-8'}</a></p>
                    {/foreach}
                {else}
                    <a target="_blank" href="{$link_sites[0]|escape:'html':'UTF-8'}">{$link_sites[0]|escape:'html':'UTF-8'}</a>
                {/if}
                
                </div>
            </li>
            <li>
                <div class="items_left col-xs-6 col-sm-6">
                    {l s='Platform ' mod='ets_pres2pres'}
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {$platform|escape:'html':'UTF-8'}
                </div>
            </li>
            <li>
                <div class="items_left col-xs-6 col-sm-6">
                    {l s='Prestashop version ' mod='ets_pres2pres'}
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {$vertion|escape:'html':'UTF-8'}
                </div>
            </li>
        </ul>
        </div>
    </div>
</div>
<div class="alert alert-warning">
    {l s='You are going to make big changes to website database and images.' mod='ets_pres2pres'}
    {l s='Make sure you have a complete backup of your website (both files and database)' mod='ets_pres2pres'}
</div>
<div class="form-group">
    <div class="checkbox col-xs-12">
        <label for="have_made_backup" class="one-line">
            <input id="have_made_backup" name="have_made_backup" type="checkbox"/><span class="data_checkbox_style"><i class="icon icon-check"></i></span> {l s='I have made a complete backup of this website' mod='ets_pres2pres'}
        </label>
    </div>
</div>
