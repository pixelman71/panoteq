<?php

require_once(_PS_MODULE_DIR_ . 'panoteq/models/PanoteqConfiguration.php');

class AdminPanoteqController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'panoteq_configuration';
        $this->className = 'PanoteqConfiguration';
        $this->deleted = false;
        $this->bootstrap = true;
        $this->colorOnBackground = false;
        parent::__construct();
    }

    public function postProcess()
    {
        if (Tools::getValue('enable_configuration')) {
            $this->actionEnableConfiguration();
        }

        if (Tools::getValue('duplicate_configuration')) {
            $this->actionDuplicateConfiguration();
        }

        if (Tools::isSubmit('submitAddpanoteq_configuration')) {
            $_POST['associated_products'] = implode(',', Tools::getValue('associated_products'));
        }

        $productsInSeveralActiveConfigurations = $this->checkProductsConfigurationsAssociations();
        if (count($productsInSeveralActiveConfigurations) > 0) {
            $this->warnings[] = 'Ces produits sont associés à plusieurs configurations actives : ' . join(', ', $productsInSeveralActiveConfigurations);
        }

        $notAssociatedProducts = $this->checkProductsAssociationsWithActiveConfigurations();
        if (count($notAssociatedProducts) > 0) {
            $this->warnings[] = 'Ces produits ne sont associés à aucune configuration active : ' . join(', ', $notAssociatedProducts);
        }


        parent::postProcess();
    }

    public function renderList()
    {
        $this->addRowAction('enable');
        $this->addRowAction('dupliquer');
        $this->addRowAction('delete');

        $this->fields_list = array(
            'id_panoteq_configuration' => array(
                'title' => $this->module->getTranslator()->trans('Schema version', array(), 'Admin.Global'),
                'align' => 'left',
                'width' => 50
            ),
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
            'active' => array(
                'title' => $this->module->getTranslator()->trans('Active', array(), 'Admin.Global'),
                'align' => 'left',
                'callback' => 'renderActive'
            ),
        );

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

        return join(', ', $result);
    }

    public function renderActive($value, $val2)
    {
        return $value == 1 ? '<strong>OUI</strong>' : 'NON';
    }

    public function renderForm()
    {
        $this->fields_form = array(
            'tinymce' => false,
            'input' => array(
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
                    'required' => FALSE
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

.ajax-image {
    display: inline-flex;
    flex-direction: column;
    width: 52px;
    overflow: hidden;
    margin-right: 5px;
}
</style>
EOT;

        foreach (glob("img/panoteqconf/textures/mini/*.jpg") as $filename) {
            $filenameWithoutMini = str_replace('/mini', '', $filename);
            $exploded = explode('/', $filename);
            $filenameWithoutPath = end($exploded);
            $isCurrentSelectionClass = ('/' . $filenameWithoutMini) == Tools::getValue('currentNodeValue') ? 'style="border: 2px dotted red"' : '';
            $result .= "<div class=\"ajax-image\"><img src='/$filename' data-filepath='/$filenameWithoutMini' title='$filenameWithoutMini' $isCurrentSelectionClass>$filenameWithoutPath</div>";
        }

        die(json_encode($result));
    }

    public function displayEnableLink($token = null, $id, $name = null)
    {
        $tpl = $this->createTemplate('helpers/list/list_action_edit.tpl');
        if (!array_key_exists('Activation', self::$cache_lang)) {
            self::$cache_lang['Activation'] = $this->trans('Activation', array(), 'Admin.Actions');
        }

        $tpl->assign(array(
            'href' => $this->context->link->getAdminLink('AdminPanoteq', true, array(), array('enable_configuration' => 1, 'id_panoteq_configuration' => (int)$id)),
            'action' => self::$cache_lang['Activation'],
            'id' => $id,
        ));

        return $tpl->fetch();
    }

    public function displayDupliquerLink($token = null, $id, $name = null)
    {
        $tpl = $this->createTemplate('helpers/list/list_action_edit.tpl');
        if (!array_key_exists('Dupliquer', self::$cache_lang)) {
            self::$cache_lang['Dupliquer'] = $this->trans('Dupliquer', array(), 'Admin.Actions');
        }

        $tpl->assign(array(
            'href' => $this->context->link->getAdminLink('AdminPanoteq', true, array(), array('duplicate_configuration' => 1, 'id_panoteq_configuration' => (int)$id)),
            'action' => self::$cache_lang['Dupliquer'],
            'id' => $id,
        ));

        return $tpl->fetch();
    }


    public function checkProductsAssociationsWithActiveConfigurations()
    {
        $allRows = (Db::getInstance())->query('select * from ' . _DB_PREFIX_ . 'panoteq_configuration where active = TRUE');
        $allProductsResult = Product::getProducts((int)Context::getContext()->language->id, 0, 100, 'id_product', 'ASC');

        $allProducts = [];

        foreach ($allProductsResult as $product) {
            $allProducts[$product['id_product']] = $product['name'];
        }

        foreach ($allRows as $row) {
            $rowAssociatedProducts = explode(',', $row['associated_products']);
            foreach ($rowAssociatedProducts as $rowAssociatedProduct) {
                if (strlen($rowAssociatedProduct) === 0) {
                    continue;
                }

                $productsInUse[$rowAssociatedProduct] = $allProducts[$rowAssociatedProduct];
            }
        }

        $notAssociatedProducts = [];
        foreach ($allProducts as $key => $allProduct) {
            if (!isset($productsInUse[$key])) {
                $notAssociatedProducts[$key] = $allProduct;
            }
        }

        return $notAssociatedProducts;
    }

    public function checkProductsConfigurationsAssociations()
    {
        $configsAssociatedProducts = [];

        $allRows = (Db::getInstance())->query('select * from ' . _DB_PREFIX_ . 'panoteq_configuration WHERE active = TRUE');
        foreach ($allRows as $row) {
            $rowAssociatedProducts = explode(',', $row['associated_products']);

            $configsAssociatedProducts[$row['id_panoteq_configuration']] = $rowAssociatedProducts;
        }

        $productsInSeveralActiveConfigurations = [];

        $allProductsResult = Product::getProducts((int)Context::getContext()->language->id, 0, 100, 'id_product', 'ASC');
        foreach ($allProductsResult as $product) {
            $timesFound = 0;

            foreach ($configsAssociatedProducts as $configsAssociatedProduct) {
                if (in_array($product['id_product'], $configsAssociatedProduct)) {
                    $timesFound++;
                }
            }

            if ($timesFound > 1) {
                $productsInSeveralActiveConfigurations[] = $product['name'];
            }
        }

        return $productsInSeveralActiveConfigurations;
    }

    public function actionEnableConfiguration()
    {
        $idConfigurationToChange = Tools::getValue('id_panoteq_configuration');

        $row = (Db::getInstance())->getRow('select * from ' . _DB_PREFIX_ . 'panoteq_configuration '
            . 'WHERE id_panoteq_configuration = ' . $idConfigurationToChange);

        (Db::getInstance())->update(
            'panoteq_configuration',
            ['active' => $row['active'] == '1' ? false : true],
            'id_panoteq_configuration = ' . $idConfigurationToChange
        );
    }

    public function actionDuplicateConfiguration()
    {
        $idConfigurationToDuplicate = Tools::getValue('id_panoteq_configuration');

        $row = (Db::getInstance())->getRow('select * from ' . _DB_PREFIX_ . 'panoteq_configuration '
            . 'WHERE id_panoteq_configuration = ' . $idConfigurationToDuplicate);

        (Db::getInstance())->insert(
            'panoteq_configuration',
            [
                'contents' => $row['contents'],
                'associated_products' => $row['associated_products'],
                'comment' => $row['comment'] . ' (copie)',
            ]
        );

        $this->confirmations[] = 'La ligne a été dupliquée avec succès !';
    }
}
