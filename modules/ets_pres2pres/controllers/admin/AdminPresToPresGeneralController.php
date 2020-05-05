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

if (!defined('_PS_VERSION_'))
    exit;
if(!class_exists('Pres2PresExtraImport'))
    include_once(_PS_MODULE_DIR_.'ets_pres2pres/classes/ExtraImport.php');
if(!class_exists('Pres2PresDataImport'))
    include_once(_PS_MODULE_DIR_.'ets_pres2pres/classes/DataImport.php');
if(!class_exists('Pres2PresImportHistory'))
    include_once(_PS_MODULE_DIR_.'ets_pres2pres/classes/ImportHistory.php');
class AdminPresToPresGeneralController extends ModuleAdminController
{
    public $errors= array();
    public $_module;
    public function __construct()
    {
       parent::__construct();
       $this->bootstrap = true;
       $this->_module = Module::getInstanceByName('ets_pres2pres');
       $this->context = Context::getContext();
    }
    public function initContent()
    {
        parent::initContent();
    }
    public function renderList() 
    {
        $this->module->assignGeneral();
        return $this->module->display(_PS_MODULE_DIR_.$this->module->name.DIRECTORY_SEPARATOR.$this->module->name.'.php', 'general.tpl');
    }
}