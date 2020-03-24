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

        WIDGET_TYPE_GROUPSTART: 'group-start',
        WIDGET_TYPE_GROUPEND: 'group-end',
        WIDGET_TYPE_COLORSAMPLE: 'color-sample',
        WIDGET_TYPE_COLOR: 'color',
        WIDGET_TYPE_DIMENSIONS: 'dimensions',
        WIDGET_TYPE_TEXT: 'text',
        WIDGET_TYPE_SELECTBOX: 'selectbox',
        WIDGET_TYPE_RADIO: 'radio'
    },
    methods: {
        showRalPopup: function (color) {
            UIkit.modal('#modal-full').show()
        },
        unsetLocalStorage: function () {
            localStorage.removeItem('panoteq-config')
        },
        updateDoorModel: function () {
            var productId = 2 // 1800

            // Transform data: percages
            var percages = []
            this.getParamPercages().forEach((val) => {
                percages.push(parseInt(val.value))
            })

            // Transform data: texture
            var isRAL = this.getParamColor().startsWith('#')
            var textureName = this.getParamColor()
            if (!isRAL) {
                if (this.getParamTextureHorizontal()) {
                    textureName = this.getHorizontalTextureFromSteps()
                }
            }

            if (this.panoteq3dViewer == null) {
                this.panoteq3dViewer = new Panoteq3dViewer()
                this.panoteq3dViewer.init($("#threevisualization"), productId,
                    textureName, false, percages,
                    this.getParamEmplacementCharnieres() == 'droite',
                    false, [this.getParamDimensions().width,
                        this.getParamDimensions().height], false)
            } else {
                this.panoteq3dViewer.loadDoorModel(productId, textureName,
                    isRAL, false, percages,
                    this.getParamEmplacementCharnieres() == 'droite',
                    [this.getParamDimensions().width, this.getParamDimensions().height],
                    false)
            }
        },
        addValue: function (values, index) {
            Vue.set(values, index, this.form.values[index].concat([{'value': 0}]))
        },
        removeValue: function (stepId, part) {
            if (this.form.values[stepId].length <= 0) {
                console.log('Can\'t remove part.')
                return
            }
            this.form.values[stepId].splice(this.form.values[stepId].indexOf(part), 1)
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
            var step = this.model.steps[stepId]
            var value = this.form.values[step.id]

            this.errors[step.id] = false
            console.log('validateStep')
            console.log(this.errors)

            if (!this.stepNeedsCompletion(step.id)) {
                return true
            }

            if (value === undefined) {
                this.errors[step.id] = true
                return false
            }

            switch (step.widget_type) {
                case 'color':
                    if (value == '#CDA434') {
                        console.log('Wrong color')
                        this.errors[step.id] = true// 'Wrong color'
                        return false
                    }
                default:
                    return true
            }

            // return this.errors[stepId] === undefined
            return false
        },
        isStepComplete: function (stepId) {
            if (!this.stepNeedsCompletion(stepId)) {
                return false
            }

            var step = this.model.steps[stepId]
            var value = this.form.values[step.id]

            if (value === undefined) {
                return false
            }

            switch (step.widget_type) {
                case this.WIDGET_TYPE_TEXT:
                    return value.length > 0
                    break
                case this.WIDGET_TYPE_DIMENSIONS:
                    console.log(value)
                    return value.width !== null && value.height !== null
                default:
                    break
            }

            return true
        },
        stepNeedsCompletion: function (stepId) {
            var step = this.model.steps[stepId]

            switch (step.widget_type) {
                case this.WIDGET_TYPE_TEXT:
                case this.WIDGET_TYPE_RADIO:
                case this.WIDGET_TYPE_SELECTBOX:
                case this.WIDGET_TYPE_COLOR:
                case this.WIDGET_TYPE_COLORSAMPLE:
                case this.WIDGET_TYPE_DIMENSIONS:
                    return true
                    break
                default:
                    break
            }

            return false
        },
        validateAll: function () {
            this.model.steps.forEach((step, index) => {
                this.validateStep(step.id)
            })
        },
        getParamTextureHorizontal: function () {
            var result = false

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Sens du fil' && this.form.values[step.id] == 'horizontal') {
                    result = true
                }
            })

            return result
        },
        getParamDimensions: function () {
            var result = null

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Dimensions porte') {
                    result = this.form.values[step.id]
                }
            })

            return result
        },
        getParamColor: function () {
            var result = null

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Uni') {
                    result = this.form.values[step.id]
                }
            })

            return result
        },
        getParamEmplacementCharnieres: function () {
            var result = null

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Emplacements charnières') {
                    result = this.form.values[step.id]
                }
            })

            return result
        },
        getParamPercages: function () {
            var result = null

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Perçages') {
                    result = this.form.values[step.id]
                }
            })

            return result
        },
        getHorizontalTextureFromSteps: function () {
            var result = null

            this.model.steps.forEach((step, index) => {
                if (step.label == 'Uni') {
                    var textureToFind = step.values.filter((e) => {
                        return e.swatch === this.form.values[step.id]
                    })

                    if (textureToFind.length > 0 && textureToFind[0].swatch_horiz !== undefined) {
                        result = textureToFind[0].swatch_horiz
                    }
                }
            })

            return result
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
                var widgetClassExists = false
                var capitalizedName = step.widget_type[0].toUpperCase() + step.widget_type.substr(1);
                var className = capitalizedName + 'Widget';
                try {
                    eval('new ' + className)
                    widgetClassExists = true
                } catch(e) {
                    console.log('Class doesn\'t exist: ' + className)

                }

                if(widgetClassExists) {
                    eval('this.modelWidgets[step.id] = new ' + className + '(step, this.form.values[step.id])');
                }
                else {
                    this.modelWidgets[step.id] = new EmptyWidget(step, this.form.values[step.id])
                }

                this.form.values[step.id] = this.modelWidgets[step.id].getDefaultValue()
            })
        },
        loadFormValuesFromLocalStorage: function () {
            if (localStorage['panoteq-config'] !== undefined) {
                // console.log('Loading from local storage')
                this.form = JSON.parse(localStorage['panoteq-config'])
            }
        },
        saveFormValuesToLocalStorage: function () {
            localStorage['panoteq-config'] = JSON.stringify(this.form)
        }
    },
    created: function () {
        this.readModelAndPrepareDefaultFormValues()
        this.loadFormValuesFromLocalStorage()
    },
    mounted: function () {
        this.updateDoorModel()
        this.initInterceptOnAddToCartEvent()
    },
    computed: {
        summary: function () {
            this.saveFormValuesToLocalStorage()
            return JSON.stringify(JSON.stringify(this.form))
        },
        totalAmount: function () {
            let sum = 0
            let modelValuesAlreadyChecked = []
            let stepsComplete = 0
            let stepsNeedingCompletion = 0

            this.model.steps.forEach((step, index) => {
                if (modelValuesAlreadyChecked.indexOf(step.id) !== -1) {
                    // Is duplicate (accessing same value). Do not count in.
                    return
                }

                modelValuesAlreadyChecked.push(step.id)

                if (this.isStepComplete(index)) {
                    switch (step.widget_type) {
                        case this.WIDGET_TYPE_DIMENSIONS:
                            sum += this.form.values[step.id].width * this.form.values[step.id].height * step.price_impact
                            break
                        case this.WIDGET_TYPE_TEXT:
                            if (!isNaN(step.price_impact)) {
                                this.form.values[step.id].forEach(() => {
                                    sum += step.price_impact
                                })
                            }
                            break
                        case this.WIDGET_TYPE_SELECTBOX:
                            var priceImpacts = step.values.filter((e) => {
                                return e.value == this.form.values[step.id]
                            })
                            if (priceImpacts.length > 0 && !isNaN(priceImpacts[0].price_impact)) {
                                sum += priceImpacts[0].price_impact
                            }
                            break
                        default:
                            if (!isNaN(step.price_impact)) {
                                sum += step.price_impact
                            }
                            break
                    }
                }
            })

            return Math.round(sum, 2)
        },
        percentComplete: function () {
            var modelValuesAlreadyChecked = []
            var stepsComplete = 0
            var stepsNeedingCompletion = 0

            this.model.steps.forEach((step, index) => {
                if (modelValuesAlreadyChecked.indexOf(step.id) !== -1) {
                    // Is duplicate (accessing same value). Do not count in.
                    return
                }

                modelValuesAlreadyChecked.push(step.id)

                stepsComplete += this.isStepComplete(index) ? 1 : 0
                stepsNeedingCompletion += this.stepNeedsCompletion(index) ? 1 : 0
            })

            var result = Math.round((stepsComplete / stepsNeedingCompletion) * 100)
            return result > 100 ? 100 : result
        },
    }
})
