class PanoteqWidget {
    step = null

    constructor(stepModel) {
        this.step = stepModel
    }

    getDefaultValue() {
        throw 'Not implemented exception'
    }

    requiresCompletion() {
        throw 'Not implemented exception'
    }

    isComplete(value) {
        throw 'Not implemented exception'
    }

    isValid() {
        throw 'Not implemented exception'
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
}

class ColorWidget extends PanoteqWidget {
    getDefaultValue() {
        return "/img/panoteqconf/textures/Ambassador.jpg"
    }

    requiresCompletion() {
        return true
    }

    isComplete(value) {
        return value !== undefined && value !== null;
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

    requiresCompletion() {
        return true
    }

    isComplete(value) {
        return value !== undefined && value.width !== null && value.height !== null;
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

    requiresCompletion() {
        return true
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
}

class RadioWidget extends PanoteqWidget {
    getDefaultValue() {
        return null
    }

    requiresCompletion() {
        return true
    }

    isComplete(value) {
        return value !== undefined && value !== null
    }
}

class SelectboxWidget extends PanoteqWidget {
    getDefaultValue() {
        return null
    }

    requiresCompletion() {
        return true
    }

    isComplete(value) {
        return value !== undefined && value !== null
    }
}
