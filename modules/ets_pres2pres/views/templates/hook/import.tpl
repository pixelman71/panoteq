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
<div class="content_migrate_wrap">
<script type="text/javascript">
var ETS_DT_MODULE_URL_AJAX ='{$ETS_DT_MODULE_URL_AJAX|escape:'html':'UTF-8'}';
</script>
<div class="breadcrum_migrate">
    <div class="breadcrum_migrate_content">
        <a href="{$link->getAdminLink('AdminPresToPresGeneral',true)|escape:'html':'UTF-8'}" class="home">
            <i class="fa fa-home"></i> {l s='Home' mod='ets_pres2pres'}
        </a>
        <i class="fa fa-angle-double-right"></i>
        <span>{l s='Migration' mod='ets_pres2pres'}</span>
    </div>
    <div class="breadcrum_migrate-left-block">
        {hook h='pres2presLeftBlok'}
    </div>
</div>
<div class="dtm-right-block adminprestopresimport">
    {if isset($errors) && $errors}
    <div class="bootstrap">
        <div class="module_error alert alert-danger">
            <button class="close" data-dismiss="alert" type="button">×</button>
            {foreach from=$errors item='error'}
                {$error|escape:'html':'UTF-8'}<br />
            {/foreach}
        </div>
    </div>
    {/if}
    <form id="module_form" action="{$ETS_DT_MODULE_URL_AJAX|escape:'html':'UTF-8'}" class="defaultForm form-horizontal" novalidate="" enctype="multipart/form-data" method="post" >
        <input type="hidden" value="{$step|intval}" name="step"/>
        <div id="fieldset_0" class="panel">
            <div class="panel-heading"><i class="icon-import"></i>{l s='Migration' mod='ets_pres2pres'}</div>
            <ul class="tab_step_data">
                <li class="data_number_step{if $step==2 || $step==3 || $step==4 || $step==5 || $step==6 } current_step{/if} {if $step==1} active{/if}" data-step="1">
                    <span><b>01 <i class="fa fa-link"></i></b></span>
                    <p>{l s='Source' mod='ets_pres2pres' }</p>
                </li>
                <li class="data_number_step{if $step==3 || $step==4 || $step==5 || $step==6 } current_step{/if}{if $step==2} active{/if}" data-step="2">
                    <span><b>02 <i class="fa fa-check-square-o"></i></b></span>
                    <p>{l s='Data' mod='ets_pres2pres'}<br />{l s='to migrate' mod='ets_pres2pres'}</p>
                </li>
                <li class="data_number_step{if $step==4 || $step==5 || $step==6 } current_step{/if}{if $step==3} active{/if}" data-step="3">
                    <span><b>03 <i class="fa fa-mouse-pointer"></i></b></span>
                    <p>{l s='MIGRATION' mod='ets_pres2pres'}<br />{l s='options' mod='ets_pres2pres'}</p>
                </li>
                <li class="data_number_step{if $step==5 || $step==6 } current_step{/if}{if $step==4} active{/if}" data-step="4">
                    <span><b>04 <i class="fa fa-eye"></i></b></span>
                    <p>{l s='Review' mod='ets_pres2pres'}<br />{l s='migration' mod='ets_pres2pres'}</p>
                </li>
                <li class="data_number_step{if $step==6 } current_step{/if}{if $step==5} active{/if}" data-step="5">
                    <span><b>05 <i class="fa fa-refresh"></i></b></span>
                    <p>{l s='Process' mod='ets_pres2pres'}<br />{l s='migration' mod='ets_pres2pres'}</p>
                </li>
                <li class="data_number_step" data-step="6">
                    <span><b>06 <i class="fa fa-thumbs-o-up"></i></b></span>
                    <p>{l s='Done!!!' mod='ets_pres2pres'}<br />{l s='Enjoy your site' mod='ets_pres2pres'}</p>

                </li>
            </ul>

            <div class="form-wrapper data_import_data">
                <div class="ybc-form-group connector_error">
                    <div class="alert alert-warning error">
                        {l s='Sorry! Direct migration can’t be done because there was problems with server to server connection between the target website and the source website. This problem happens because one of the servers (or both servers) is not responding or timed out.' mod='ets_pres2pres'} <br />
                        {l s='Below are suggested solutions for the problem:' mod='ets_pres2pres'}
                        <ul class="suggested_solutions">
                            <li>
                           	    <p>{l s='Update server settings, make sure both servers are configured with' mod='ets_pres2pres'} <strong>{l s='UNLIMITED' mod='ets_pres2pres'}</strong> {l s='(or least 2 minutes) for' mod='ets_pres2pres'} <a target="_blank" href="http://php.net/manual/en/info.configuration.php#ini.max-execution-time">max_execution_time and</a> {l s='they can execute an' mod='ets_pres2pres'} <strong>{l s='UNLIMITED' mod='ets_pres2pres'}</strong> {l s='number of continuous HTTP requests. Disable any firewall programs or server settings that stop the servers (or give 500 Internal Server Error) when a large number of HTTP requests are sent to them during the migration.' mod='ets_pres2pres'}</p>
                            </li>
                            <li>
                                <p>{l s='Try to download entire data of the source website using the' mod='ets_pres2pres'} <strong>{l s='Prestashop Connector module' mod='ets_pres2pres'}</strong>, {l s='then import the data into the target website with' mod='ets_pres2pres'} <strong>“{l s='Source Type' mod='ets_pres2pres'}”</strong> {l s='is set to' mod='ets_pres2pres'} <strong>“{l s='Upload data file from computer' mod='ets_pres2pres'}”</strong> </p>
                            </li>
                            <li>
                                <p>{l s='Try to copy your websites to a better server or local computer (give maximum server resource usability for the websites) then start the migration again.' mod='ets_pres2pres'} </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="ybc-form-group import_error">
                    <div class="alert alert-warning error">
                        {l s='Sorry! The server is not responding or timed out while importing data into the website database. This problem happens because the server is too' mod='ets_pres2pres'} <strong>{l s='LIMITED' mod='ets_pres2pres'}</strong> {l s='in resource usability.' mod='ets_pres2pres'}<br />
                        {l s='Below are suggested solutions for the problem:' mod='ets_pres2pres'}
                        <ul class="suggested_solutions">
                            <li>
                                <p>{l s='Update server settings, make sure both servers are configured with' mod='ets_pres2pres'} <strong>{l s='UNLIMITED' mod='ets_pres2pres'}</strong> {l s='(or least 2 minutes) for' mod='ets_pres2pres'} <a target="_blank" href="http://php.net/manual/en/info.configuration.php#ini.max-execution-time">max_execution_time and</a> {l s='they can execute an' mod='ets_pres2pres'} <strong>{l s='UNLIMITED' mod='ets_pres2pres'}</strong> {l s='number of continuous HTTP requests. Disable any firewall programs or server settings that stop the servers (or give 500 Internal Server Error) when a large number of HTTP requests are sent to them during the migration.' mod='ets_pres2pres'} </p>
                            </li>
                            <li>
                                <p>{l s='Try to copy the target website to a better server or even  a local computer (give maximum server resource usability for the website) then start the migration again.' mod='ets_pres2pres'} </p>
                            </li>
                        </ul>
                        <p>{l s='You can also try to' mod='ets_pres2pres'}&nbsp;<a class="ets_pres2pres_resume" href="#" title="{l s='click here to resume the migration process' mod='ets_pres2pres'}">{l s='click here to resume the migration process' mod='ets_pres2pres'}</a></p>
                    </div>
                </div>
                <div class="ybc-form-group ybc-blog-tab-step1 {if $step==1} active{/if}">
                    {if isset($form_step1)}
                        {$form_step1 nofilter}
                    {else}
                        <div class="form-group">
                            <label class="control-label col-lg-4" for="source_type">{l s='Select source type' mod='ets_pres2pres'}</label>
                            <div class="col-lg-8">
                                <div class="step1_hasinfo">
                                    <span class="step1_hasinfo_tooltip">
                                        <span class="tooltip_content">{l s='Select type to upload source data for migration' mod='ets_pres2pres'}</span>
                                    </span>
                                    <select id="source_type" name="source_type">
                                        <option value="url_site">{l s='Prestashop site URL' mod='ets_pres2pres'}</option>
                                        <option value="upload_file">{l s='Upload data file from computer' mod='ets_pres2pres'}</option>
                                        <option value="link">{l s='Upload data file from URL' mod='ets_pres2pres'}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group source upload">
                            <label class="control-label col-lg-4" for="file_import">{l s='Select data file' mod='ets_pres2pres'}<span class="required">*</span></label>
                            <div class="col-lg-7">
                                <div class="step1_hasinfo">
                                    <div class="data_upload_button_wrap">
                                        <input type="file" name="file_import" id="file_import"/>
                                        <div class="data_upload_button">
                                            <input type="text" name="data_upload_button" id="data_upload_button_input" value="{l s='No file selected.' mod='ets_pres2pres'}" />
                                            <div class="data_upload_button_right">
                                                <i class="icon icon-file"></i> {l s='Choose file' mod='ets_pres2pres'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group source link">
                            <label class="control-label col-lg-4" for="link_file">{l s='Enter data file URL' mod='ets_pres2pres'}<span class="required">*</span></label>
                            <div class="col-lg-8">
                                <div class="step1_hasinfo">
                                    <input type="text" name="link_file" id="link_file" placeholder="{l s='URL to .zip file' mod='ets_pres2pres'}" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group source url_site">
                            <label class="control-label col-lg-4" for="link_site">{l s='Connector URL' mod='ets_pres2pres'}<span class="required">*</span></label>
                            <div class="col-lg-8">
                                <div class="step1_hasinfo">
                                    <span class="step1_hasinfo_tooltip">
                                        <span class="tooltip_content">{l s='url from "Prestashop connector" module which is installed on Source site' mod='ets_pres2pres'}</span>
                                    </span>
                                    <input type="text" name="link_site" id="link_site" placeholder="{l s='Eg: http://sourcewebsite.abc/modules/ets_pres2presconnector/connector.php' mod='ets_pres2pres'}" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group source url_site">
                            <label class="control-label col-lg-4" for="secure_access_tocken">{l s='Secure access token' mod='ets_pres2pres'}<span class="required">*</span></label>
                            <div class="col-lg-8">
                                <div class="step1_hasinfo">
                                    <span class="step1_hasinfo_tooltip">
                                        <span class="tooltip_content">{l s='Copy secure access token from "Prestashop connector" module which is installed on Source site' mod='ets_pres2pres'}</span>
                                    </span>
                                    <input type="text" name="secure_access_tocken" id="secure_access_tocken" placeholder="{l s='Secure access token' mod='ets_pres2pres'}" />
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="link_site_connector" value="" name="link_site_connector" />
                        <p class="link_download_plugin alert alert-info">{l s='Before getting started with the migration, please download' mod='ets_pres2pres'}&nbsp;<a href="{$mod_dr_pres2pres|escape:'html':'UTF-8'}plugins/ets_pres2presconnector.zip" target="_blank"><b>{l s='Prestashop Connector' mod='ets_pres2pres'}</b></a>&nbsp;{l s=' module  and install the module on source Prestashop website. This Connector module gives you "Connector URL" and "Secure access token" (or data file) that is required above' mod='ets_pres2pres'}</p>
                    {/if}
                </div>
                <div class="ybc-form-group ybc-blog-tab-step2 {if $step==2} active{/if}">
                    {if $step >=2}
                        {$form_step2 nofilter}
                    {/if}
                </div>
                <div class="ybc-form-group ybc-blog-tab-step3 {if $step==3} active{/if}">
                    {if $step>=3}
                        {$form_step3 nofilter}
                    {/if}
                </div>
                <div class="ybc-form-group ybc-blog-tab-step4{if $step==4} active{/if}">
                    {if $step>=4}
                        {$form_step4 nofilter}
                    {/if}
                </div>
                <div class="ybc-form-group ybc-blog-tab-step5{if $step==5} active{/if}">

                </div>
                <div class="ybc-form-group ybc-blog-tab-step6{if $step==6} active{/if}">
                    <p>{l s='The import has been successfully processed.' mod='ets_pres2pres'}</p>
                </div>
                <div class="popup_uploading">
                    <div class="popup_uploading_table">
                        <div class="popup_uploading_tablecell">
                            <div class="popup_uploading_content">
                                {l s='Loading data, please wait...!' mod='ets_pres2pres'}
                                <div class="upload-wapper-all">
                                    <div class="upload-wapper-percent" style="width:0%;"></div><samp class="percentage_export">1%</samp>
                                    <div class="noTrespassingOuterBarG">
                                    	<div class="noTrespassingAnimationG">
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                            <div class="noTrespassingBarLineG"></div>
                                            <div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                            <div class="noTrespassingBarLineG"></div>
                                            <div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                                            <div class="noTrespassingBarLineG"></div>
                                            <div class="noTrespassingBarLineG"></div>
                                    		<div class="noTrespassingBarLineG"></div>
                    		                  <div class="noTrespassingBarLineG"></div>
                                    	</div>
                                    </div>
                                </div>
                                <samp class="percentage_export_table"></samp>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup_importing">
                </div>
            </div>
            <div class="panel-footer">
                <input type="hidden" value="1" name="submitImport"/>
                <button class="btn btn-default pull-right" name="submitImport" value="1" type="submit" >
                    <i class="process-icon-next"></i>{l s='Next' mod='ets_pres2pres'}
                </button>
                <button class="btn btn-default pull-left" name="submitBack" value="1" type="submit"{if $step==1} disabled="disabled"{/if}>
                    <i class="process-icon-back"></i>{l s='Back' mod='ets_pres2pres'}
                </button>
                <div class="clearfix"> </div>
            </div>
        </div>
    </form>
</div>
<div class="dtm-clearfix"></div>
</div>