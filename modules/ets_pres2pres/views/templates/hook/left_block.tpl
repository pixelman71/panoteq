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
{if $controller=='AdminPresToPresGeneral'}
    <div class="dtm-left-block-content {if $controller=='AdminPresToPresImport'} active_step{/if}">
        <div class="alert alert-warning">
            {l s='To read more details and download the premium version of Prestashop Migrator, please ' mod='ets_pres2pres'} <a href="https://addons.prestashop.com/en/data-migration-backup/32298-prestashop-migrator-upgrade-prestashop-to-17.html">{l s='click here' mod='ets_pres2pres'}</a>
        </div>
        <div class="migrate_hearder">
            <h4>{l s='Prestashop Migrator Free version' mod='ets_pres2pres'}</h4>
            <span>{l s='Upgrade Prestashop 1.6, 1.5 or 1.4 to Prestashop 1.7 in a few clicks' mod='ets_pres2pres' }</span>
        </div>
        <ul>
            <li{if $controller=='AdminPresToPresImport'} class="active"{/if}>
                <a class="import" href="{$link->getAdminLink('AdminPresToPresImport',true)|escape:'html':'UTF-8'}">
                    <span class="dtm_tab_content">
                        <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/import.png" />
                        {l s='Migration' mod='ets_pres2pres'}
                    </span>
                    <span>{l s="Migrate old versions of Prestashop to Prestashop 1.7 (latest version)" mod='ets_pres2pres'}</span>
                </a>
            </li>
            <li{if $controller=='AdminPresToPresHistory'} class="active"{/if}>
                <a class="history" href="{$link->getAdminLink('AdminPresToPresHistory',true)|escape:'html':'UTF-8'}">
                    <span class="dtm_tab_content">
                        <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/history.png" />
                        {l s='History' mod='ets_pres2pres'}
                    </span>
                    <span>{l s='A detail list of all past migrations, allow you to resume or restart migration' mod='ets_pres2pres'}</span>
                </a>
            </li>
            <li{if $controller=='AdminPresToPresClean'} class="active"{/if}>
                <a class="cleanup" href="{$link->getAdminLink('AdminPresToPresClean',true)|escape:'html':'UTF-8'}">
                    <span class="dtm_tab_content">
                        <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/clear.png" />
                        {l s='Clean-up' mod='ets_pres2pres'}
                    </span>
                    <span>{l s='Clear migration history to release server disk space' mod='ets_pres2pres'}</span>
                </a>
            </li>
            <li{if $controller=='AdminPresToPresHelp'} class="active"{/if}>
                <a class="help" href="{$link->getAdminLink('AdminPresToPresHelp',true)|escape:'html':'UTF-8'}">
                    <span class="dtm_tab_content">
                        <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/help.png" />
                        {l s='Help' mod='ets_pres2pres'}
                    </span>
                    <span>{l s='Quick guide to migrate your site to Prestashop 1.7' mod='ets_pres2pres'}</span>
                </a>
            </li>
        </ul>
    </div>
{else}
    <ul>
        <li{if $controller=='AdminPresToPresImport'} class="active"{/if}>
            <a class="import" href="{$link->getAdminLink('AdminPresToPresImport',true)|escape:'html':'UTF-8'}">
                <span class="dtm_tab_content"><i class="fa fa-cloud-upload"> </i> {l s='Migration' mod='ets_pres2pres'}</span>
            </a>
        </li>
        <li{if $controller=='AdminPresToPresHistory'} class="active"{/if}>
            <a class="history" href="{$link->getAdminLink('AdminPresToPresHistory',true)|escape:'html':'UTF-8'}">
                <span class="dtm_tab_content"><i class="fa fa-history"> </i> {l s='History' mod='ets_pres2pres'}</span>
            </a>
        </li>
        <li{if $controller=='AdminPresToPresClean'} class="active"{/if}>
            <a class="cleanup" href="{$link->getAdminLink('AdminPresToPresClean',true)|escape:'html':'UTF-8'}">
                <span class="dtm_tab_content"><i class="fa fa-eraser"> </i> {l s='Clean-up' mod='ets_pres2pres'}</span>
            </a>
        </li>
        <li{if $controller=='AdminPresToPresHelp'} class="active"{/if}>
            <a class="help" href="{$link->getAdminLink('AdminPresToPresHelp',true)|escape:'html':'UTF-8'}">
                <span class="dtm_tab_content"><i class="fa fa-question-circle"> </i> {l s='Help' mod='ets_pres2pres'}</span>
            </a>
        </li>
    </ul>
{/if}