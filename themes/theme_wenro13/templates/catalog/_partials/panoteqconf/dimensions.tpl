<section v-if="conditionalDisplay({$step->id})">
    <br/><strong>{$step->label}</strong>
    <br/><br/>
    <dl class="uk-description-list">
        <dt>Largeur (en mm)</dt>
        <dd><input type="number" class="uk-input" v-model="form.values[{$step->value_id}].width"
                   v-on:change="updateDoorModel()"
                   v-bind:class="{ 'uk-form-danger': errors[{$step->id}] !== undefined && errors[{$step->id}][0].length > 0 }">
            <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}][0].length > 0"
                 v-html="errors[{$step->id}][0]" class="p-background-danger">ERROR
            </div>
        </dd>
        <dt>Hauteur (en mm)</dt>
        <dd><input type="number" class="uk-input" v-model="form.values[{$step->value_id}].height"
                   v-on:change="updateDoorModel()"
                   v-bind:class="{ 'uk-form-danger': errors[{$step->id}] !== undefined && errors[{$step->id}][1].length > 0 }">
            <div v-if="errors[{$step->id}] !== undefined && errors[{$step->id}][1].length > 0"
                 v-html="errors[{$step->id}][1]" class="p-background-danger">ERROR
            </div>
        </dd>
    </dl>
</section>
