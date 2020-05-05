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
<div class="migrate_history sang">
    <div class="breadcrum_migrate">
        <div class="breadcrum_migrate_content">
            <a href="{$link->getAdminLink('AdminPresToPresGeneral',true)|escape:'html':'UTF-8'}" class="home">
                <i class="fa fa-home"></i> {l s='Home' mod='ets_pres2pres'}
            </a> 
            <i class="fa fa-angle-double-right"></i> 
            <span>{l s='History' mod='ets_pres2pres'}</span>
        </div>
        <div class="breadcrum_migrate-left-block">
            {hook h='pres2presLeftBlok'}
        </div>
    </div>
    <div class="dtm-right-block">
        <div id="import_history" class="panel tab_content import{if $tab_history=='import'} active{/if}">
            {if $imports}
                <table class="import_history_content import">
                    <tr>
                        <td>{l s='Migration ID' mod='ets_pres2pres'}</td>
                        <td>{l s='Migration data' mod='ets_pres2pres'}</td>
                        <td>{l s='Migration details' mod='ets_pres2pres'}</td>
                        <td>{l s='Action' mod='ets_pres2pres'}</td>
                    </tr>
                    {foreach from=$imports item='import'}
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
                    {/foreach}
                </table>
                {if $link_more && $imports|count >= $per_page}<div class="load_more import">
                    <a class="load_more_import import btn btn-primary" href="{$link_more|cat:'&load_more=import' nofilter}" title="{l s='Load more' mod='ets_pres2pres'}">{l s='Load more' mod='ets_pres2pres'}</a>
                </div>{/if}
            {else}
                <div class="alert alert-warning no-have-history">{l s='Migration history is empty' mod='ets_pres2pres'}</div>
            {/if}
        </div>
    </div>
    <div class="dtm-clearfix"></div>
</div>