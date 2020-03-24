class WidgetUtils {
    step = null
    value = null

    constructor(stepModel, stepValue) {
        this.step = stepModel
        this.value = stepValue
    }

    getDefaultValue() {
        throw 'Not implemented exception'
    }

    requiresCompletion() {
        throw 'Not implemented exception'
    }

    isValid() {
        throw 'Not implemented exception'
    }

    priceImpact() {
        throw 'Not implemented exception'
    }
}

class EmptyWidget extends WidgetUtils {
    getDefaultValue() {
        return null
    }
}

class ColorWidget extends WidgetUtils {
    getDefaultValue() {
        return "/img/panoteqconf/textures/Ambassador.jpg"
    }
}

class DimensionsWidget extends WidgetUtils {
    getDefaultValue() {
        return {
            width: 3,
            height: 4
        }
    }
}

class TextWidget extends WidgetUtils {
    getDefaultValue() {
        return [{'value': 0}]
    }
}

class RadioWidget extends WidgetUtils {
    getDefaultValue() {
        return null
    }
}

class SelectboxWidget extends WidgetUtils {
    getDefaultValue() {
        return null
    }
}
