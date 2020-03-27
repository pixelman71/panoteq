<span v-html="errors"></span>
<div v-if="errors[{$step->id}]">
    BUUG
</div>
<section v-if="conditionalDisplay({$step->id})">
    <div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle"
                 uk-grid>
                <div class="uk-background-cover"
                     v-bind:style="{ backgroundColor: form.values[{$step->value_id}] }"
                     uk-height-viewport></div>
                <div class="uk-padding-large">
                    <h1>Couleurs RAL</h1>
                    <p>Un éventail RAL est fortement recommandé car les couleurs
                        d'écran sont simplement une indication des couleurs finales.
                        Avec
                        l'éventail
                        de couleurs RAL physique vous pouvez être sûr de la bonne
                        couleur.</p>
                    <button class="uk-button uk-button-secondary uk-modal-close" type="button">Fermer</button>
                </div>
            </div>
        </div>
    </div>
    <form>
        <div class="ral-wrapper">
            <br/><strong>{$step->label}</strong><br/>
            {foreach from=$step->values item=$ralColor}
                {if isset($ralColor->swatch)}
                    <label class="ral-color"
                           style="background-image:url('{$ralColor->swatch}'); background-size: contain"
                           title="{$ralColor->label}"
                           v-bind:class="{ selected: form.values[{$step->value_id}] == '{$ralColor->swatch}' }">
                        <input name="color" type="radio" v-model="form.values[{$step->value_id}]"
                               v-on:change="updateDoorModel()"
                               value="{$ralColor->swatch}">
                    </label>
                {else}
                    <label class="ral-color" style="background-color:{$ralColor->value}"
                           v-bind:class="{ selected: form.values[{$step->value_id}] == '{$ralColor->value}' }">
                        <input name="color" type="radio" v-model="form.values[{$step->value_id}]"
                               v-on:change="updateDoorModel()"
                               value="{$ralColor->value}">
                    </label>
                {/if}
            {/foreach}
        </div>
    </form>
</section>
