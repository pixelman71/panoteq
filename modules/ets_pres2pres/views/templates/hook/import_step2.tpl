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
<div class="form-group">              
    <div class="col-lg-12">
        <div class="heading_step">
            <h2 class="step2_title">{l s='Data to migrate' mod='ets_pres2pres'}</h2>
            <span>{l s='Which kind of data do you want to migrate?' mod='ets_pres2pres'}</span>
        </div>
        <div class="step2_title_form col-sm-6 col-xs-6">{l s='Data to import' mod='ets_pres2pres'}</div>
        <div class="step2_title_form step2_title_form_items col-sm-6 col-xs-6">{l s='Item(s)' mod='ets_pres2pres'}</div>
        {if $pres_version!=1.4}
            {if isset($assign['shops']) && $assign['shops'] && in_array('shops',$export_datas)}
                <div class="checkbox">
                    <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_shops">
                        <input{if in_array('shops',$ets_pres2pres_import)} checked="checked"{/if} name="data_import[]" value="shops" type="checkbox" id="data_import_shops" />
                        <span class="data_checkbox_style"><i class="icon icon-check"></i></span>
                        {l s='Multi shops' mod='ets_pres2pres'}
                        </label> 
                    </div>
                    <div class="items_right col-xs-6 col-sm-6">
                        {$assign['shops']|intval}
                    </div>
                </div>
            {/if}
        {/if}
        {if isset($assign['categories']) && $assign['categories'] && in_array('categories',$export_datas)}
            <div class="checkbox">
                <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_categories">
                    <input{if in_array('categories',$ets_pres2pres_import)} checked="checked"{/if} name="data_import[]" value="categories" type="checkbox" id="data_import_categories" />
                    <span class="data_checkbox_style"><i class="icon icon-check"></i></span>
                    {l s='Product categories' mod='ets_pres2pres'} 
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {$assign['categories']|intval}</label>
                </div>
            </div>
        {/if}
        {if isset($assign['products']) && $assign['products'] && in_array('products',$export_datas)}
            <div class="checkbox">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_products"><input{if in_array('products',$ets_pres2pres_import)} checked="checked"{/if} name="data_import[]" value="products" type="checkbox" id="data_import_products" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Products' mod='ets_pres2pres'}
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['products']|intval}</div>
            </div>
        {/if}
        {if isset($assign['customers']) && $assign['customers'] && in_array('customers',$export_datas)}
            <div class="checkbox">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_customers"><input{if in_array('customers',$ets_pres2pres_import)} checked="checked"{/if} name="data_import[]" value="customers" type="checkbox" id="data_import_customers" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Customers & addresses' mod='ets_pres2pres'}
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['customers']|intval}</div>
            </div>
        {/if}
        {if isset($assign['employees']) && $assign['employees'] && in_array('employees',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_employees">
                    <input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_employees" />
                    <span class="data_checkbox_style">
                    <i class="icon icon-check"></i>
                    </span>{l s='Employees' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                </label> 
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {$assign['employees']|intval} 
                </div>
            </div>
        {/if}
        
        {if isset($assign['manufactures']) && $assign['manufactures'] && in_array('manufactures',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_manufactures"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_manufactures" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Manufacturers' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                    </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {$assign['manufactures']|intval} 
                </div>
            </div>
        {/if}
        {if isset($assign['suppliers']) && $assign['suppliers'] && in_array('suppliers',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_suppliers">
                    <input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_suppliers" />
                    <span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Suppliers' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                    </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                    {$assign['suppliers']|intval} 
                </div>
            </div>
        {/if}
        
        {if isset($assign['carriers']) && $assign['carriers'] && in_array('carriers',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_carriers"><input disabled="disabled"  name="data_import[]" value="0" type="checkbox" id="data_import_carriers" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Carriers & shipping prices' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['carriers']|intval}</div> 
            </div>
        {/if}
        {if $pres_version==1.4}
            {if isset($assign['vouchers']) && $assign['vouchers'] && in_array('vouchers',$export_datas)}
                <div class="checkbox extra_pro">
                    <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_vouchers"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_vouchers" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Vouchers' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                    </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['vouchers']|intval}</div> 
                </div>
            {/if}
        {else}
            {if isset($assign['cart_rules']) && $assign['cart_rules'] && in_array('cart_rules',$export_datas)}
                <div class="checkbox extra_pro">
                    <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_cart_rules"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_cart_rules" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Cart rules' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                    </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['cart_rules']|intval}</div> 
                </div>
            {/if}
            {if isset($assign['catelog_rules']) && $assign['catelog_rules'] && in_array('catelog_rules',$export_datas)}
                <div class="checkbox extra_pro">
                    <div class="items_left col-xs-6 col-sm-6">
                    <label for="data_import_catelog_rules"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_catelog_rules" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Catalog rules' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                    </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['catelog_rules']|intval}</div> 
                </div>
            {/if}
        {/if}
        
        {if isset($assign['orders']) && $assign['orders'] && in_array('orders',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_orders"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_orders" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Orders & shopping carts' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['orders']|intval}</div> 
            </div>
        {/if}
        {if isset($assign['CMS_categories']) && $assign['CMS_categories'] && in_array('CMS_categories',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_CMS_categories"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_CMS_categories" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='CMS categories' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['CMS_categories']|intval}</div> 
            </div>
        {/if}
        {if isset($assign['CMS']) && $assign['CMS'] && in_array('CMS',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_CMS"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_CMS" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='CMSs' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['CMS']|intval}</div> 
            </div>
        {/if}
        {if isset($assign['messages']) && $assign['messages'] && in_array('messages',$export_datas)}
            <div class="checkbox extra_pro">
                <div class="items_left col-xs-6 col-sm-6">
                <label for="data_import_messages"><input disabled="disabled" name="data_import[]" value="0" type="checkbox" id="data_import_messages" /><span class="data_checkbox_style"><i class="icon icon-check"></i></span>{l s='Contact form messages' mod='ets_pres2pres'} <span class="premium_version">({l s='Available on premium version only' mod='ets_pres2pres'})</span>
                </label>
                </div>
                <div class="items_right col-xs-6 col-sm-6">
                {$assign['messages']|intval}</div> 
            </div>
        {/if}
    </div>
</div>
<p class="extra_pro2">
    {l s='You are using Free version of Prestashop Migrator that only allows you to migrate essential data (products, product categories and customers) to the target website. If you would like to migrate EVERYTHING and get 24/7 support, please download Premium Version' mod='ets_pres2pres'}
</p>
<a href="https://addons.prestashop.com/en/data-migration-backup/32298-prestashop-migrator-upgrade-prestashop-to-17.html" class="btn btn-default extra_pro extra_pro_download" target="_blank" style="">{l s='DOWNLOAD PREMIUM VERSION' mod='ets_pres2pres'}</a>
<button type="button" class="btn btn-default not_interested extra_pro extra_pro_close">{l s='NO, I AM NOT INTERESTED' mod='ets_pres2pres'}</button>
<br class="extra_pro" /><br class="extra_pro" />
<div class="alert-warning alert">
    {l s='We recommend you to import all kinds of data for migration purpose. However, you can deselect some kinds of data if you really do not need them.' mod='ets_pres2pres'}
</div>
<script type="text/javascript">
$(document).on('click','.not_interested',function(){
    $('.extra_pro,.extra_pro2').hide();
    return false;
});
</script>