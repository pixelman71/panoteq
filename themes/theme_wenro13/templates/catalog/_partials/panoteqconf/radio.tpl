<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        <br/><strong>{$step->label}
            <a class="p-tooltip" data-toggle="modal" data-target="#panoteq-tooltip-modal-{$step->id}">INFO</a>
            <div class="modal fade customization-modal" id="panoteq-tooltip-modal-{$step->id}" tabindex="-1"
                 role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="product-customization-line row">
                                {if isset($step->tooltipImage)}
                                    <div class="col-sm-12 col-xs-12 value">
                                        <img src="{$step->tooltipImage}">
                                    </div>
                                {else}
                                    <div class="col-sm-12 col-xs-12 value">
                                        {$step->tooltip}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </strong>
        <br/>
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
    <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}].length > 0" v-html="errors[{$step->id}]"
         class="p-background-danger">ERROR
    </div>
</section>
