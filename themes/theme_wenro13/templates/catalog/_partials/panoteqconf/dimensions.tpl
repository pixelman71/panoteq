<section v-if="conditionalDisplay({$step->id})">
    <br/><strong>{$step->label} {include file='catalog/_partials/panoteqconf/_tooltip.tpl'}</strong><br/>
    <br/>
    <dl class="uk-description-list">
        <dt>Largeur (en mm)</dt>
        <dd><input type="number" class="uk-input" v-model="form.values[{$step->value_id}].width" min="[{$step->value_min_horiz}]" max="[{$step->value_max_horiz}]"
                   v-on:keyup="forceRecomputeValues()"
                   v-bind:class="{ 'uk-form-danger': errors[{$step->id}] !== undefined && errors[{$step->id}].length > 0 && errors[{$step->id}][0].length > 0 }">
            <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}].length > 0 && errors[{$step->id}][0].length > 0"
                 v-html="errors[{$step->id}][0]" class="p-background-danger">ERROR
            </div>
        </dd>
        <dt>Hauteur (en mm)</dt>
        <dd><input type="number" class="uk-input" v-model="form.values[{$step->value_id}].height"
                   v-on:keyup="forceRecomputeValues()"
                   v-bind:class="{ 'uk-form-danger': errors[{$step->id}] !== undefined && errors[{$step->id}].length > 1 && errors[{$step->id}][1].length > 0 }">
            <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}].length > 1 && errors[{$step->id}][1].length > 0"
                 v-html="errors[{$step->id}][1]" class="p-background-danger">ERROR
            </div>
        </dd>
    </dl>
</section>
