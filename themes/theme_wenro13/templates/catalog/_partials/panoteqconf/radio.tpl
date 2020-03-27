<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        <br/><strong>{$step->label}</strong><br/>
        {foreach from=$step->values item=$value}
            <div class="uk-margin-small-top">
                <label>
                    <input type="radio" class="uk-radio" name="radio{$step->value_id}" value="{$value->value}"
                           v-model="form.values[{$step->value_id}]" v-on:change="updateDoorModel()">
                    {$value->label}
                </label>
            </div>
        {/foreach}
    </div>
    <div v-if="errors[{$step->id}]" v-html="errors[{$step->id}]"></div>
</section>
