<?php

require_once(_PS_MODULE_DIR_ . 'panoteq/models/PanoteqConfiguration.php');

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
        $this->table = 'panoteq_configuration';
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

    public function postProcess()
    {
        if (Tools::isSubmit('submitAddpanoteq_configuration')) {
            $_POST['associated_products'] = implode(',', Tools::getValue('associated_products'));
        }
        parent::postProcess();
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
            'id_panoteq_configuration' => array(
                'title' => $this->module->getTranslator()->trans('Schema version', array(), 'Admin.Global'),
                'align' => 'left',
                'width' => 50
            ),
//            'contents' => array(
//                'title' => $this->module->getTranslator()->trans('Contents', array(), 'Admin.Global'),
//                'align' => 'left',
////                    'width' => 25
//            ),
            'comment' => array(
                'title' => $this->module->getTranslator()->trans('Comment', array(), 'Admin.Global'),
                'align' => 'left
                ',
//                    'width' => 25
            ),
            'associated_products' => array(
                'title' => $this->module->getTranslator()->trans('Associated products', array(), 'Admin.Global'),
                'align' => 'left',
//                    'width' => 25,
                'callback' => 'renderAssociatedProducts'
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

        $this->_defautOrderBy = 'id_panoteq_configuration';
        $this->_defaultOrderWay = 'DESC';

        $lists = parent::renderList();
        parent::initToolbar();

        return $lists;
    }

    public function renderAssociatedProducts($value, $val2)
    {
        $productIds = explode(',', $value);

        $result = [];
        foreach ($productIds as $productId) {
            $p = new Product($productId);
            $result[] = $p->name[(int)Context::getContext()->language->id];
        }

        return join(',', $result);
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
                    'type' => 'select',
                    'label' => $this->module->getTranslator()->trans('Contents', array(), 'Admin.Global'),
                    'name' => 'associated_products[]',
                    'options' => [
                        'query' => Product::getProducts((int)Context::getContext()->language->id, 0, 100, 'id_product', 'ASC'), // el true es que solo los que estan activos
                        'id' => 'id_product',
                        'name' => 'name',
                        'default' => array(
                            'value' => '',
                            'label' => $this->l('None')
                        )
                    ],
                    'multiple' => true,
                    'autoload_rte' => FALSE,
                    'lang' => false,
                    'required' => TRUE
//                    'hint' => $this->module->getTranslator()->trans('Invalid characters:', array(), 'Admin.Global') . ' <>;=#{}'
                ),
                array(
                    'type' => 'text',
                    'label' => $this->module->getTranslator()->trans('Comment', array(), 'Admin.Global'),
                    'name' => 'comment',
                    'size' => 200
                ),
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

        $this->fields_value['associated_products[]'] = isset($this->object->associated_products) ? explode(',', $this->object->associated_products) : '';

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


    public function ajaxProcessCustom()
    {
        return $this->processCustom();
    }

    public function processCustom()
    {
        $abspath = dirname(dirname(__FILE__)) . '/';
        chdir($abspath . '/../../..');

        $result = '';

        $result .= <<<EOT
<style>
img {
    width: 50px;
    margin: 1px;
}
</style>
EOT;

        foreach (glob("img/panoteqconf/textures/*.jpg") as $filename) {
            //echo "$filename size " . filesize($filename) . " <img src='/$filename' width='20'><br>\n";

            $isCurrentSelectionClass = ('/' . $filename) == Tools::getValue('currentNodeValue') ? 'style="border: 2px dotted red"' : '';

            $result .= "<img src='/$filename' title='$filename' $isCurrentSelectionClass>\n";
        }

        die(json_encode($result));
//        return $result;
    }
}
