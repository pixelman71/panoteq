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
{/block}

{block name='content'}
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
                    <img class="js-qv-product-cover" src="{$product.cover.bySize.large_default.url}"
                         alt="{$product.cover.legend}" title="{$product.cover.legend}" style="width:100%;"
                         itemprop="image">

                    <div class="color-sample" v-bind:style="{ backgroundColor: form.color }"></div>

                    <ul uk-accordion>
                        <li class="uk-open--disabled">
                            <a class="uk-accordion-title" href="#">Couleur</a>
                            <div class="uk-accordion-content">
                                <a class="uk-button uk-button-default" href="#modal-full" uk-toggle>Open</a>
                                <div id="modal-full" class="uk-modal-full" uk-modal>
                                    <div class="uk-modal-dialog">
                                        <button class="uk-modal-close-full uk-close-large" type="button"
                                                uk-close></button>
                                        <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                                            <div class="uk-background-cover" v-bind:style="{ backgroundColor: form.color }"
                                                 uk-height-viewport></div>
                                            <div class="uk-padding-large">
                                                <h1>Couleurs RAL</h1>
                                                <p>Un éventail RAL est fortement recommandé car les couleurs
                                                    d'écran sont simplement une indication des couleurs finales. Avec
                                                    l'éventail
                                                    de couleurs RAL physique vous pouvez être sûr de la bonne
                                                    couleur.</p>
                                                <button class="uk-button uk-button-primary" type="button">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div class="ral-wrapper">
                                        <br/><strong>Finition brillante</strong><br/>
                                        {foreach from=$ralColors1 item=$ralColor}
                                            <label class="ral-color" style="background-color:{$ralColor}"
                                                   v-bind:class="{ selected: form.color == '{$ralColor}' }"
                                                   v-on:click="showRalPopup">
                                                <input name="color" type="radio" v-model="form.color" value="{$ralColor}">
                                            </label>
                                        {/foreach}
                                        <br/><strong>Finition unie</strong><br/>
                                        {foreach from=$ralColors2 item=$ralColor}
                                            <div class="ral-color" style="background-color:{$ralColor}"></div>
                                        {/foreach}
                                        <br/><strong>Finition structurée</strong><br/>
                                        {foreach from=$ralColors3 item=$ralColor}
                                            <div class="ral-color" style="background-color:{$ralColor}"></div>
                                        {/foreach}
                                        <br/><strong>Finition laquée</strong><br/>
                                        {foreach from=$ralColors4 item=$ralColor}
                                            <div class="ral-color" style="background-color:{$ralColor}"></div>
                                        {/foreach}
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li>
                            <a class="uk-accordion-title" href="#">Type de pièce</a>
                            <div class="uk-accordion-content">
                                <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
                                    <div>
                                        <label><input type="radio" class="uk-radio" name="type" value="porte"
                                                      v-model="form.type"> Porte</label>
                                    </div>
                                    <div class="uk-margin-small-top">
                                        <label><input type="radio" class="uk-radio" name="type" value="casserolier"
                                                      v-model="form.type">
                                            Casserolier</label>
                                    </div>
                                    <div class="uk-margin-small-top">
                                        <label><input type="radio" class="uk-radio" name="type" value="tiroir"
                                                      v-model="form.type"> Tiroir</label>
                                    </div>
                                    <div class="uk-margin-small-top">
                                        <label><input type="radio" class="uk-radio" name="type" value="bandeau"
                                                      v-model="form.type">
                                            Bandeau</label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="uk-open">
                            <a class="uk-accordion-title" href="#">Dimensions</a>
                            <div class="uk-accordion-content">
                                <table class="uk-table uk-table-divider">
                                    <thead>
                                    <tr>
                                        <th>Largeur</th>
                                        <th>Hauteur</th>
                                        <th>Charnières</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item, index) in form.parts">
                                        <td><input type="text" class="uk-input" v-model="item.width"></td>
                                        <td><input type="text" class="uk-input" v-model="item.height"></td>
                                        <td><button class="uk-button" v-on:click="removePart(item)">X</button></td>
                                    </tr>
                                    <tr>
                                        <button class="uk-button" v-on:click="addPart()">Ajouter</button>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                        <li class="uk-open">
                            <a class="uk-accordion-title" href="#">Emplacements charnières</a>
                            <div class="uk-accordion-content">

                            </div>
                        </li>
                    </ul>
                </div>
                <div id="right-column" class="col-md-9">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <img class="js-qv-product-cover" src="{$product.cover.bySize.large_default.url}"
                                     alt="{$product.cover.legend}" title="{$product.cover.legend}" style="width:100%;"
                                     itemprop="image">
                            </div>
                            <div class="col-md-7">
                                {block name='page_header_container'}
                                    {block name='page_header'}
                                        <h1 class="h1 namne_details"
                                            itemprop="name">{block name='page_title'}{$product.name}{/block}</h1>
                                    {/block}
                                {/block}

                                {block name='product_prices'}
                                    {include file='catalog/_partials/product-prices.tpl'}
                                {/block}

                                <div class="product-information">
                                    {block name='product_description_short'}
                                        <div id="product-description-short-{$product.id}" class="product-desc"
                                             itemprop="description">{$product.description_short nofilter}</div>
                                        <div class="">
                                            <h2 class="uk-h3">Résumé d'achat</h2>
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
                                                    <progress class="uk-progress" value="70" max="100"></progress>
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
                            <div class="col-xs-12">
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
                                        <div class="tab-pane fade in" id="idTab5">
                                            {hook h='ProductTabContent'}
                                        </div>
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
