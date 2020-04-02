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
        alreadyValidatedOnce: false,
        userHasInteractedWith3dVisualization: false
    },
    created: function () {
        this.readModelAndPrepareDefaultFormValues()
        //this.loadFormValuesFromLocalStorage()
    },
    mounted: function () {
        this.updateDoorModel()
        this.initInterceptOnAddToCartEvent()

        this.$watch('form.values', this.watchHandler)
    },
    methods: {
        updateDoorModel: _.debounce(function () {
            // Prepare data
            let productId = this.get3dBindParamValue('model'); // 1800

            let percages = [];
            let nombrePercages = 0
            switch (this.get3dBindParamValue('nombre_percages')) {
                case 'deux':
                    nombrePercages = 2
                    break
                case 'trois':
                    nombrePercages = 3
                    break
                case 'quatre':
                    nombrePercages = 4
                    break
                case 'cinq':
                    nombrePercages = 5
                    break
            }

            if (nombrePercages >= 2) {
                percages.push(parseFloat(this.get3dBindParamValue('percage_1')[0].value) / 100)
                percages.push(parseFloat(this.get3dBindParamValue('percage_2')[0].value) / 100)
            }
            if (nombrePercages >= 3) {
                percages.push(parseFloat(this.get3dBindParamValue('percage_3')[0].value) / 100)
            }
            if (nombrePercages >= 4) {
                percages.push(parseFloat(this.get3dBindParamValue('percage_4')[0].value) / 100)
            }
            if (nombrePercages >= 5) {
                percages.push(parseFloat(this.get3dBindParamValue('percage_5')[0].value) / 100)
            }

            // console.log('percages')
            // console.log(percages)

            let emplacementCharnieresDroite = this.get3dBindParamValue('emplacement_charnieres') == 'droite'
            let isRAL = this.get3dBindParamValue('color').startsWith('#')
            let textureName = this.get3dBindParamValue('color')
            let horizontalTexture = !isRAL && this.get3dBindParamValue('sens_fil') == 'horizontal'

            console.log('3d dimensions: ')
            console.log(this.get3dBindParamValue('dimensions'))

            // Init 3d instance
            if (this.panoteq3dViewer == null) {
                this.panoteq3dViewer = new Panoteq3dViewer()
                this.panoteq3dViewer.init($("#threevisualization"), productId, textureName, false, percages,
                    emplacementCharnieresDroite, false, [
                        this.get3dBindParamValue('dimensions').width / 100,
                        this.get3dBindParamValue('dimensions').height / 100
                    ], horizontalTexture, isRAL)
            } else {
                this.panoteq3dViewer.loadDoorModel(productId, textureName, isRAL, false, percages,
                    emplacementCharnieresDroite, [
                        this.get3dBindParamValue('dimensions').width / 100,
                        this.get3dBindParamValue('dimensions').height / 100
                    ], horizontalTexture)
            }
        }, 500),
        conditionalDisplay(stepId) {
            var andConditions = true;

            (this.model.conditional_display.filter((e) => e.step == stepId)).forEach((condition) => {
                var orConditions = false;

                condition.or_values.forEach((orValue) => {
                    var conditionStep = this.model.steps.filter((e) => e.id == orValue.step)[0]

                    orConditions |= (this.form.values[conditionStep.value_id] !== undefined
                        && this.form.values[conditionStep.value_id] !== null && this.form.values[conditionStep.value_id].length > 0)
                        && (this.form.values[conditionStep.value_id].length > 0 && this.form.values[conditionStep.value_id] == orValue.value)
                })

                andConditions &= orConditions
            })

            return andConditions
        },
        validateAll: function (openAccordionAndScroll) {
            this.alreadyValidatedOnce = true

            var hasErrors = false

            this.model.steps.forEach(step => {
                // Clear previous errors
                this.errors[step.id] = []

                if (!this.conditionalDisplay(step.id)) {
                    //console.log('!this.conditionalDisplay(' + step.id)
                    return
                }

                if (!this.modelWidgets[step.id].differsFromDefaultValue(this.form.values[step.value_id])) {
                    console.log('!this.differsFromDefaultValue(' + step.id)
                    return
                } else {
                    console.log('=> this.differsFromDefaultValue(' + step.id)
                }

                // Validate and add errors
                this.errors[step.id] = this.modelWidgets[step.id].getValidationErrors(this.form.values[step.value_id])

                hasErrors |= !this.modelWidgets[step.id].isValid(this.form.values[step.value_id])
            })

            this.openAccordionOnFirstError(openAccordionAndScroll)

            this.debugValidationResult = !hasErrors

            return this.debugValidationResult
        },
        get3dBindParamValue: function (bindParamName) {
            // console.log('get3dBindParamValue(' + bindParamName)
            let result = null
            this.model.steps.forEach((step) => {
                if (step.bind_3d_param == bindParamName
                    && this.modelWidgets[step.id].hasValidValueFor3d(this.form.values[step.value_id])) {
                    result = this.modelWidgets[step.id].getValidValueFor3d(this.form.values[step.value_id])
                }
            })

            // console.log('3dBindParam[' + bindParamName + '] = ' + result)
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
            var $this = this

            $('#threevisualization').mouseover((e) => {
                $('#threevisualization > div').hide()
            })
            $('#threevisualization').mouseout((e) => {
                if (!$this.userHasInteractedWith3dVisualization) {
                    $('#threevisualization > div').show()
                }
            })
            $('#threevisualization').mousedown((e) => {
                $this.userHasInteractedWith3dVisualization = true
            })

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

                if (this.modelWidgets[step.id].requiresCompletion() && this.modelWidgets[step.id].getDefaultEmptyValue() !== undefined) {
                    this.form.values[step.value_id] = this.modelWidgets[step.id].getDefaultEmptyValue()
                    this.errors[step.value_id] = [];
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
                    //console.log('!requiresCompletion: ' + step.label)
                    return
                }

                if (!this.conditionalDisplay(step.id)) {
                    //console.log('!conditionalDisplay: ' + step.label)
                    return
                }

                if (modelValuesAlreadyChecked.indexOf(step.value_id) !== -1) {
                    //console.log('duplicate: ' + step.label)
                    // Is duplicate (accessing same value). Do not count in.
                    return
                }

                modelValuesAlreadyChecked.push(step.value_id)
                steps.push(step)
            })

            console.log('getStepsNoDuplicateValues')
            console.log(steps)

            return steps
        },
        forceRecomputeValues() {
            console.log('forceRecomputeValues')
            this.recompute++
            this.watchHandler();
        },
        watchHandler(newVal, oldVal) {
            console.log('watch')
            this.recompute++
            this.validateAll(false)
            this.saveFormValuesToLocalStorage()
            this.updateDoorModel()
        },
        openAccordionOnFirstError(openAccordionAndScroll) {
            var lastAccordionIndex = -1
            var firstStep = null
            this.model.steps.forEach((step) => {
                if (firstStep == null && step.widget_type == 'group-start') {
                    lastAccordionIndex++;
                }

                //if (firstStep == null && this.errors[step.id].length > 0) {
                if (firstStep == null &&
                    this.conditionalDisplay(step.id) &&
                    (!this.modelWidgets[step.id].isComplete(this.form.values[step.value_id]) ||
                        !this.modelWidgets[step.id].isValid(this.form.values[step.value_id]))) {
                    firstStep = step.id
                }
            })

            if (openAccordionAndScroll && firstStep !== null) {
                if(lastAccordionIndex !== $('#panoteq-configurator-accordion li.uk-open').index())
                {
                    UIkit.accordion('#panoteq-configurator-accordion').toggle(lastAccordionIndex, true);
                    // window.setTimeout(() => this.scrollToAnchor('step' + firstStep), 1000)
                }
                else {
                    // this.scrollToAnchor('step' + firstStep);
                }
            }
        },
        totalAmount: function () {
            let sum = 0;

            Math.round(this.getStepsNoDuplicateValues().forEach((step) => {
                if (this.modelWidgets[step.id].isComplete(this.form.values[step.value_id])) {
                    console.log(this.modelWidgets[step.id].priceImpact(this.form.values[step.value_id]))

                    sum += this.modelWidgets[step.id].priceImpact(this.form.values[step.value_id])
                }
            }), 2)

            this.form.calculatedAmount = sum
            this.form.calculatedWeight = 10.4

            return sum.toFixed(2)
        },
        scrollToAnchor: function (anchorId) {
            $('html,body').animate({scrollTop: $("a[name='" + anchorId + "']").offset().top}, 'slow');
        }
    },
    computed: {
        summary: function () {
            const dummy = this.recompute
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
            const dummy = this.recompute

            return this.totalAmount().replace('.', ',')
        },
        percentComplete: function () {
            const dummy = this.recompute

            let stepsComplete = 0;
            this.getStepsNoDuplicateValues().forEach((step) => {
                    stepsComplete += (this.modelWidgets[step.id].isComplete(this.form.values[step.value_id]) ? 1 : 0)
                }
            )
            let stepsNeedingCompletion = 0;
            this.getStepsNoDuplicateValues().forEach((step) => {
                    //console.log('stepsNeedingCompletion: ' + step.id + ' ' + step.label + ' -> ' + this.modelWidgets[step.id].requiresCompletion(this.form.values[step.value_id]))
                    stepsNeedingCompletion += (this.modelWidgets[step.id].requiresCompletion(this.form.values[step.value_id]) ? 1 : 0)
                }
            )

            console.log('percentComplete: ' + stepsComplete + '/' + stepsNeedingCompletion)
            //return stepsComplete + '/' + stepsNeedingCompletion;
            return Math.min(100, Math.round((stepsComplete / stepsNeedingCompletion) * 100))
        },
    }
})
1
