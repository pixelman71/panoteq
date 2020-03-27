var app = new Vue({
    el: '#app',
    data: {
        model: {},
        modelWidgets: [],
        form: {
            schemaVersion: 1,
            values: [],
        },
        errors: [],
        panoteq3dViewer: null,
        recompute: 0
    },
    created: function () {
        this.readModelAndPrepareDefaultFormValues()
        // this.loadFormValuesFromLocalStorage()
    },
    mounted: function () {
        this.updateDoorModel()
        this.initInterceptOnAddToCartEvent()
    },
    methods: {
        updateDoorModel: function () {
            this.forceRecomputeValues()

            // Prepare data
            let productId = this.get3dBindParamValue('model'); // 1800
            let percages = this.get3dBindParamValue('percages').map((val) => {
                return parseInt(val.value)
            })
            let emplacementCharnieresDroite = this.get3dBindParamValue('emplacement_charnieres') == 'droite'
            let isRAL = this.get3dBindParamValue('color').startsWith('#')
            let textureName = this.get3dBindParamValue('color')
            let horizontalTexture = false
            if (!isRAL) {
                if (this.get3dBindParamValue('sens_fil') == 'horizontal') {
                    horizontalTexture = true
                    //     textureName = this.get3dBindParamSwatchHoriz('color')
                }
            }

            // Init 3d instance
            if (this.panoteq3dViewer == null) {
                this.panoteq3dViewer = new Panoteq3dViewer()
                this.panoteq3dViewer.init($("#threevisualization"), productId, textureName, false, percages,
                    emplacementCharnieresDroite, false, [
                        this.get3dBindParamValue('dimensions').width,
                        this.get3dBindParamValue('dimensions').height
                    ], horizontalTexture)
            } else {
                this.panoteq3dViewer.loadDoorModel(productId, textureName, isRAL, false, percages,
                    emplacementCharnieresDroite, [
                        this.get3dBindParamValue('dimensions').width,
                        this.get3dBindParamValue('dimensions').height
                    ], horizontalTexture)
            }
        },
        conditionalDisplay(stepId) {
            var matchesConditions = true
            //
            // var foundConditions = this.model.conditional_display.filter((e) => {
            //     return e.step == stepId
            // })
            // if (foundConditions.length > 0) {
            //     (foundConditions[0].conditions).forEach((condition) => {
            //         // console.log('matchesConditions: ' + stepId + " - found: ")
            //         // console.log(condition)
            //         // console.log('len: ' + this.form.values[condition.step].length)
            //
            //         matchesConditions &=
            //             (this.form.values[condition.step] !== undefined && this.form.values[condition.step].length > 0)
            //             && (this.form.values[condition.step].length > 0 && this.form.values[condition.step] == condition.value)
            //         //     || this.stepValidates(condition.step))
            //
            //     })
            // }

            return matchesConditions
        },
        validateStep: function (stepId) {
            // var step = this.model.steps[stepId]
            // var value = this.form.values[step.id]
            //
            // this.errors[step.id] = false
            // console.log('validateStep')
            // console.log(this.errors)
            //
            // if (!this.stepNeedsCompletion(step.id)) {
            //     return true
            // }
            //
            // if (value === undefined) {
            //     this.errors[step.id] = true
            //     return false
            // }
            //
            // switch (step.widget_type) {
            //     case 'color':
            //         if (value == '#CDA434') {
            //             console.log('Wrong color')
            //             this.errors[step.id] = true// 'Wrong color'
            //             return false
            //         }
            //     default:
            //         return true
            // }

            // return this.errors[stepId] === undefined
            return false
        },
        validateAll: function () {
            this.model.steps.forEach(step => {
                this.errors[step.id] = this.modelWidgets[step.id].validateStep(this.form.values[step.value_id])
            })

            this.getFirstErrorStepId()

            this.forceRecomputeValues()
        },
        get3dBindParamValue: function (bindParamName) {
            let result = null
            this.model.steps.forEach((step) => {
                if (step.bind_3d_param == bindParamName) {
                    result = this.form.values[step.value_id]
                }
            })

            return result
        },
        get3dBindParamSwatchHoriz: function (bindParamName) {
            let found = this.model.steps.filter((e) => {
                return e.bind_3d_param == bindParamName
            })

            if (found.length > 0) {
                var val = found[0].values[found[0].value_id].swatch_horiz

                if (val !== undefined) {
                    return val
                }
            }

            return null
        },
        initInterceptOnAddToCartEvent: function () {
            // Intercept click on add to cart button
            $('form#add-to-cart-or-refresh button[type=button]').click((e) => {
                e.preventDefault()

                // Save custom option
                $('.product-customization-item textarea').val(JSON.stringify(this.form))

                // Add to cart
                $('section.product-customization form').ajaxSubmit((data) => {
                    $('form#add-to-cart-or-refresh input[name=id_customization]').val(data)

                    $('form#add-to-cart-or-refresh').append('<input type="hidden" name="qty" value="1">')
                    $('form#add-to-cart-or-refresh').append('<input type="hidden" name="add" value="1">')
                    $('form#add-to-cart-or-refresh').append('<input type="hidden" name="action" value="update">')

                    $('form#add-to-cart-or-refresh').submit()
                })
            })
        },
        readModelAndPrepareDefaultFormValues: function () {
            this.model = JSON.parse(panoteqConf)
            this.model.steps.forEach((step, index) => {
                try {
                    let className = step.widget_type[0].toUpperCase() + step.widget_type.substr(1) + 'Widget';
                    eval('this.modelWidgets[step.id] = new ' + className + '(step)');
                } catch (e) {
                    this.modelWidgets[step.id] = new EmptyWidget(step, this.form.values[step.value_id])
                }

                if (this.modelWidgets[step.id].requiresCompletion() && this.modelWidgets[step.id].getDefaultValue() !== undefined) {
                    this.form.values[step.value_id] = this.modelWidgets[step.id].getDefaultValue()
                }
            })
        },
        loadFormValuesFromLocalStorage: function () {
            if (localStorage['panoteq-config'] !== undefined) {
                // console.info('Loading from local storage')
                this.form = JSON.parse(localStorage['panoteq-config'])
            }
        },
        saveFormValuesToLocalStorage: function () {
            localStorage['panoteq-config'] = JSON.stringify(this.form)
        },
        unsetLocalStorage: function () {
            localStorage.removeItem('panoteq-config')
        },
        getStepsNoDuplicateValues: function () {
            let steps = []
            let modelValuesAlreadyChecked = []

            this.model.steps.forEach((step) => {
                if (!this.modelWidgets[step.id].requiresCompletion()) {
                    return
                }

                if (modelValuesAlreadyChecked.indexOf(step.value_id) !== -1) {
                    // Is duplicate (accessing same value). Do not count in.
                    return
                }

                modelValuesAlreadyChecked.push(step.value_id)
                steps.push(step)
            })

            return steps
        },
        getStepValue(stepValueId) {
            return this.form.values[stepValueId]
        },
        forceRecomputeValues() {
            this.recompute++
        },
        getFirstErrorStepId() {
            var firstStep = null
            this.model.steps.forEach((step) => {
                if (firstStep == null && this.errors[step.id].length > 0) {
                    firstStep = step.id
                }
            })

            console.log('getFirstErrorStepId: ' + firstStep)
        }
    },
    computed: {
        summary: function () {
            this.saveFormValuesToLocalStorage()

            let result = ''

            // let result = JSON.stringify(JSON.stringify(this.form))
            this.getStepsNoDuplicateValues().forEach((step) => {
                let description = this.modelWidgets[step.id].description(this.getStepValue(step.value_id))
                if (description !== null) {
                    result += description + '<br>'
                }
            })

            return result
        },
        totalAmount: function () {
            const dummy = this.recompute

            amount = Math.round(this.getStepsNoDuplicateValues().reduce((sum, step) => {
                if (typeof (sum) === 'object') sum = 0
                if (this.modelWidgets[step.id].isComplete(this.getStepValue(step.value_id))) {
                    return sum + this.modelWidgets[step.id].priceImpact(this.getStepValue(step.value_id))
                }

                return sum
            }), 2)

            this.form.calculatedAmount = amount
            this.form.calculatedWeight = 10.4

            return amount.toFixed(2)
        },
        percentComplete: function () {
            let stepsComplete = this.getStepsNoDuplicateValues().reduce((sum, step) => {
                    if (typeof (sum) === 'object') sum = 0
                    return sum + (this.modelWidgets[step.id].isComplete(this.getStepValue(step.value_id)) ? 1 : 0)
                }
            )
            let stepsNeedingCompletion = this.getStepsNoDuplicateValues().reduce((sum, step) => {
                    if (typeof (sum) === 'object') sum = 0
                    return sum + (this.modelWidgets[step.id].requiresCompletion(this.getStepValue(step.value_id)) ? 1 : 0)
                }
            )

            console.log('percentComplete: ' + stepsComplete + '/' + stepsNeedingCompletion)
            return Math.min(100, Math.round((stepsComplete / stepsNeedingCompletion) * 100))
        },
    }
})
