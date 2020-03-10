<section v-if="conditionalDisplay({$step->id})">
    <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
        <div class="uk-margin-small-top">
            <input type="text" class="uk-input" name="type" v-model="form.values[{$step->id}]">
        </div>
    </div>
</section>
