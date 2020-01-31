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
if(!class_exists('Pres2PresImportHistory'))
    include_once(_PS_MODULE_DIR_.'ets_pres2pres/classes/ImportHistory.php');
class AdminPresToPresHistoryController extends ModuleAdminController
{
    public $_module;
    public function __construct()
    {
       parent::__construct();
       $this->context= Context::getContext();
       $this->bootstrap = true;
       $this->_module = Module::getInstanceByName('ets_pres2pres');
    }
    public function initContent()
    {
        parent::initContent();
        if (($load_more = Tools::getValue('load_more'))) {
            $args = array(
                'start' => Tools::getValue('start'),
                'load_more' => $load_more
            );
            die(Tools::jsonEncode($this->module->getImports($args)));
        }
    }
    public function renderList()
    {
        if(Tools::isSubmit('deleteimporthistory') && Tools::isSubmit('id_import_history')&&$id_import_history=Tools::getValue('id_import_history'))
        {
            $imprort_history= new Pres2PresImportHistory($id_import_history);
            $imprort_history->delete();
            Tools::redirectAdmin('index.php?controller=AdminPresToPresHistory&token='.Tools::getValue('token').'&conf=1&tabhistory=import');
        }
        $this->_module->assignHistory();
        return $this->module->display(_PS_MODULE_DIR_.$this->module->name.DIRECTORY_SEPARATOR.$this->module->name.'.php', 'history.tpl');
    }
}