<?php

class AdminPanoteqController extends ModuleAdminController
{
//    public function run() {
//        return $this->render('@Modules/panoteq/views/templates/admin/demo.html.twig');
//    }
//
//
//    public function demoAction()
//    {
//        return $this->render('@Modules/your-module/templates/admin/demo.html.twig');
//    }

    public function __construct()
    {
        $this->table = 'panoteq_conf';
        $this->className = 'PanoteqConfiguration';
        //$this->module->getTranslator()->transang = true;
        $this->deleted = false;
        $this->bootstrap = true;
        $this->colorOnBackground = false;
        parent::__construct();
//		$this->bulk_actions = array(
//            'delete' => array(
//                'text' => $this->module->getTranslator()->trans('Delete selected', array(), 'Admin.Global'),
//                 'confirm' => $this->module->getTranslator()->trans('Delete selected items?', array(), 'Admin.Global'),
//                 )
//            );
//                Shop::addTableAssociation($this->table, array('type' => 'shop'));
//		          $this->context = Context::getContext();
//
//                $this->fieldImageSettings = array(
// 			'name' => 'image',
// 			'dir' => 'blocklogo'
// 		);
//        $this->imageType = "jpg";

//         $this->meta_title = $this->module->getTranslator()->trans('Manage Logo', array(), 'Admin.Global');
    }

    public function renderList()
    {

        $this->addRowAction('duplicate');
//            $this->addRowAction('delete');
//            $this->bulk_actions = array(
//                'delete' => array(
//                    'text' => $this->module->getTranslator()->trans('Delete selected'),
//                    'confirm' => $this->module->getTranslator()->trans('Delete selected items?')
//                )
//            );

        $this->fields_list = array(
            'id_panoteq_conf' => array(
                'title' => $this->module->getTranslator()->trans('Schema version', array(), 'Admin.Global'),
                'align' => 'left',
                'width' => 50
            ),
            'contents' => array(
                'title' => $this->module->getTranslator()->trans('Contents', array(), 'Admin.Global'),
                'align' => 'left',
//                    'width' => 25
            ),
            'created' => array(
                'title' => $this->module->getTranslator()->trans('Created', array(), 'Admin.Global'),
                'align' => 'left',
//                    'width' => 25
            ),
        );

//            $this->fields_list['image'] = array(
//                'title' => $this->module->getTranslator()->trans('Image', array(), 'Admin.Global'),
//                'width' => 70,
//                "image" => $this->fieldImageSettings["dir"]
//            );
//

        $lists = parent::renderList();
        parent::initToolbar();

        return $lists;
    }

    public function renderForm()
    {
        $this->fields_form = array(
            'tinymce' => false,
//            'legend' => array(
//                'title' => $this->module->getTranslator()->trans('Slideshow', array(), 'Admin.Global'),
//                'image' => '../img/admin/edit.gif'
//            ),
            'input' => array(
//                array(
//                    'type' => 'text',
//                    'label' => $this->module->getTranslator()->trans('Contents', array(), 'Admin.Global'),
//                    'name' => 'title',
//                    'size' => 40
//                ),
//                array(
//                    'type' => 'text',
//                    'label' => $this->module->getTranslator()->trans('Link:', array(), 'Admin.Global'),
//                    'name' => 'link',
//                    'size' => 40
//                ),
//                array(
//                    'type' => 'file',
//                    'label' => $this->module->getTranslator()->trans('Image:', array(), 'Admin.Global'),
//                    'name' => 'image',
//                    'desc' => $this->module->getTranslator()->trans('Upload  a banner from your computer.', array(), 'Admin.Global')
//                ),
                array(
                    'type' => 'textarea',
                    'label' => $this->module->getTranslator()->trans('Contents', array(), 'Admin.Global'),
                    'name' => 'contents',
                    'autoload_rte' => FALSE,
                    'lang' => false,
                    'required' => TRUE,
                    'rows' => 20,
                    'cols' => 40
//                    'hint' => $this->module->getTranslator()->trans('Invalid characters:', array(), 'Admin.Global') . ' <>;=#{}'
                ),
//                array(
//                    'type' => 'text',
//                    'label' => $this->module->getTranslator()->trans('Order:', array(), 'Admin.Global'),
//                    'name' => 'porder',
//                    'size' => 40,
//                    'require' => false
//                ),
            ),
            'submit' => array(
                'title' => $this->module->getTranslator()->trans('Save', array(), 'Admin.Global'),
                'class' => 'btn btn-default pull-right'
            )
        );

//        if (Shop::isFeatureActive())
//            $this->fields_form['input'][] = array(
//                'type' => 'shop',
//                'label' => $this->module->getTranslator()->trans('Shop association:', array(), 'Admin.Global'),
//                'name' => 'checkBoxShopAsso',
//            );

//        if (!($obj = $this->loadObject(true)))
//            return;

        return parent::renderForm();
    }


}
