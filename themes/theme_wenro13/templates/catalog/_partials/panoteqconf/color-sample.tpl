<section v-if="conditionalDisplay({$step->id})">
    <div class="color-sample" v-bind:style="{ backgroundColor: form.values[{$step->value_id}], backgroundSize: 'cover', backgroundImage: 'url(' + form.values[{$step->value_id}] + ')'}" v-on:click="modelWidgets[{$step->id}].showRalPopup(form.values[{$step->value_id}])"></div>
</section>
