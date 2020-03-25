{extends file='layouts/layout-full-width.tpl'}

{block name='head_seo' prepend}
    <link rel="canonical" href="{$product.canonical_url}">
{/block}

{block name='head' append}
    <meta property="og:type" content="product">
    <meta property="og:url" content="{$urls.current_url}">
    <meta property="og:title" content="{$page.meta.title}">
    <meta property="og:site_name" content="{$shop.name}">
    <meta property="og:description" content="{$page.meta.description}">
    <meta property="og:image" content="{$product.cover.large.url}">
    <meta property="product:pretax_price:amount" content="{$product.price_tax_exc}">
    <meta property="product:pretax_price:currency" content="{$currency.iso_code}">
    <meta property="product:price:amount" content="{$product.price_amount}">
    <meta property="product:price:currency" content="{$currency.iso_code}">
    {if isset($product.weight) && ($product.weight != 0)}
        <meta property="product:weight:value" content="{$product.weight}">
        <meta property="product:weight:units" content="{$product.weight_unit}">
    {/if}


    {*    <script src="/facade-cuisine-salle-bain/js/jquery/jquery-1.11.0.min.js"></script>*}
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/build/three.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/loaders/FBXLoader.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/controls/OrbitControls.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/libs/inflate.min.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/WebGL.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/libs/stats.min.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/shaders/SSAOShader.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/postprocessing/EffectComposer.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/postprocessing/ShaderPass.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/postprocessing/SSAOPass.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/shaders/CopyShader.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/SimplexNoise.js"></script>
    <script src="/themes/theme_wenro13/assets/js/node_modules/three/examples/js/libs/dat.gui.min.js"></script>
    <script src="/themes/theme_wenro13/assets/js/csg.js/csg.js"></script>
    <script src="/themes/theme_wenro13/assets/js/ThreeCSG/ThreeCSG2.js"></script>
    <script src="/themes/theme_wenro13/assets/js/threevisualization.js"></script>
{/block}

{block name='content'}
    <script>
        var panoteqConf = '{$panoteqconfserialized|unescape: "html" nofilter}';
    </script>
    <div id="app">
        <section id="main" itemscope itemtype="https://schema.org/Product">
            <meta itemprop="url" content="{$product.url}">

            {*        <div class="pq-ral-overlay" style="background-color: #ff00aa">*}
            {*            <div class="uk-overlay uk-position-top">*}
            {*                <button class="uk-close-large" type="button" uk-close></button>*}
            {*                RAL overlay*}
            {*            </div>*}
            {*        </div>*}

            <div class="row">
                <div id="content-wrapper" class="left-column right-column col-md-3">
                    <div class="">
                        <h5>Pourcentage configuré: <span v-html="percentComplete"></span>%</h5>
                        <button v-on:click="unsetLocalStorage">Clear localstorage</button>
                        <progress class="uk-progress" v-bind:value="percentComplete" max="100"></progress>
                    </div>
                    <ul uk-accordion>
                        {foreach from=$panoteqconf->steps item=$step}
                        {if $step->widget_type == 'group-start'}
                            {include file='catalog/_partials/panoteqconf/group-start.tpl'}
                        {/if}
                        {if $step->widget_type == 'color'}
                            {include file='catalog/_partials/panoteqconf/color.tpl'}
                        {/if}
                        {if $step->widget_type == 'color-sample'}
                            {include file='catalog/_partials/panoteqconf/color-sample.tpl'}
                        {/if}
                        {if $step->widget_type == 'radio'}
                            {include file='catalog/_partials/panoteqconf/radio.tpl'}
                        {/if}
                        {if $step->widget_type == 'text'}
                            {include file='catalog/_partials/panoteqconf/text.tpl'}
                        {/if}
                        {if $step->widget_type == 'selectbox'}
                            {include file='catalog/_partials/panoteqconf/selectbox.tpl'}
                        {/if}
                        {if $step->widget_type == 'dimensions'}
                            {include file='catalog/_partials/panoteqconf/dimensions.tpl'}
                        {/if}
                        {if $step->widget_type == 'group-end'}
                            {include file='catalog/_partials/panoteqconf/group-end.tpl'}
                        {/if}
                {/foreach}
                </ul>
            </div>
            <div id="right-column" class="col-md-9">
                <div class="container" style="background-color: white;padding: 1em; height: 100%" uk-sticky>
                <div class="container" style="background-color: white;padding: 1em; height: 100%" uk-sticky>
                    <div class="row">
                        <div class="col-md-12">
                            <div id="threevisualization"
                                 style="width: 100%; height: 400px;border: 1px solid #f0f0f0;background-color: #eaeae8"></div>

                            {*                                <img class="js-qv-product-cover" src="{$product.cover.bySize.large_default.url}"*}
                            {*                                     alt="{$product.cover.legend}" title="{$product.cover.legend}" style="width:100%;"*}
                            {*                                     itemprop="image">*}
                        </div>
                        <div class="col-md-12">
                            {block name='page_header_container'}
                                {block name='page_header'}
                                    <h1 class="h1 namne_details" style="margin-top: 1em"
                                        itemprop="name">{block name='page_title'}{$product.name}{/block}</h1>
                                {/block}
                            {/block}

                            {block name='product_prices'}
                                {*                                    {include file='catalog/_partials/product-prices.tpl'}*}
                            {/block}

                            <div class="product-information">
                                {block name='product_description_short'}
                                    <div id="product-description-short-{$product.id}" class="product-desc"
                                         itemprop="description">{$product.description_short nofilter}</div>
                                    <div class="">
                                        <h2 class="uk-h3">Résumé d'achat</h2>
                                        <div>
                                            <button class="uk-button" v-on:click="validateAll">Validate</button>
                                        </div>
                                        <div v-html="summary">

                                        </div>
                                        <h5>Prix total : <span v-html="totalAmount"></span></h5>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                {/block}

                                {if $product.is_customizable && count($product.customizations.fields)}
                                    {block name='product_customization'}
                                        {include file="catalog/_partials/product-customization.tpl" customizations=$product.customizations}
                                    {/block}
                                {/if}

                                <div class="product-actions">
                                    {block name='product_buy'}
                                        <form action="{$urls.pages.cart}" method="post" id="add-to-cart-or-refresh">
                                            <input type="hidden" name="token" value="{$static_token}">
                                            <input type="hidden" name="id_product" value="{$product.id}"
                                                   id="product_page_product_id">
                                            <input type="hidden" name="id_customization"
                                                   value="{$product.id_customization}"
                                                   id="product_customization_id">

                                            {block name='product_variants'}
                                                {include file='catalog/_partials/product-variants.tpl'}
                                            {/block}

                                            {block name='product_pack'}
                                                {if $packItems}
                                                    <section class="product-pack">
                                                        <h3 class="h4">{l s='This pack contains' d='Shop.Theme.Catalog'}</h3>
                                                        {foreach from=$packItems item="product_pack"}
                                                            {block name='product_miniature'}
                                                                {include file='catalog/_partials/miniatures/pack-product.tpl' product=$product_pack}
                                                            {/block}
                                                        {/foreach}
                                                    </section>
                                                {/if}
                                            {/block}

                                            {block name='product_discounts'}
                                                {include file='catalog/_partials/product-discounts.tpl'}
                                            {/block}

                                            {block name='product_add_to_cart'}
                                                {include file='catalog/_partials/product-add-to-cart.tpl'}
                                            {/block}


                                            {block name='product_refresh'}
                                                <input class="product-refresh ps-hidden-by-js" name="refresh"
                                                       type="submit" value="{l s='Refresh' d='Shop.Theme.Actions'}">
                                            {/block}
                                        </form>
                                    {/block}

                                </div>

                            </div>
                        </div>
                        <div class="col-xs-12" style="display: none">
                            <div class="tabs">
                                <ul class="nav nav-tabs">
                                    {if $product.description}
                                        <li class="nav-item">
                                            <a class="nav-link{if $product.description} active{/if}"
                                               data-toggle="tab"
                                               href="#description">{l s='Description' d='Shop.Theme.Catalog'}</a>
                                        </li>
                                    {/if}
                                    <li class="nav-item">
                                        <a class="nav-link{if !$product.description} active{/if}" data-toggle="tab"
                                           href="#product-details">{l s='Product Details' d='Shop.Theme.Catalog'}</a>
                                    </li>

                                    {hook h='ProductTab'}

                                    {if $product.attachments}
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab"
                                               href="#attachments">{l s='Attachments' d='Shop.Theme.Catalog'}</a>
                                        </li>
                                    {/if}
                                    {foreach from=$product.extraContent item=extra key=extraKey}
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab"
                                               href="#extra-{$extraKey}">{$extra.title}</a>
                                        </li>
                                    {/foreach}
                                </ul>

                                <div class="tab-content" id="tab-content">
                                    <div class="tab-pane fade in{if $product.description} active{/if}"
                                         id="description">
                                        {block name='product_description'}
                                            <div class="product-description">{$product.description nofilter}</div>
                                        {/block}
                                    </div>

                                    {block name='product_details'}
                                        {include file='catalog/_partials/product-details.tpl'}
                                    {/block}

                                    {block name='product_attachments'}
                                        {if $product.attachments}
                                            <div class="tab-pane fade in" id="attachments">
                                                <section class="product-attachments">
                                                    <h3 class="h5 text-uppercase">{l s='Download' d='Shop.Theme.Actions'}</h3>
                                                    {foreach from=$product.attachments item=attachment}
                                                        <div class="attachment">
                                                            <h4>
                                                                <a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}">{$attachment.name}</a>
                                                            </h4>
                                                            <p>{$attachment.description}</p
                                                            <a href="{url entity='attachment' params=['id_attachment' => $attachment.id_attachment]}">
                                                                {l s='Download' d='Shop.Theme.Actions'}
                                                                ({$attachment.file_size_formatted})
                                                            </a>
                                                        </div>
                                                    {/foreach}
                                                </section>
                                            </div>
                                        {/if}
                                    {/block}
                                    {foreach from=$product.extraContent item=extra key=extraKey}
                                    <div class="tab-pane fade in {$extra.attr.class}"
                                         id="extra-{$extraKey}" {foreach $extra.attr as $key => $val} {$key}="{$val}"{/foreach}
                                    >
                                    {$extra.content nofilter}
                                </div>
                            </div>
                            {/foreach}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </section>
    </div>
    {block name='page_footer_container'}
        <footer class="page-footer">
            {block name='page_footer'}
                <!-- Footer content -->
            {/block}
        </footer>
    {/block}
{/block}
