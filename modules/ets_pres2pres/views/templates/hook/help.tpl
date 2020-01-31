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
<div class="migrate_help">
<div class="breadcrum_migrate">
    <div class="breadcrum_migrate_content">
        <a href="{$link->getAdminLink('AdminPresToPresGeneral',true)|escape:'html':'UTF-8'}" class="home">
            <i class="fa fa-home"></i> {l s='Home' mod='ets_pres2pres'}
        </a> 
        <i class="fa fa-angle-double-right"></i> 
        <span>{l s='Help' mod='ets_pres2pres'}</span>
    </div>
    <div class="breadcrum_migrate-left-block">
        {hook h='pres2presLeftBlok'}
    </div>
</div>
<div class="dtm-right-block">
    <div class="panel data_tab_help">
        <div class="panel-heading"><i class="icon-import"></i>{l s='Help' mod='ets_pres2pres'}</div>            
        <h4>{l s='Steps to migrate old Prestashop versions (1.4.x, 1.5.x and 1.6.x) to Prestashop 1.7' mod='ets_pres2pres'}</h4>
        <ul>
            <li>{l s='1. Install "Prestashop Connector" on source website. Download Prestashop Connector module' mod='ets_pres2pres'}&nbsp;<a target="_blank" href="{$mod_dr_pres2pres|escape:'html':'UTF-8'}plugins/ets_pres2presconnector.zip">{l s='here' mod='ets_pres2pres'}</a></li>
            <li>{l s='2. Install a fresh Prestashop 1.7 website (target website)' mod='ets_pres2pres'}</li>
            <li>{l s='3. Install "Prestashop Migrator" on target website' mod='ets_pres2pres'}</li>
            <li>{l s='4. Enter "Secure access token" (or import data file) that is available on "Prestashop Connector" module' mod='ets_pres2pres'}</li>
            <li>{l s='5. Final tweaks (Clear cache, Regenerate friendly URL, reindex data, recover passwords). Download Prestashop Password Keeper' mod='ets_pres2pres'}&nbsp;<a target="_blank" href="{$mod_dr_pres2pres|escape:'html':'UTF-8'}plugins/ets_pres2prespwkeeper.zip">{l s='here' mod='ets_pres2pres'}</a></li>
        </ul>
        <h4>{l s='Other applications' mod='ets_pres2pres'}</h4>
        <ul>
            <li>{l s='Migrate data between Prestashop websites' mod='ets_pres2pres'}</li>
            <li>{l s='Migrate data from many websites into 1 website (merge shops)' mod='ets_pres2pres'}</li>
            <li>{l s='Data backup, import and export' mod='ets_pres2pres'}</li>
            <li>{l s='Bulk upload (valid XML format required, you can get sample XML files by exporting your website data using "Prestashop Connector")' mod='ets_pres2pres'}</li>
        </ul>
    </div>
</div>
<div class="dtm-clearfix"></div>
</div>