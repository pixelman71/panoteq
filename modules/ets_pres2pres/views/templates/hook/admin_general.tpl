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
<div class="dtm-right-block">
    <div class="data-to-export col-sm-6">
        <div class="data-to-export-content">
        <div class="title_color"><i class="fa fa-database"></i> {l s='Website data' mod='ets_pres2pres'}</div>
        <ul class="list-data-to-import">
            {if $datas}
                <li class="row-header">
                    <div class="items_left col-xs-6 col-sm-7">
                        {l s='Data type' mod='ets_pres2pres'}
                    </div>
                    <div class="items_right col-xs-6 col-sm-5">
                        {l s='Item(s)' mod='ets_pres2pres'}
                    </div>
                </li>
                {foreach from=$datas key='key' item='data'}
                    {if $data!==false}
                        <li>
                            <div class="items_left col-xs-6 col-sm-7">
                            {if $key=='employees'}
                                <i class="i-employees"></i> {l s='Employees' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='categories'}
                                <i class="i-categories"></i> {l s='Product categories' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='manufactures'}
                                <i class="i-manufactures"></i> {l s='Manufacturers' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='suppliers'}
                                <i class="i-suppliers"></i> {l s='Suppliers' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='products'}
                                <i class="i-products"></i> {l s='Products' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='customers'}
                                <i class="i-customers"></i> {l s='Customers' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='carriers'}
                                <i class="i-carriers"></i> {l s='Carriers' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='cart_rules'}
                                <i class="i-cart_rules"></i> {l s='Cart rules' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='catelog_rules'}
                                <i class="i-catelog_rules"></i> {l s='Catalog rules' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='orders'}
                                <i class="i-orders"></i> {l s='Orders' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='CMS_categories'}
                                <i class="i-CMS_categories"></i> {l s='CMS categories' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='CMS'}
                                <i class="i-CMS"></i> {l s='CMSs' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='messages'}
                                <i class="i-messages"></i> {l s='Contact form messages' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='vouchers'}
                                <i class="i-vouchers"></i> {l s='Vouchers' mod='ets_pres2pres'}
                            {/if}
                            {if $key=='shops'}
                                <i class="i-shops"></i> {l s='Multi shops' mod='ets_pres2pres'}
                            {/if}
                            </div>
                            <div class="items_right col-xs-6 col-sm-5">
                                <span class="items_right_content">
                                    {$data|intval}
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
            <div class="title_color"><i class="fa fa-info-circle"></i> {l s='Server information' mod='ets_pres2pres'}</div>
            <div class="data-to-export-content">
                <ul>
                    <li class="row-header">
                        <div class="items_left col-xs-4 col-sm-4">
                            {l s='Parameter' mod='ets_pres2pres'}
                        </div>
                        <div class="items_right col-xs-4 col-sm-4">
                            {l s='Value' mod='ets_pres2pres'}
                        </div>
                        <div class="items_right col-xs-4 col-sm-4">
                            {l s='Status' mod='ets_pres2pres'}
                        </div>
                    </li>
                    <li>
                            <div class="items_left col-xs-4 col-sm-4">
                                {l s='max_execution_time' mod='ets_pres2pres'}
                            </div>
                            <div class="items_right col-xs-4 col-sm-4">
                                {$max_execution_time|escape:'html':'UTF-8'}
                            </div>
                            <div class="items_right col-xs-4 col-sm-4">
                                {if $max_execution_time < 300}<span style="color:red">{l s='Not good' mod='ets_pres2pres'}</span>{else}{l s='Great' mod='ets_pres2pres'}{/if}
                                <div class="status_help">
                                    <i class="fa fa-question-circle"></i>
                                    <div class="status_help_pop">
                                        {l s='You should set the minimum value for this parameter to 300 seconds' mod='ets_pres2pres'}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="items_left col-xs-4 col-sm-4">
                                {l s='memory_limit' mod='ets_pres2pres'}
                            </div>
                            <div class="items_right col-xs-4 col-sm-4">
                                {$memory_limit|escape:'html':'UTF-8'}
                            </div>
                            <div class="items_right col-xs-4 col-sm-4">
                                {if $memory_limit < 128}<span style="color:red">{l s='Not good' mod='ets_pres2pres'}</span>{else}{l s='Great' mod='ets_pres2pres'}{/if}
                                <div class="status_help">
                                    <i class="fa fa-question-circle"></i>
                                    <div class="status_help_pop">
                                        {l s='You should set the minimum value for this parameter to 128 MB' mod='ets_pres2pres'}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="items_left col-xs-4 col-sm-4">
                                {l s='max_input_vars' mod='ets_pres2pres'}
                            </div>
                            <div class="items_right col-xs-4 col-sm-4">
                                {$max_input_vars|escape:'html':'UTF-8'}
                            </div>
                            <div class="items_right col-xs-4 col-sm-4">
                                {if $max_input_vars < 1000}<span style="color:red">{l s='Not good' mod='ets_pres2pres'}</span>{else}{l s='Great' mod='ets_pres2pres'}{/if}
                                <div class="status_help">
                                    <i class="fa fa-question-circle"></i>
                                    <div class="status_help_pop">
                                        {l s='You should set the minimum value for this parameter to 1000' mod='ets_pres2pres'}
                                    </div>
                                </div>
                            </div>
                        </li>
                </ul>
            </div>
            <div class="alert alert-info">
                {l s='These parameters are recommended, not compulsory. However, if your server status does not reach these values, you can still try to migrate as usual. The migration process can execute even without updating the above parameters.' mod='ets_pres2pres'}
            </div>
        </div>
        <div class="data-format-to-import">
             <div class="title_color"><i class="fa fa-link"></i> {l s='Useful links' mod='ets_pres2pres'}</div>
            <div class="data-to-export-content">
                <ul>
                    <li>
                        <a target="_blank" href="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/doc/Documentation_Prestashop_Migrator.pdf">
                            <i class="fa fa-file-pdf-o"></i><br />
                            {l s='Module documentation' mod='ets_pres2pres'}
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.youtube.com/watch?v=MzTbBDm8HQs">
                            <i class="fa fa-youtube-play"></i><br />
                            {l s='Introduction video' mod='ets_pres2pres'}
                        </a>
                    </li>
                    <li>
                       <a target="_blank" href="https://addons.prestashop.com/en/2_community-developer?contributor=218651">
                            <i class="fa fa-cubes"></i><br />
                            {l s='Discover all our modules' mod='ets_pres2pres'}
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://addons.prestashop.com/en/contact-us?id_product=32298">
                            <i class="fa fa-envelope-o"></i><br />
                            {l s='Contact us for any help' mod='ets_pres2pres'}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>