<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid" v-bind:class="{ 'p-background-danger': errors[{$step->id}] !== undefined && errors[{$step->id}].length > 0 }">
        <br/><strong>{$step->label} {include file='catalog/_partials/panoteqconf/_tooltip.tpl'}</strong><br/>
        <div class="uk-margin-small-top">
            <select class="uk-select" name="selectbox" v-model="form.values[{$step->value_id}]">
                {foreach from=$step->values item=$value}
                    <option value="{$value->value}">{$value->label}</option>
                {/foreach}
            </select>
        </div>
    </div>
    <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}].length > 0" v-html="errors[{$step->id}]" class="p-background-danger">ERROR</div>
</section>
