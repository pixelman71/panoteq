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

    getDefaultEmptyValue() {
        return null
    }

    differsFromDefaultValue(value) {
        return value !== this.getDefaultEmptyValue()
    }

    getValidValueFor3d(value) {
        // console.log('getValidValueFor3d')
        // console.log(value)
        // console.log(this.isComplete(value))
        // console.log(this.getDefaultValue())

        return this.isComplete(value) && this.isValid(value) ? value : this.getDefaultValue()
    }

    hasValidValueFor3d(value) {
        return this.getValidValueFor3d(value) !== undefined
    }

    requiresCompletion() {
        return true
    }

    isComplete(value) {
        return value !== undefined && value !== null
    }

    getValidationErrors(value) {
        return []
    }

    isValid(value) {
        return this.getValidationErrors(value).length == 0
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

    getValidationErrors(value) {
        return []
    }
}

class DimensionsWidget extends PanoteqWidget {
    getDefaultValue() {
        return {
            width: 300,
            height: 500
        }
    }

    getDefaultEmptyValue() {
        return {
            width: null,
            height: null
        }
    }

    differsFromDefaultValue(value) {
        return value.width !== this.getDefaultEmptyValue().width || value.height !== this.getDefaultEmptyValue().height
    }

    priceImpact(value) {
        if (this.step.price_impact !== undefined) {
            return value.width * value.height * this.step.price_impact * 0.001 * 0.001
        }

        return 0
    }

    getValidationErrors(value) {
        var errorsHoriz = []
        var errorsVert = []

        console.log('dimensions getValidationErrors')
        console.log(value)
        // console.log('this.step.value_min_horiz')
        // console.log('this.step.value_min_horiz')
        // console.log(this.step.value_min_horiz)
        // if(this.step.value_min_horiz === undefined) {
        //     console.log('bug!')
        // }
        //
        // value.width = parseInt(value.width)
        // value.height = parseInt(value.height)

        if (value.width < this.step.value_min_horiz || value.width > this.step.value_max_horiz) {
            errorsHoriz = ['La largeur doit être comprise entre ' + this.step.value_min_horiz + this.step.suffix
            + ' et ' + this.step.value_max_horiz + this.step.suffix]
        }

        if (value.height < this.step.value_min_vert || value.height > this.step.value_max_vert) {
            errorsVert = ['La hauteur doit être comprise entre ' + this.step.value_min_vert + this.step.suffix
            + ' et ' + this.step.value_max_vert + this.step.suffix]
        }

        return [errorsHoriz, errorsVert]
    }

    isComplete(value) {
        console.log('dimensions isComplete')
        console.log(value)
        return value !== undefined && value.width !== null && value.height !== null;
    }

    description(value) {
        return this.isComplete(value) ? this.step.label + ': ' + value.width + this.step.suffix + ' x ' + value.height + this.step.suffix : null
    }

    isValid(value) {
        console.log('isValid dimensions')
        console.log(value)
        console.log(this.getValidationErrors(value)[0].length == 0 && this.getValidationErrors(value)[1].length == 0)
        console.log(this.getValidationErrors(value))
        return this.getValidationErrors(value)[0].length == 0 && this.getValidationErrors(value)[1].length == 0
    }
}

class TextWidget extends PanoteqWidget {
    getDefaultValue() {
        return [{'value': 1}]
    }

    getDefaultEmptyValue() {
        return [{'value': null}]
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
        return value !== null && value !== undefined && value.length > 0 && value[0].value !== null;
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

class NumberWidget extends TextWidget {

}

class RadioWidget extends PanoteqWidget {
}

class SelectboxWidget extends PanoteqWidget {
    getValidationErrors(value) {
        if (!this.isComplete(value)) {
            return ['Select a value']
        }

        return []
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
