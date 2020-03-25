<section v-if="conditionalDisplay({$step->id})">
    <br/><strong>{$step->label}</strong><br/>
    <table class="uk-table uk-table-divider">
        <thead>
        <tr>
            <th>Largeur</th>
            <th>Hauteur</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><input type="text" class="uk-input" v-model="form.values[{$step->value_id}].width" v-on:change="updateDoorModel()"></td>
            <td><input type="text" class="uk-input" v-model="form.values[{$step->value_id}].height" v-on:change="updateDoorModel()"></td>
        </tr>
        </tbody>
    </table>
</section>
