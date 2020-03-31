<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        <br/><strong>{$step->label} {include file='catalog/_partials/panoteqconf/_tooltip.tpl'}</strong><br/>
        <div v-for="(item, index) in form.values[{$step->value_id}]" v-bind:key="index">
            <td><input type="text" class="uk-input" v-model="item.value"></td>
        </div>
    </div>
    <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}].length > 0" v-html="errors[{$step->id}]"
         class="p-background-danger">ERROR
    </div>
</section>
