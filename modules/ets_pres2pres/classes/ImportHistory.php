<?php
/**
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
 * needs please contact us for extra customization service at an affordable price
 *
 *  @author ETS-Soft <etssoft.jsc@gmail.com>
 *  @copyright  2007-2018 ETS-Soft
 *  @license    Valid for 1 website (or project) for each purchase of license
 *  International Registered Trademark & Property of ETS-Soft
 */

class Pres2PresImportHistory extends ObjectModel
{
    public $id_import_history;
    public $file_name;
    public $id_category_default;
    public $id_manufacture;
    public $id_supplier;
    public $id_category_cms;
    public $import_multi_shop;
    public $delete_before_importing;
    public $force_all_id_number;
    public $data;
    public $content;
    public $currentindex=1;
    public $number_import=0;
    public $number_import2=0;
    public $date_import;
    public $cookie_key;
    public $count_shops;
    public $count_products;
    public $count_categories;
    public $count_customers;
    public $count_employees;
    public $count_orders;
    public $count_cart_rules;
    public $count_catelog_rules;
    public $count_manufactures;
    public $count_suppliers;
    public $count_messages;
    public $count_carriers;
    public $count_cmss;
    public $count_category_cmss;
    public $count_minor;
    public $import_active;
    public $table_importting;
    public static $definition = array(
        'table' => 'ets_pres2pres_import_history',
        'primary' => 'id_import_history',
        'fields' => array(
            'file_name' =>    array('type' => self::TYPE_STRING),
            'id_category_default' => array('type'=>self::TYPE_INT),
            'id_manufacture' => array('type'=>self::TYPE_INT),
            'id_supplier' => array('type'=>self::TYPE_INT),
            'id_category_cms' => array('type'=>self::TYPE_INT),
            'import_multi_shop' => array('type'=>self::TYPE_INT),
            'delete_before_importing' => array('type'=>self::TYPE_INT),
            'force_all_id_number' => array('type'=>self::TYPE_INT),
            'data' =>            array('type' => self::TYPE_STRING),
            'content' =>            array('type' => self::TYPE_HTML),
            'currentindex' => array('type'=>self::TYPE_INT),
            'number_import' => array('type'=>self::TYPE_INT),
            'number_import2' => array('type'=>self::TYPE_INT),
            'cookie_key' => array('type' => self::TYPE_STRING),
            'date_import' =>         array('type' => self::TYPE_STRING),
            'table_importting' => array('type' => self::TYPE_STRING),
            'import_active' => array('type' => self::TYPE_STRING),
        ),
    );
    public	function __construct($id_item = null, $id_lang = null, $id_shop = null)
	{
		parent::__construct($id_item, $id_lang, $id_shop);
	}
    public function delete()
    {
        foreach (glob(dirname(__FILE__).'/../xml/'.$this->file_name.'/*.*') as $filename) {
            @unlink($filename);
        }
        @rmdir(dirname(__FILE__).'/../xml/'.$this->file_name);
        @unlink(dirname(__FILE__).'/../cache/import/'.$this->file_name.'.zip');
        $_module = Module::getInstanceByName('ets_pres2pres');
        if($_module->tables)
        foreach($_module->tables as $table)
        {
            Db::getInstance()->execute('DELETE FROM '._DB_PREFIX_.'ets_pres2pres_'.pSQL($table).'_import WHERE id_import_history='.(int)$this->id);
        }
        return parent::delete();
    }
    public function getTotalItem()
    {
        $xml = simplexml_load_file(dirname(__FILE__).'/../xml/'.$this->file_name.'/DataInfo.xml');
        $export_datas= explode(',',(string)$xml->exporteddata);
        $pres2pres_import =explode(',',$this->data);
        if (in_array('products', $export_datas) && in_array('products', $pres2pres_import)) {
            $this->count_products= (int)$xml->counttotalproduct;
        }
        if (in_array('employees', $export_datas) && in_array('employees', $pres2pres_import)) {
            $this->count_employees= (int)$xml->countemployee;
        }
        if (in_array('categories', $export_datas) && in_array('categories', $pres2pres_import)) {
            $this->count_categories=  (int)$xml->counttotalcategory;
        }
        if (in_array('manufactures', $export_datas) && in_array('manufactures', $pres2pres_import))
            $this->count_manufactures= (int)$xml->countmanufacturer;
        if (in_array('suppliers', $export_datas) && in_array('suppliers', $pres2pres_import))
            $this->count_suppliers= (int)$xml->countsupplier;
        if (in_array('carriers', $export_datas) && in_array('carriers', $pres2pres_import)) {
            $this->count_carriers= (int)$xml->counttotalcarrier;;
        }
        if (in_array('cart_rules', $export_datas) && in_array('cart_rules', $pres2pres_import))
            $this->count_cart_rules = (int)$xml->countcartrule+(int)$xml->countspecificpriceRule;
        if (in_array('catelog_rules', $export_datas) && in_array('catelog_rules', $pres2pres_import))
            $this->count_catelog_rules =  (int)$xml->countspecificpriceRule; 
        if (in_array('customers', $export_datas) && in_array('customers', $pres2pres_import))
            $this->count_customers= (int)$xml->counttotalcustomer; 
        if (in_array('orders', $export_datas) && in_array('orders', $pres2pres_import))
            $this->count_orders= (int)$xml->countorder + (int)$xml->countorderstate + (int)$xml->countcart + (int)$xml->countorderdetail + (int)$xml->countorderinvoice + (int)$xml->countorderslip + (int)$xml->countordercarrier + (int)$xml->countordercartrule + (int)$xml->countorderhistory + (int)$xml->countordermessage + (int)$xml->countorderpayment + (int)$xml->countorderreturn+(int)$xml->countmessage; 
        $this->count_minor= (int)$xml->countlang + (int)$xml->countcurrency + (int)$xml->countzone + (int)$xml->countcountry + (int)$xml->countstate;
        if(in_array('CMS_categories',$export_datas) && in_array('CMS_categories',$pres2pres_import))
        {
            $this->count_category_cmss = (int)$xml->countcmscategory;
        } 
        if(in_array('CMS',$export_datas) && in_array('CMS',$pres2pres_import))
        {
            $this->count_cmss = (int)$xml->countcms;
        } 
    }
    public function getPercentmported()
    {
        $this->getTotalItem();
        $table_importing= $this->table_importting;
        if($table_importing=='shop' || $table_importing=='shop_group' || $table_importing=='shop_url')
        {
            $total= $this->getTotalImportedByTable('shop') + $this->getTotalImportedByTable('shop_group');
            if($this->count_shops)
                return array(
                    'percent' => (float)round($total*100/$this->count_shops,2),
                    'import_group'=>'shops',
                );   
        }
        if($table_importing=='lang' || $table_importing=='currency' || $table_importing=='zone' || $table_importing=='country' || $table_importing=='state')
        {
            $total = $this->getTotalImportedByTable('lang')+$this->getTotalImportedByTable('currency') + $this->getTotalImportedByTable('zone') + $this->getTotalImportedByTable('country') + $this->getTotalImportedByTable('state');
            if($this->count_minor)
                return array(
                    'percent' => (float)round($total*100/$this->count_minor,2),
                    'import_group'=>'minor_data',
                );
        }
        if($table_importing=='employee')
        {
            $total= $this->getTotalImportedByTable('employee');
            if($this->count_employees)
                return array(
                    'percent' => (float)round($total*100/$this->count_employees,2),
                    'import_group'=>'employees',
                );
        }
        if($table_importing=='category')
        {
            if($this->count_categories)
            {
                $countCategoryGroup = Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'category_group WHERE id_category IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_category_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total = $this->getTotalImportedByTable('category') + $countCategoryGroup;
                return array(
                    'percent' => (float)round($total*100/$this->count_categories,2),
                    'import_group'=>'categories',
                );
            }
        }
        if($table_importing=='manufacturer' && $this->count_manufactures)
        {
            $total= $this->getTotalImportedByTable('manufacturer');
            return array(
                'percent' => (float)round($total*100/$this->count_manufactures,2),
                'import_group'=>'manufactures',
            );
        }
        if($table_importing=='supplier' && $this->count_suppliers)
        {
            $total= $this->getTotalImportedByTable('supplier');
            return array(
                'percent' => (float)round($total*100/$this->count_suppliers,2),
                'import_group'=>'suppliers',
            );
        }
        if($table_importing=='customer' || $table_importing=='customer_group' || $table_importing=='address')
        {
            if($this->count_customers)
            {
                $countCategoryGroup = Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'category_group WHERE id_group IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_group_import WHERE id_import_history ="'.(int)$this->id.'")');
                $countCustomerGroup = Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'customer_group WHERE id_customer IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_customer_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total = $countCategoryGroup + $countCustomerGroup + $this->getTotalImportedByTable('customer') + $this->getTotalImportedByTable('address');
                return array(
                    'percent' => (float)round($total*100/$this->count_customers,2),
                    'import_group'=>'customers',
                );
            }
        }
        if($table_importing=='carrier' || $table_importing=='carrier_zone' || $table_importing=='range_price' || $table_importing=='range_weight' || $table_importing=='delivery')
        {
            if($this->count_carriers)
            {
                $countCarrierZone = Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'carrier_zone WHERE id_carrier IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_carrier_import WHERE id_import_history ="'.(int)$this->id.'")');
                $countCarrierGroup = Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'carrier_group WHERE id_carrier IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_carrier_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total = $countCarrierZone + $countCarrierGroup + $this->getTotalImportedByTable('carrier')+$this->getTotalImportedByTable('range_price') + $this->getTotalImportedByTable('range_weight') + $this->getTotalImportedByTable('delivery');
                return array(
                    'percent' => (float)round($total*100/$this->count_carriers,2),
                    'import_group'=>'carriers',
                );
            }
        }
        if(in_array($table_importing, array('cart_rule','cart_rule_carrier','cart_rule_combination','cart_rule_country','cart_rule_group','cart_rule_product_rule_group','cart_rule_product_rule','cart_rule_product_rule_value')) && $this->count_cart_rules)
        {
            $total = $this->getTotalImportedByTable('cart_rule');
            return array(
                'percent' => (float)round($total*100/$this->count_cart_rules,2),
                'import_group'=>'cart_rules',
            );
        }
        if($table_importing=='specific_price_rule' && $this->count_catelog_rules)
        {
            $total = $this->getTotalImportedByTable('specific_price_rule');
            return array(
                'percent' => (float)round($total*100/$this->count_catelog_rules,2),
                'import_group'=>'catelog_rules',
            );
        }
        if(in_array($table_importing,array('tag','tax','tax_rules_group','tax_rule','product','category_product','accessory','product_tag','feature','feature_value','feature_product','attribute_group','attribute','product_attribute','product_attribute_combination','product_supplier','product_carrier','image','specific_price','stock_available','customization_field')))
        {
            if($this->count_products)
            {
                $total= $this->getTotalImportedByTable(array('tag','tax','tax_rules_group','tax_rule','product','feature','feature_value','attribute_group','attribute','product_attribute','image','specific_price','stock_available','customization_field'));
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'category_product WHERE id_product IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'accessory WHERE id_product_1 IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'product_tag WHERE id_product IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'feature_product WHERE id_product IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'product_attribute_combination WHERE id_product_attribute IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_attribute_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'product_supplier WHERE id_product IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_import WHERE id_import_history ="'.(int)$this->id.'")');
                $total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'product_carrier WHERE id_product IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_product_import WHERE id_import_history ="'.(int)$this->id.'")');
                return array(
                    'percent' => (float)round($total*100/$this->count_products,2),
                    'import_group'=>'products',
                );
            }
        }
        if(in_array($table_importing,array('order_state','cart','customization','customized_data','orders','order_invoice','order_slip','order_detail','order_carrier','order_cart_rule','order_history','order_message','order_payment','order_return','message')))
        {
            if($this->count_orders)
            {
                $total = $this->getTotalImportedByTable(array('order_state','cart','customization','orders','order_invoice','order_slip','order_detail','order_carrier','order_cart_rule','order_history','order_message','order_payment','order_return','message'));
                $total += (int)$total += (int)Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'customized_data WHERE id_customization IN (SELECT id_new FROM '._DB_PREFIX_.'ets_pres2pres_customization_import WHERE id_import_history ="'.(int)$this->id.'")');
                return array(
                    'percent' => (float)round($total*100/$this->count_orders,2),
                    'import_group'=>'orders',
                );
            }
        }
        if(in_array($table_importing,array('cms_category')))
        {
            if($this->count_category_cmss)
            {
                $total = $this->getTotalImportedByTable(array('cms_category'));
                return array(
                    'percent' => (float)round($total*100/$this->count_category_cmss,2),
                    'import_group'=>'CMS_categories',
                );
            }
        }
        if(in_array($table_importing,array('cms')))
        {
            if($this->count_cmss)
            {
                $total = $this->getTotalImportedByTable(array('cms'));
                return array(
                    'percent' => (float)round($total*100/$this->count_cmss,2),
                    'import_group'=>'CMS',
                ); 
            }
        }
        return '1';
    }
    public function getTotalImportedByTable($table)
    {
        if(!is_array($table))
            return Db::getInstance()->getValue('SELECT COUNT(DISTINCT id_new) FROM '._DB_PREFIX_.'ets_pres2pres_'.pSQL($table).'_import WHERE id_import_history='.(int)$this->id);
        else
        {
            $total =0;
            foreach($table as $val)
            {
                $total += Db::getInstance()->getValue('SELECT COUNT(DISTINCT id_new) FROM '._DB_PREFIX_.'ets_pres2pres_'.pSQL($val).'_import WHERE id_import_history='.(int)$this->id);
            }
            return $total;
        }
    }
}