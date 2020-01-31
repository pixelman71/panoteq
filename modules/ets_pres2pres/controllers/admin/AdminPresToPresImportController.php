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
class AdminPresToPresImportController extends ModuleAdminController
{
    public $errors= array();
    public $_module;
    public function __construct()
    {
       parent::__construct();
       $this->bootstrap = true;
       $this->_module = Module::getInstanceByName('ets_pres2pres');
       $this->context = Context::getContext();
       if(Tools::isSubmit('ajax_percentage_import'))
       {
            $this->_module->processAjaxImport();
       }
       if(Tools::isSubmit('ajax_change_data_import'))
       {
            $id_import_history = $this->context->cookie->id_import_history;
            $importHistory = new Pres2PresImportHistory($id_import_history);
            if($importHistory->file_name &&  file_exists(dirname(__FILE__).'/../../cache/import/'.$importHistory->file_name.'.zip'))
                @unlink(dirname(__FILE__).'/../../cache/import/'.$importHistory->file_name.'.zip');
            foreach (glob(dirname(__FILE__).'/../../xml/'.$importHistory->file_name.'/*.*') as $filename) {
                @unlink($filename);
            }
            @rmdir(dirname(__FILE__).'/../../xml/'.$importHistory->file_name);
            $importHistory->file_name='';
            $importHistory->update();
            die(
                Tools::jsonEncode(
                    array(
                        'upload_form'=>$this->_module->displayFromUloadLoad(),
                    )
                )
            );
       }
       if(Tools::isSubmit('ets_pres2pres_clearcache'))
       {
            Tools::clearSmartyCache();
            Tools::clearXMLCache();
            Media::clearCache();
            die(
                Tools::jsonEncode(
                    array(
                        'success'=>$this->_module->l('Cache cleared successfully'),
                    )
                )
            );
       }
       if(Tools::isSubmit('ets_pres2pres_friendly_url'))
       {
            Tools::generateIndex();
            die(
                Tools::jsonEncode(
                    array(
                        'success'=>$this->_module->l('Regenerated successfully'),
                    )
                )
            );
       }
       if(Tools::isSubmit('ets_pres2pres_search'))
       {
            ini_set('max_execution_time', 7200);
            Search::indexation(1);
            die(
                Tools::jsonEncode(
                    array(
                        'success'=>$this->_module->l('Index rebuild successfully'),
                    )
                )
            );
       }
    }
    public function initContent()
    {
        parent::initContent();
    }
    public function renderList() 
    {
        $this->_module->processAssignImport();
        return $this->module->display(_PS_MODULE_DIR_.$this->module->name.DIRECTORY_SEPARATOR.$this->module->name.'.php', 'import.tpl');
    }
}