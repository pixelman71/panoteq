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
        recompute: 0,
        debugValidationResult: null,
        alreadyValidatedOnce: false
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
            let percages = [];
            // this.get3dBindParamValue('percages').map((val) => {
            //     return parseInt(val.value)
            // })

            percages.push(parseInt(this.get3dBindParamValue('percage_1')[0].value))
            percages.push(parseInt(this.get3dBindParamValue('percage_2')[0].value))
            percages.push(parseInt(this.get3dBindParamValue('percage_3')[0].value))
            percages.push(parseInt(this.get3dBindParamValue('percage_4')[0].value))
            percages.push(parseInt(this.get3dBindParamValue('percage_5')[0].value))

            console.log('percages')
            console.log(percages)

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
                        this.get3dBindParamValue('dimensions').width / 100,
                        this.get3dBindParamValue('dimensions').height / 100
                    ], horizontalTexture)
            } else {
                this.panoteq3dViewer.loadDoorModel(productId, textureName, isRAL, false, percages,
                    emplacementCharnieresDroite, [
                        this.get3dBindParamValue('dimensions').width / 100,
                        this.get3dBindParamValue('dimensions').height / 100
                    ], horizontalTexture)
            }
        },
        conditionalDisplay(stepId) {
            var matchesConditions = true

            var foundConditions = this.model.conditional_display.filter((e) => {
                return e.step == stepId
            })

            //console.log('conditional_display(' + stepId)

            if (foundConditions.length > 0) {
                let cond = foundConditions[0].condition;
                let matchesThisCondition;

                switch (cond.operator) {
                    case 'OR':
                        matchesThisCondition = false;
                        break;
                    default:
                    case 'AND':
                        matchesThisCondition = true;
                        break;
                }

                (cond.values).forEach((condition) => {
                    //console.log(condition)
                    var conditionStep = this.model.steps.filter((e) => e.id == condition.step)[0]

                    // console.log('matchesConditions: ' + stepId + " - found: ")
                    // console.log(condition)
                    // console.log('len: ' + this.form.values[conditionStep.value_id].length)
                    // console.log('step ' + condition.step + ' must be ' + condition.value + ' and is ' + this.form.values[conditionStep.value_id] + ' (index: ' + conditionStep.value_id + ')')

                    var result = (this.form.values[conditionStep.value_id] !== undefined && this.form.values[conditionStep.value_id].length > 0)
                        && (this.form.values[conditionStep.value_id].length > 0 && this.form.values[conditionStep.value_id] == condition.value)

                    switch (cond.operator) {
                        case 'OR':
                            matchesThisCondition |= result
                            break;
                        default:
                        case 'AND':
                            matchesThisCondition &= result
                            break;
                    }
                })

                matchesConditions &= matchesThisCondition
            }

            return matchesConditions
        },
        validateAll: function () {
            this.alreadyValidatedOnce = true

            var hasErrors = false

            this.model.steps.forEach(step => {
                // Clear previous errors
                this.errors[step.id] = []

                if (!this.conditionalDisplay(step.id)) {
                    console.log('!this.conditionalDisplay(' + step.id)
                    return
                }

                // Validate and add errors
                this.errors[step.id] = this.modelWidgets[step.id].getValidationErrors(this.form.values[step.value_id])

                hasErrors |= !this.modelWidgets[step.id].isValid(this.form.values[step.value_id])
            })

            this.openAccordionOnFirstError()

            this.debugValidationResult = !hasErrors

            this.forceRecomputeValues()

            return this.debugValidationResult
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

                if (!this.conditionalDisplay(step.id)) {
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
        forceRecomputeValues() {
            this.recompute++
        },
        openAccordionOnFirstError() {
            var lastAccordionIndex = -1
            var firstStep = null
            this.model.steps.forEach((step) => {
                if (firstStep == null && step.widget_type == 'group-start') {
                    lastAccordionIndex++;
                }

                if (firstStep == null && this.errors[step.id].length > 0) {
                    firstStep = step.id
                }
            })

            if (firstStep !== null && lastAccordionIndex !== $('#panoteq-configurator-accordion li.uk-open').index()) {
                UIkit.accordion('#panoteq-configurator-accordion').toggle(lastAccordionIndex, true);
            }
        },
        totalAmount: function () {
            const dummy = this.recompute

            amount = Math.round(this.getStepsNoDuplicateValues().reduce((sum, step) => {
                if (typeof (sum) === 'object') sum = 0
                if (this.modelWidgets[step.id].isComplete(this.form.values[step.value_id])) {
                    return sum + this.modelWidgets[step.id].priceImpact(this.form.values[step.value_id])
                }

                return sum
            }), 2)

            this.form.calculatedAmount = amount
            this.form.calculatedWeight = 10.4

            return amount.toFixed(2)
        }
    },
    computed: {
        summary: function () {
            this.saveFormValuesToLocalStorage()

            let result = ''

            // let result = JSON.stringify(JSON.stringify(this.form))
            this.getStepsNoDuplicateValues().forEach((step) => {
                let description = this.modelWidgets[step.id].description(this.form.values[step.value_id])
                if (description !== null) {
                    result += description + '<br>'
                }
            })

            return result
        },
        totalAmountFormatted: function () {
            return this.totalAmount().replace('.', ',')
        },
        percentComplete: function () {
            if (this.alreadyValidatedOnce) {
                this.validateAll()
            }

            let stepsComplete = this.getStepsNoDuplicateValues().reduce((sum, step) => {
                    if (typeof (sum) === 'object') sum = 0
                    return sum + (this.modelWidgets[step.id].isComplete(this.form.values[step.value_id]) ? 1 : 0)
                }
            )
            let stepsNeedingCompletion = this.getStepsNoDuplicateValues().reduce((sum, step) => {
                    if (typeof (sum) === 'object') sum = 0
                    return sum + (this.modelWidgets[step.id].requiresCompletion(this.form.values[step.value_id]) ? 1 : 0)
                }
            )

            console.log('percentComplete: ' + stepsComplete + '/' + stepsNeedingCompletion)
            return Math.min(100, Math.round((stepsComplete / stepsNeedingCompletion) * 100))
        },
    }
})
