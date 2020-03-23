var editor = null;

$(document).ready(function () {
    $('textarea[name=contents]').after('<div id="ajaxbox" style="width: 100%; height: 100px; overflow-y: scroll; margin-bottom: 5px;"></div>');
    // $('.control-label.col-lg-3').hide();
    // $('.col-lg-9').css('width', '100%');
    $('#main').css("padding-bottom", '0');
    // $('.control-label.col-lg-3').addClass('pull-right');
    $('.control-label.col-lg-3').removeClass('required').css('padding', '0');
    //$('.control-label.col-lg-3').html('<iframe id="#preview-iframe" style="width: 100%; height: calc(100vh - 290px - 105px ); border: 1px solid #aaa"></iframe>');
    $('.control-label.col-lg-3').html('<iframe id="#preview-iframe" style="width: 100%; height: calc(100vh - 290px - 105px );"></iframe>');

    $('textarea[name=contents]').after('<div id="jsoneditor" style="width: 100%; height: calc(100vh - 290px - 105px );"></div>');
    $('textarea[name=contents]').hide();


    function getUrlQueryParams() {
        let uri = window.location.href.split('?');
        if (uri.length == 2)
        {
            let vars = uri[1].split('&');
            let getVars = {};
            let tmp = '';
            vars.forEach(function(v){
                tmp = v.split('=');
                if(tmp.length == 2)
                    getVars[tmp[0]] = tmp[1];
            });

            return getVars;
        }

        return null;
    }

    const container = document.getElementById("jsoneditor")
    const options = {
        //JSONEditor.setSchema(schema [,schemaRefs])

        mode: 'tree',
        // sortObjectKeys: true,
        mainMenuBar: true,
        colorPicker: true,
        modes: ['tree', 'view', 'form', 'code', 'text', 'preview'],
        // onCreateMenu: function (items, node) {
        //     const path = node.path
        //
        //     // log the current items and node for inspection
        //     console.log('items:', items, 'node:', node)
        //
        //     // We are going to add a menu item which returns the current node path
        //     // as a jq path selector ( https://stedolan.github.io/jq/ ). First we
        //     // will create a function, and then We will connect this function to
        //     // the menu item click property in a moment.
        //
        //     function pathTojq() {
        //         let pathString = ''
        //
        //         path.forEach(function (segment, index) { // path is an array, loop through it
        //             if (typeof segment == 'number') {  // format the selector for array indexs ...
        //                 pathString += '[' + segment + ']'
        //             } else {  // ... or object keys
        //                 pathString += '."' + segment + '"'
        //             }
        //         })
        //
        //         alert(pathString) // show it to the user.
        //     }
        //
        //     // Create a new menu item. For our example, we only want to do this
        //     // if there is a path (in the case of appendnodes (for new objects)
        //     // path is null until a node is created)
        //     if (path) {
        //         // Each item in the items array represents a menu item,
        //         // and requires the following details :
        //
        //         items.push({
        //             text: 'jq Path', // the text for the menu item
        //             title: 'Show the jq path for this node', // the HTML title attribute
        //             className: 'example-class', // the css class name(s) for the menu item
        //             click: pathTojq // the function to call when the menu item is clicked
        //         })
        //     }
        //
        //
        //     // Now we will iterate through the menu items, which includes the items
        //     // created by jsoneditor, and the new item we added above. In this
        //     // example we will just alter the className property for the items, but
        //     // you can alter any property (e.g. the click callback, text property etc.)
        //     // for any item, or even delete the whole menu item.
        //     items.forEach(function (item, index, items) {
        //         if ("submenu" in item) {
        //             // if the item has a submenu property, it is a submenu heading
        //             // and contains another array of menu items. Let's colour
        //             // that yellow...
        //             items[index].className += ' submenu-highlight'
        //         } else {
        //             // if it's not a submenu heading, let's make it colorful
        //             items[index].className += ' rainbow'
        //         }
        //     })
        //
        //     var node2 = this;
        //     // var childs = node2.parent.childs;
        //     // if (node2 === childs[childs.length - 1]) {
        //         items.push({
        //             text: 'Custom insert',
        //             className: 'jsoneditor-type-object',
        //             title: 'Panoteq step',
        //             click: function click() {
        //                 container._onInsertBefore('', {});
        //             }
        //         });
        //     // }
        //
        //     // finally we need to return the items array. If we don't, the menu
        //     // will be empty.
        //     return items
        // },
        // autocomplete: {
        //     getOptions: function (text, path, input, editor) {
        //         return {startFrom: 0, options: ['apple', 'cranberry', 'raspberry', 'pie']};
        //     }
        // }
        templates: [
            {
                text: 'Color selector',
                title: 'Insert a color selector',
                field: 'ColorWidgetTemplate',
                value: {
                    "entity": "step",
                    "id": 1,
                    "order": 1,
                    "label": "Couleurs RAL",
                    "widget_type": "color",
                    "multiple_values": false,
                    "options_groups": [],
                    "values": [{
                        "value": "#f03030",
                        "label": "RAL color",
                        "tooltip": "Tooltip",
                        "price_impact": 1,
                        "price_impact_method": "factor",
                        "display_condition": [],
                        "is_default": true
                    }, {
                        "value": "#C2B078",
                        "label": "RAL color 2",
                        "tooltip": "Tooltip",
                        "price_impact": 1,
                        "price_impact_method": "factor",
                        "display_condition": [],
                        "is_default": false,
                        "swatch": ""
                    }],
                    "tooltip": "Choisir une couleur",
                    "required": true,
                    "visible_in_summary": false,
                    "influence_on_price": 10,
                    "prefix": "",
                    "suffix": "",
                    "conditional_display": []
                }
            }
        ],
        onEvent: function(node, event) {
            //updateImagePreviews();

            // If focusing on element value
            if(event.type == 'focusin' && node.field == 'swatch') {
                console.log(node);

                // Load images list
                $.ajax({
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    url: 'ajax-tab.php',
                    data: {
                        ajax: true,
                        controller: 'AdminPanoteq',
                        action: 'Custom',
                        token: getUrlQueryParams().token,
                        currentNodeValue: node.value
                    },
                    success: function (data) {
                        // Fill image box
                        $('#ajaxbox').html(data);

                        // Bind image box on click events
                        $('#ajaxbox img').click((clickEvent) => {
                            console.log('clicked');

                            // Set value to node element
                            var n2 = editor.node.findNodeByPath(node.path);
                            n2.value = $(clickEvent.target).attr('src');
                            n2.updateDom();
                            n2._debouncedOnChangeValue();

                            updateImagePreviews();

                            // Empty box after click
                            $('#ajaxbox').html('');
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('AJAX error');
                    }
                });
            }
        },
        onClassName: function({path, field, value}) {
            // console.log('onClassName');
            updateImagePreviews();

            return 'blouf';
        },
        onNodeName({ path, type, size }) {
            // Step name
            if(path.length > 1 && path[path.length - 2] == 'steps') {
                var n2 = editor.node.findNodeByPath(path);

                var childEntityType = n2.childs.filter((e) => { return e.field == 'entity' });

                if(childEntityType.length > 0 && childEntityType[0].value == 'step') {
                    var childEntityWidgetType = n2.childs.filter((e) => { return e.field == 'widget_type' })[0].value;
                    var childEntityLabel = n2.childs.filter((e) => { return e.field == 'label' })[0].value;
                    var childEntityId = n2.childs.filter((e) => { return e.field == 'id' })[0].value;
                    var childEntityIsSubstep = n2.childs.filter((e) => { return e.field == 'is_substep' }).length > 0 && n2.childs.filter((e) => { return e.field == 'is_substep' })[0].value == true;

                    return (childEntityIsSubstep ? 'Substep' : 'Step') + '#' + childEntityId + ' "' + childEntityLabel + '" (type: ' + childEntityWidgetType + ')';
                }
            }

            // Values field list of values labels
            if(path.length > 1 && path[path.length - 1] == 'values') {
                var n2 = editor.node.findNodeByPath(path);
                var allLabels = [];
                var counter = 0;
                var MAX_LABELS = 5;

                n2.childs.forEach((value) => {
                    var childEntityLabel = value.childs.filter((e) => { return e.field == 'label' })[0].value;

                    if(++counter <= MAX_LABELS) {
                        allLabels.push(childEntityLabel);
                    }
                });

                return allLabels.join(', ') + (counter >= MAX_LABELS ? ', ...' : '');
            }

            // Value field label
            if(path.length > 1 && path[path.length - 2] == 'values') {
                var n2 = editor.node.findNodeByPath(path);
                var childEntityLabel = n2.childs.filter((e) => { return e.field == 'label' })[0].value;
                return childEntityLabel;
            }
        },
        onValidationError: function (errors) {
            console.log('onValidationError');
            errors.forEach((error) => {
                switch (error.type) {
                    case 'validation': // schema validation error
                        console.log(error);
                        break;
                    case 'customValidation': // custom validation error
                        console.log(error);
                        break;
                    default:
                    case 'error':  // json parse error
                        console.log(error);
                        break;
                }
            });
        }
    };

    function updateImagePreviews() {
        // Update image previews
        $('.blouf .jsoneditor-tree:last-child').each(function(index, value) {
            var firstChild = $(this).children().first();

            $(this).children().not(':first').remove().end().append(firstChild);

            if(firstChild.text().endsWith('jpg')) {
                $(this).append('<div style="content: \' \'; display: inline-block; width: 1em; height: 1em; top: 3px; position: relative; border: 1px solid black; background-size: contain; background-image: url(' + $(firstChild).text() + ')"></div>');
            }
        });
    }

    editor = new JSONEditor(container, options);

    $('#panoteq_configuration_form_submit_btn').click((e) => {
        $('textarea[name=contents]').val(editor.getText());
    });

    const schemaValue = {
        "type": "object",
        "properties": {
            "value": { "type": "string" },
            "label": { "type": "string" },
            "tooltip": { "type": "string" },
            "price_impact": { "type": "number" },
            "price_impact_method": { "enum": ["factor"] },
            "is_default": { "type": "boolean" }
        },
        "required": ["value", "label", "is_default"],
        "additionalProperties": false
    }

    const schemaStep = {
        "type": "object",
        "properties": {
            "is_substep": {
                "type": "boolean"
            },
            "widget_type": {
                "enum": ["dimensions", "color", "radio", "text", "selectbox", "color-sample", "group-start", "group-end"]
            },
            "values": {
                "type": "array",
                "items": {
                    "$ref": "value"
                }
            }
        },
        "required": ['is_substep', 'widget_type', 'values'],
        "additionalProperties": false
    }

    const schemaRelationstree = {
        "type": "object",
        "properties": {
            "step": {
                "type": "integer"
            },
            "substeps": {
                "type": "array",
                "items": {
                    "$ref": "relationstree"
                }
            }
        },
        "required": ['step', 'substeps'],
        "additionalProperties": false
    }

    editor.setSchema({
        "type": "object",
        "properties": {
            'steps': {
                "type": "array",
                "items": {
                    "$ref": "step"
                }
            },
            'relationstree': {
                "type": "array",
                "items": {
                    "$ref": "relationstree"
                }
            }
        },
        "required": ['steps', 'relationstree']
    }, {'step': schemaStep, 'relationstree': schemaRelationstree, 'value': schemaValue});

    if ($('textarea[name=contents]').val().length > 0) {
        editor.setText($('textarea[name=contents]').val());
    } else {
        editor.set({});
    }

    updateImagePreviews();

    // editor.expandAll();

    editor.focus();
});
