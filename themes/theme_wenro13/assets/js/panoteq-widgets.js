class PanoteqWidget {
    step = null

    constructor(stepModel) {
        this.step = stepModel
    }

    getDefaultValue() {
        var defaultValue = this.step.values.filter((e) => e.is_default)
        if (defaultValue.length > 0) {
            return defaultValue[0].value
        }

        return null
    }

    requiresCompletion() {
        return true
    }

    isComplete(value) {
        return value !== undefined && value !== null
    }

    validateStep(value) {
        return []
    }

    description(value) {
        if (!this.isComplete(value)) {
            return null
        }

        var defaultValue = this.step.values.filter((e) => e.value === value)
        if (defaultValue.length > 0) {
            return this.step.label + ': ' + defaultValue[0].label
        }

        return null
    }

    priceImpact(value) {
        var sum = 0

        var priceImpacts = this.step.values.filter((e) => {
            return e.value == value
        })
        if (priceImpacts.length > 0 && !isNaN(priceImpacts[0].price_impact)) {
            sum += priceImpacts[0].price_impact
        }

        return sum
    }
}

class ColorWidget extends PanoteqWidget {
    getDefaultValue() {
        var defaultValue = this.step.values.filter((e) => e.is_default)
        if (defaultValue.length > 0) {
            return (defaultValue[0].swatch !== undefined) ? defaultValue[0].swatch : defaultValue[0].value
        }

        return undefined
    }

    description(value) {
        if (!this.isComplete(value)) {
            return null
        }

        var defaultValue = this.step.values.filter((e) => e.swatch === value || e.value === value)
        if (defaultValue.length > 0) {
            return this.step.label + ': ' + defaultValue[0].label
        }

        return null
    }

    validateStep(value) {
        return []
    }
}

class DimensionsWidget extends PanoteqWidget {
    getDefaultValue() {
        return {
            width: 3,
            height: 4
        }
    }

    priceImpact(value) {
        if (this.step.price_impact !== undefined) {
            return value.width * value.height * this.step.price_impact
        }

        return 0
    }

    isComplete(value) {
        return value !== undefined && value.width !== null && value.height !== null;
    }

    description(value) {
        return this.isComplete(value) ? this.step.label + ': ' + value.width + this.step.suffix + ' x ' + value.height + this.step.suffix : null
    }
}

class TextWidget extends PanoteqWidget {
    getDefaultValue() {
        return [{'value': 1}]
    }

    priceImpact(value) {
        var sum = 0
        if (!isNaN(this.step.price_impact)) {
            value.forEach(() => {
                sum += this.step.price_impact
            })
        }

        return sum
    }

    isComplete(value) {
        return value !== undefined && value.length > 0
    }

    addValue(values, index) {
        Vue.set(values, index, values[index].concat([{'value': 0}]))
    }

    removeValue(values, stepIdValue, part) {
        if (values[stepIdValue].length <= 0) {
            console.log('Can\'t remove part.')
            return
        }
        values[stepIdValue].splice(values[stepIdValue].indexOf(part), 1)
    }

    description(value) {
        if (!this.isComplete(value)) {
            return null
        }

        let result = []
        value.forEach((val) => {
            result.push(val.value + this.step.suffix)
        })

        return this.step.label + ': ' + result.join(', ')
    }
}

class RadioWidget extends PanoteqWidget {
}

class SelectboxWidget extends PanoteqWidget {
    validateStep(value) {
        return ['error']
    }
}

class EmptyWidget extends PanoteqWidget {
    getDefaultValue() {
        return null
    }

    requiresCompletion() {
        return false
    }

    isComplete(value) {
        return true
    }

    description(value) {
        return null
    }
}
