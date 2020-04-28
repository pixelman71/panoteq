<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        <div class="uk-margin-small-top">
            <select class="uk-select" name="selectbox" v-model="form.values[{$step->id}]">
                {foreach from=$step->values item=$value}
                    <option value="{$value->value}">{$value->label}</option>
                {/foreach}
            </select>
        </div>
    </div>
</section>
