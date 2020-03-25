<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        <br/><strong>{$step->label}</strong><br/>
        <div class="uk-margin-small-top">
            <table class="uk-table uk-table-divider">
                <tbody>
                <tr v-for="(item, index) in form.values[{$step->value_id}]" v-bind:key="index">
                    <td><input type="text" class="uk-input" v-model="item.value" v-on:change="updateDoorModel()"></td>
                    <td>
                        <button class="uk-button" v-on:click="modelWidgets[{$step->id}].removeValue(form.values, {$step->value_id}, item)">X</button>
                    </td>
                </tr>
                <tr>
                    <button class="uk-button" v-on:click="modelWidgets[{$step->id}].addValue(form.values, {$step->value_id})">Ajouter</button>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</section>
