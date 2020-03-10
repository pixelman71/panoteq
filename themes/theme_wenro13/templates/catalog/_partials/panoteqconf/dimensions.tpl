<table class="uk-table uk-table-divider">
    <thead>
    <tr>
        <th>Largeur</th>
        <th>Hauteur</th>
        <th>Charnières</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in form.parts">
        <td><input type="text" class="uk-input" v-model="item.width"></td>
        <td><input type="text" class="uk-input" v-model="item.height"></td>
        <td>
            <button class="uk-button" v-on:click="removePart(item)">X</button>
        </td>
    </tr>
    <tr>
        <button class="uk-button" v-on:click="addPart()">Ajouter</button>
    </tr>
    </tbody>
</table>
