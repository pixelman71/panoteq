var app = new Vue({
    el: '#app',
    data: {
        model: {
        },
        form: {
            schemaVersion: 1,
            values: []
        }
    },
    methods: {
        showRalPopup: function () {
//            UIkit.toggle('#modal-full').toggle()
        },
        setSwatch: function (swatch) {
            // console.log('setSwatch(' + swatch + ')');
            // if(swatch) {
            //     this.form.swatch = swatch;
            // }
        },
        addPart: function(stepId) {
            this.form.values[stepId].push(this.partFactory());
        },
        removePart: function(stepId, part) {
            if(this.form.values[stepId].length <= 1) {
                console.log('Can\'t remove part.')
                return;
            }

            this.form.values[stepId].splice(this.form.values[stepId].indexOf(part), 1);
        },
        partFactory: function() {
            return {
                width: 0,
                height: 0
            };
        },
        stepValidates: function(stepId) {
            //condition.validates == true;
            // this.model.steps[stepId].
            return true; // TODO
        },
        conditionalDisplay(stepId) {
            var matchesConditions = true;

            var foundConditions = this.model.conditional_display.filter((e) => { return e.step == stepId });
            if(foundConditions.length > 0) {
                (foundConditions[0].conditions).forEach((condition) => {
                    // console.log('matchesConditions: ' + stepId + " - found: ");
                    // console.log(condition);
                    // console.log('len: ' + this.form.values[condition.step].length);

                    matchesConditions &=
                        (this.form.values[condition.step] !== undefined && this.form.values[condition.step].length > 0)
                        && (this.form.values[condition.step].length > 0 && this.form.values[condition.step] == condition.value)
                        //     || this.stepValidates(condition.step))
                    ;
                });
            }

            return matchesConditions;
        }
    },
    beforeMount: function() {
        // Load model
        this.model = JSON.parse(panoteqConf);

        // Prepare default values
        this.form.schemaVersion = 1; // TODO
        this.form.values = [];

        this.model.steps.forEach((step, index) => {
            if(step.widget_type == 'dimensions') {
                this.form.values[index] = [
                    { width: 1, height: 2},
                    { width: 3, height: 4}
                ];
            }
            else {
                this.form.values[index] = null;
            }
        });

        // Load from local storage
        if (localStorage['panoteq-config'] !== undefined) {
            // console.log('Loading from local storage');
            // this.form = JSON.parse(localStorage['panoteq-config']);
        }
    },
    mounted: function() {
        // Intercept click on add to cart button
        $('form#add-to-cart-or-refresh button[type=button]').click((e) => {
            e.preventDefault();

            // Save custom option
            $('.product-customization-item textarea').val(JSON.stringify(this.form));

            // Add to cart
            $('section.product-customization form').ajaxSubmit((data) => {
                console.log('id_customization: ' + data);
                $('form#add-to-cart-or-refresh input[name=id_customization]').val(data);

                $('form#add-to-cart-or-refresh').append('<input type="hidden" name="qty" value="1">');
                $('form#add-to-cart-or-refresh').append('<input type="hidden" name="add" value="1">');
                $('form#add-to-cart-or-refresh').append('<input type="hidden" name="action" value="update">');

                $('form#add-to-cart-or-refresh').submit();
            });
        });
    },
    computed: {
        summary: function () {
            var serialized = JSON.stringify(this.form);

            // Save to local storage
            localStorage['panoteq-config'] = serialized;

            return JSON.stringify(serialized);
        },
        totalAmount: function() {
            var sum = 0;
            // this.form.parts.forEach((part) => {
            //     console.log(part);
            //     sum += part.width * part.height * this.form.sqmPrice
            // });

            return sum;
        }
    }
});
