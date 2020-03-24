var app = new Vue({
    el: '#app',
    data: {
        model: {},
        form: {
            schemaVersion: 1,
            values: [],
        },
        errors: [],
        panoteq3dViewer: null,
        someVariableUnderMyControl: ''
    },
    methods: {
        showRalPopup: function (color) {
            UIkit.modal('#modal-full').show();
        },
        updateDoorModel: function () {
            var productId = 2; // 1800

            // Transform data: percages
            var percages = [];
            this.getParamPercages().forEach((val) => {
                percages.push(parseInt(val.value))
            })

            // Transform data: texture
            var isRAL = this.getParamColor().startsWith('#');
            var textureName = this.getParamColor();
            if(!isRAL) {
                if(this.getParamTextureHorizontal()) {
                    textureName = this.getHorizontalTextureFromSteps();
                }
            }

            if (this.panoteq3dViewer == null) {
                this.panoteq3dViewer = new Panoteq3dViewer();
                this.panoteq3dViewer.init($("#threevisualization"), productId,
                    textureName, false, percages,
                    this.getParamEmplacementCharnieres() == 'droite',
                    false, [this.getParamDimensions().width,
                    this.getParamDimensions().height], false);
            } else {
                this.panoteq3dViewer.loadDoorModel(productId, textureName,
                    isRAL, false, percages,
                    this.getParamEmplacementCharnieres() == 'droite',
                    [this.getParamDimensions().width, this.getParamDimensions().height],
                    false);
            }
        },
        setSwatch: function (swatch) {
            // console.log('setSwatch(' + swatch + ')');
            // if(swatch) {
            //     this.form.swatch = swatch;
            // }
        },
        addValue: function (values, index) {
            Vue.set(values, index, this.form.values[index].concat([{'value': 0}]));
        },
        removeValue: function (stepId, part) {
            if (this.form.values[stepId].length <= 1) {
                console.log('Can\'t remove part.')
                return;
            }

            this.form.values[stepId].splice(this.form.values[stepId].indexOf(part), 1);
        },
        stepValidates: function (stepId) {
            //condition.validates == true;
            // this.model.steps[stepId].
            return true; // TODO
        },
        conditionalDisplay(stepId) {
            var matchesConditions = true;
            //
            // var foundConditions = this.model.conditional_display.filter((e) => {
            //     return e.step == stepId
            // });
            // if (foundConditions.length > 0) {
            //     (foundConditions[0].conditions).forEach((condition) => {
            //         // console.log('matchesConditions: ' + stepId + " - found: ");
            //         // console.log(condition);
            //         // console.log('len: ' + this.form.values[condition.step].length);
            //
            //         matchesConditions &=
            //             (this.form.values[condition.step] !== undefined && this.form.values[condition.step].length > 0)
            //             && (this.form.values[condition.step].length > 0 && this.form.values[condition.step] == condition.value)
            //         //     || this.stepValidates(condition.step))
            //         ;
            //     });
            // }

            return matchesConditions;
        },
        validateStep: function (stepId) {
            var step = this.model.steps[stepId];
            var value = this.form.values[step.id];

            this.errors[step.id] = false;
            console.log('validateStep')
            console.log(this.errors)

            if (!this.stepNeedsCompletion(step.id)) {
                return true;
            }

            if (value === undefined) {
                this.errors[step.id] = true;
                return false;
            }

            switch (step.widget_type) {
                case 'color':
                    if (value == '#CDA434') {
                        console.log('Wrong color')
                        this.errors[step.id] = true;// 'Wrong color';
                        return false;
                    }
                default:
                    return true;
            }

            // return this.errors[stepId] === undefined;
            return false;
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

            this.updateDoorModel();

            // panoteq3dViewer.init($("#threevisualization"), 4393, 7391, false, [0, 1.5, 2.5, 3.5, 4.5, 5.5, 8], false, false, [4, 10], true); // Alto
        },
        isStepComplete: function (stepId) {
            if (!this.stepNeedsCompletion(stepId)) {
                return false;
            }

            var step = this.model.steps[stepId];
            var value = this.form.values[step.id];

            if (value === undefined) {
                return false;
            }

            switch (step.widget_type) {
                case 'text':
                    return value.length > 0;
                    break;
                case 'radio':
                case 'selectbox':
                case 'color':
                case 'color-sample':
                    return true;
                case 'dimensions':
                    console.log(value);
                    return value.width !== null && value.height !== null;
                default:
                    break;
            }

            return true;
        },
        stepNeedsCompletion: function (stepId) {
            var step = this.model.steps[stepId];

            switch (step.widget_type) {
                case 'text':
                case 'radio':
                case 'selectbox':
                case 'color':
                case 'color-sample':
                case 'dimensions':
                    return true;
                    break;
                default:
                    break;
            }

            return false;
        },
        validateAll: function () {
            console.log('validateAll')

            this.model.steps.forEach((step, index) => {
                this.validateStep(step.id);
            });
        },
        getParamTextureHorizontal: function () {
            var result = false;

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Sens du fil' && this.form.values[step.id] == 'horizontal') {
                    result = true;
                }
            });

            return result;
        },
        getParamDimensions: function () {
            var result = null;

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Dimensions porte') {
                    result = this.form.values[step.id];
                }
            });

            return result;
        },
        getParamColor: function () {
            var result = null;

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Uni') {
                    result = this.form.values[step.id];
                }
            });

            return result;
        },
        getParamEmplacementCharnieres: function () {
            var result = null;

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Emplacements charnières') {
                    result = this.form.values[step.id];
                }
            });

            return result;
        },
        getParamPercages: function () {
            var result = null;

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Perçages') {
                    result = this.form.values[step.id];
                }
            });

            return result;
        },
        getHorizontalTextureFromSteps: function() {
            var result = null;

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Uni') {
                    var textureToFind = step.values.filter((e) => { return e.swatch === this.form.values[step.id]});

                    if(textureToFind.length > 0 && textureToFind[0].swatch_horiz !== undefined) {
                        result = textureToFind[0].swatch_horiz;
                    }
                }
            });

            return result;
        }
    },
    beforeCreate: function () {

    },
    created: function () {
        // Load model
        this.model = JSON.parse(panoteqConf);

        // Prepare default values
        this.form.schemaVersion = 1; // TODO
        // this.form.values = [];

        this.model.steps.forEach((step, index) => {
            switch (step.widget_type) {
                case 'dimensions':
                    this.form.values[step.id] = {
                        width: 1,
                        height: 2
                    }
                    break;
                case 'text':
                    this.form.values[step.id] = [{'value': 0}];
                default:
                    // this.form.values[index] = [0];
                    break;
            }
        });

        // Load from local storage
        if (localStorage['panoteq-config'] !== undefined) {
            // console.log('Loading from local storage');
            this.form = JSON.parse(localStorage['panoteq-config']);
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
            this.model.steps.forEach((step, index) => {
                if (step.label == 'Dimensions porte') {
                    sum += this.form.values[step.id].width * this.form.values[step.id].height * step.price_impact;
                }
            });

            return Math.round(sum, 2);
        },
        percentComplete: function () {
            var modelValuesAlreadyChecked = [];
            var stepsComplete = 0;
            var stepsNeedingCompletion = 0;

            this.model.steps.forEach((step, index) => {
                if (modelValuesAlreadyChecked.indexOf(step.id) !== -1) {
                    // Is duplicate (accessing same value). Do not count in.
                    return;
                }

                modelValuesAlreadyChecked.push(step.id);

                stepsComplete += this.isStepComplete(index) ? 1 : 0;
                stepsNeedingCompletion += this.stepNeedsCompletion(index) ? 1 : 0;
            });

            var result = Math.round((stepsComplete / stepsNeedingCompletion) * 100);
            return result > 100 ? 100 : result;
        },
    }
});
