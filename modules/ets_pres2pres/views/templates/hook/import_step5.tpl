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
<div id="data-importing-content" class="data-importing-content">              
    <h4>{l s='Processing migration' mod='ets_pres2pres'} <span class="clock-runing" id="basicUsageClock"></span></h4>
    <div class="info_importing">
        {l s='We are processing the migration, please be patient and wait! Do not close your web browser! This process can take some minutes (even some hours) depends on your server and your data size. You may want to take a cup of coffee while waiting if it takes too long' mod='ets_pres2pres'}
    </div>
    <ul class="list-data-to-importing">
        {if $ets_pres2pres_import}
            {if !isset($assign['shops'])}
                <li class="minor_data process">
                    <div class="data_proc">
                        <div class="data_proc-top">
                            <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/minor_data.png" />
                            <div class="process_import pie-wrapper" data-import="1">
                                <span class="label">1%</span>
                                <div class="pie">
                                  <div class="left-side half-circle"></div>
                                  <div class="right-side half-circle"></div>
                                </div>
                                <div class="speed"><span class="ets_pres2pres_items_second">1</span>&nbsp;{l s='items / second' mod='ets_pres2pres'}</div>
                                <div class="shadow"></div>
                            </div>
                        </div>
                        <div class="data_proc_bottom">
                            <span class="data-import">{l s='Minor data' mod='ets_pres2pres'}</span>
                        </div>
                    </div>
                </li>
            {/if}
            {foreach from=$ets_pres2pres_import item='data_import'}
                {if isset($assign[$data_import]) && $assign[$data_import]}
                    <li class="{$data_import|escape:'html':'UTF-8'}{if isset($assign['shops']) && $data_import=='shops'} process{/if}">
                        <div class="data_proc">
                            <div class="data_proc-top">
                                <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/{$data_import|escape:'html':'UTF-8'}.png" />
                                <div class="process_import pie-wrapper" data-import="1">
                                    <span class="label">{if $data_import=='shops'}1%{else}{l s='Waiting' mod='ets_pres2pres'}{/if}</span>
                                    <div class="pie">
                                      <div class="left-side half-circle"></div>
                                      <div class="right-side half-circle"></div>
                                    </div>
                                    <div class="speed"><span class="ets_pres2pres_items_second">1</span>&nbsp;{l s='items / second' mod='ets_pres2pres'}</div>
                                    <div class="shadow"></div>
                                </div>
                            </div>
                            <div class="data_proc_bottom">
                                <span class="data-import">
                                    
                                    {if $data_import == 'categories'}
                                        {l s='Product categories' mod='ets_pres2pres'}
                                    {else}
                                        {if isset($varlanguages[$data_import])}
                                            {$varlanguages[$data_import]|escape:'html':'UTF-8'}
                                        {else}
                                            {str_replace('_',' ',$data_import)|escape:'html':'UTF-8'}
                                        {/if}
                                    {/if}
                                </span>
                                <span class="data-import-number">{$assign[$data_import]|escape:'html':'UTF-8'}</span>
                            </div>
                        </div>
                    </li>
                    {if isset($assign['shops']) && $data_import=='shops'}
                        <li class="minor_data">
                            <div class="data_proc">
                                <div class="data_proc-top">
                                    <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/minor_data.png" />
                                    <div class="process_import pie-wrapper" data-import="1">
                                        <span class="label">{l s='Waiting' mod='ets_pres2pres'}</span>
                                        <div class="pie">
                                          <div class="left-side half-circle"></div>
                                          <div class="right-side half-circle"></div>
                                        </div>
                                        <div class="speed"><span class="ets_pres2pres_items_second">1</span>&nbsp;{l s='items / second' mod='ets_pres2pres'}</div>
                                        <div class="shadow"></div>
                                    </div>
                                </div>
                                <div class="data_proc_bottom">
                                    <span class="data-import">{l s='Minor data' mod='ets_pres2pres'}</span>
                                    <span class="data-import-number">20</span>
                                </div>
                            </div>
                        </li>
                    {/if}
                {/if}
            {/foreach}
            <li class="finalizing">
                <div class="data_proc">
                    <div class="data_proc-top">
                        <img src="{$mod_dr_pres2pres|escape:'html':'UTF-8'}views/img/migration.png" />
                        <div class="process_import pie-wrapper" data-import="1">
                            <span class="label">{l s='Waiting' mod='ets_pres2pres'}</span>
                            <div class="pie">
                              <div class="left-side half-circle"></div>
                              <div class="right-side half-circle"></div>
                            </div>
                            <div class="speed"><span class="ets_pres2pres_items_second">1</span>&nbsp;{l s='items / second' mod='ets_pres2pres'}</div>
                            <div class="shadow"></div>
                        </div>
                    </div>
                    <div class="data_proc_bottom">
                        <span class="data-import">{l s='Finalizing migration' mod='ets_pres2pres'}</span>
                    </div>
                </div>
            </li>
        {/if}
    </ul>
</div>