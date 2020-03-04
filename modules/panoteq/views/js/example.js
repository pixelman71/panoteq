$(document).ready(function() {
    $('textarea[name=contents]').after('<div id="jsoneditor" style="width: 100%; height: calc(100vh - 380px);"></div>');
    $('textarea[name=contents]').hide();

    const container = document.getElementById("jsoneditor")
    const options = {
        mode: 'code',
        mainMenuBar: false
    };

    const editor = new JSONEditor(container, options)

    $('#panoteq_configuration_form_submit_btn').click((e) => {
        $('textarea[name=contents]').val(editor.getText());
    });

    // set json
    const initialJson = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    }

    if($('textarea[name=contents]').val().length > 0) {
        editor.setText($('textarea[name=contents]').val());
    }
    else {
        editor.set(initialJson);
    }
});
