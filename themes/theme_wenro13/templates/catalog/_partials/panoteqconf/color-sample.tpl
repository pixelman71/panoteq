<section v-if="conditionalDisplay({$step->id})">
    <div class="color-sample" v-bind:style="{ backgroundColor: form.values[{$step->id}]}" v-on:click="showRalPopup(form.values[{$step->id}])"></div>
</section>
