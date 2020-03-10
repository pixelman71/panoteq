<section v-if="conditionalDisplay({$step->id})">
    <br/><strong>{$step->label}</strong><br/>
    <table class="uk-table uk-table-divider">
        <thead>
        <tr>
            <th>Largeur</th>
            <th>Hauteur</th>
            <th>Charnières</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in form.values[{$step->id}]" v-bind:key="index">
            <td><input type="text" class="uk-input" v-model="item.width"></td>
            <td><input type="text" class="uk-input" v-model="item.height"></td>
            <td>
                <button class="uk-button" v-on:click="removePart({$step->id}, item)">X</button>
            </td>
        </tr>
        <tr>
            <button class="uk-button" v-on:click="addPart(form.values, {$step->id})">Ajouter</button>
        </tr>
        </tbody>
    </table>
</section>
