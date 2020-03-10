var app = new Vue({
    el: '#app',
    data: {
        model: {},
        form: {
            schemaVersion: 1,
            values: []
        },
        panoteq3dViewer: null,
        percentComplete: 11
    },
    methods: {
        showRalPopup: function (color) {
            UIkit.modal('#modal-full').show();
            this.panoteq3dViewer.loadDoorModel(1800, color, true, false, [], false, [4, 3], false);
        },
        setSwatch: function (swatch) {
            // console.log('setSwatch(' + swatch + ')');
            // if(swatch) {
            //     this.form.swatch = swatch;
            // }
        },
        addPart: function (stepId) {
            this.form.values[stepId].push(this.partFactory());
        },
        removePart: function (stepId, part) {
            if (this.form.values[stepId].length <= 1) {
                console.log('Can\'t remove part.')
                return;
            }

            this.form.values[stepId].splice(this.form.values[stepId].indexOf(part), 1);
        },
        partFactory: function () {
            return {
                width: 0,
                height: 0
            };
        },
        stepValidates: function (stepId) {
            //condition.validates == true;
            // this.model.steps[stepId].
            return true; // TODO
        },
        conditionalDisplay(stepId) {
            var matchesConditions = true;

            var foundConditions = this.model.conditional_display.filter((e) => {
                return e.step == stepId
            });
            if (foundConditions.length > 0) {
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
        },
        init3dVisualization: function () {
//         $('#model-selector,#texture-selector,#left-right,#width,#height,#texture-orientation,#handle').change(function (e) {
// //                    $('form').submit();
// //                });
// //
// //                $('.model-button').click(function (e) {
// //                    var modelName = $(this).attr('data-model');
// //                    var textureName = $('#texture-selector').val();
// //                    console.log('clicked ' + modelName);
// //                    console.log(this);
//             panoteq3dViewer.loadDoorModel($('#model-selector').val(), $('#texture-selector').val(),
//                 false,
//                 $('#handle').val() === 'bottom' ? true : false,
//                 [0, 1.5, 2.5, 3.5, 4.5, 5.5, 8],
//                 $('#left-right').val() === '1' ? 1 : 0,
//                 [$('#width').val(), $('#height').val()],
//                 $('#texture-orientation').val() === 'horizontal' ? true : false
//             );
// //                    panoteq3dViewer2.loadDoorModel($('#model-selector').val(), $('#texture-selector').val(),
// //                            false,
// //                            [0, 1.5, 2.5, 3.5, 4.5, 5.5, 8],
// //                            $('#left-right').val() == '1' ? 1 : 0,
// //                            [$('#width').val(), $('#height').val()],
// //                            $('#texture-orientation').val() == 'horizontal' ? true : false
// //                            );
//         });

            // $('#reset-camera').click(function (e) {
            //     panoteq3dViewer.resetCameraPosition();
            //     e.preventDefault();
            // });

            this.panoteq3dViewer = new Panoteq3dViewer();
//                panoteq3dViewer2 = new Panoteq3dViewer();
//                panoteq3dViewer2.init($("#threevisualization2"), 1800, 182, [ 1.0, 1.5 ], false, true); // Tenor
            this.panoteq3dViewer.init($("#threevisualization"), 1800, 7391, false, [0, 1.5, 2.5, 3.5, 4.5, 5.5, 8], false, false, [4, 4], true); // Tenor Ambassador
            //panoteq3dViewer.init($("#threevisualization"), 4393, 7391, false, [0, 1.5, 2.5, 3.5, 4.5, 5.5, 8], false, false, [4, 10], true); // Alto
        }
    },
    beforeMount: function () {
        // Load model
        this.model = JSON.parse(panoteqConf);

        // Prepare default values
        this.form.schemaVersion = 1; // TODO
        this.form.values = [];

        this.model.steps.forEach((step, index) => {
            if (step.widget_type == 'dimensions') {
                this.form.values[index] = [
                    {width: 1, height: 2},
                    {width: 3, height: 4}
                ];
            } else {
                this.form.values[index] = null;
            }
        });

        // Load from local storage
        if (localStorage['panoteq-config'] !== undefined) {
            // console.log('Loading from local storage');
            // this.form = JSON.parse(localStorage['panoteq-config']);
        }
    },
    mounted: function () {
        // Init 3D visualization
        this.init3dVisualization();

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
        totalAmount: function () {
            var sum = 0;
            // this.form.parts.forEach((part) => {
            //     console.log(part);
            //     sum += part.width * part.height * this.form.sqmPrice
            // });

            return sum;
        }
    }
});
