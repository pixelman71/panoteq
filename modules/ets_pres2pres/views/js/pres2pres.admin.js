/**
 * 2007-2018 ETS-Soft
 *
 * NOTICE OF LICENSE
 *
 * This file is not open source! Each license that you purchased is only available for 1 wesite only.
 * If you want to use this file on more websites (or projects), you need to purchase additional licenses.
 * You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please contact us for extra customization service at an affordable price
 *
 *  @author ETS-Soft <etssoft.jsc@gmail.com>
 *  @copyright  2007-2019 ETS-Soft
 *  @license    Valid for 1 website (or project) for each purchase of license
 *  International Registered Trademark & Property of ETS-Soft
 */
var ajaxPercentImport = false;
var ajaxPercentExport = false;
var timer;
var percent_export = 0;
var percent_export2 = 0;
var total_export = 0;
var max_export = 5;
var percent_import = 0;
var percent_import2 = 0;
var total_import = 0;
var max_import = 5;
var passed_time = false;
var max_time = 5;
var time_counter = '';
var import_ok = false;
var percentVal = 0;

function actionStep6(action) {
    if (!$('.' + action).hasClass('disabled')) {
        $('body').addClass('ets_pres2pres_loading');
        $('.' + action).addClass('active');
        $.ajax({
            url: '',
            data: action + '=1',
            type: 'post',
            dataType: 'json',
            success: function (json) {
                $('.' + action).removeClass('active');
                $('.' + action).attr('disabled', 'disabled');
                $('.' + action).addClass('disabled');
                $('body').removeClass('ets_pres2pres_loading');
                $('.' + action).find('i').attr('class', 'fa fa-check');
                /*$('body').append('<div class="lc_ets_pres_succ">' + json.success + '</div>');
                setTimeout(function () {
                    $('.lc_ets_pres_succ').remove();
                }, 2000);*/
            },
            error: function (xhr, status, error) {
            }
        });
    }
}

$(document).ready(function () {
    $('#module_form').ajaxForm({
        beforeSend: function (xhr, o) {
            percentVal = '0%';
            $('.percentage_export').html('0%');
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = (percentComplete < 100 ? percentComplete : 99) + '%';
            $('.percentage_export').html(percentVal);
            $('#module_form .popup_uploading .upload-wapper-percent').css('width', percentVal);
        },
        complete: function (xhr) {
            var json = JSON.parse(xhr.responseText);
            if (json.error) {
                $('#module_form .form-wrapper').append('<div class="ets_datamaster_error">' + json.errors + '</div>');
                $('#module_form .popup_uploading').removeClass('show');
                $('#module_form .popup_exporting').removeClass('show');
                $('#module_form .popup_importing').removeClass('show');
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
                $('#module_form .popup_exporting .export-wapper-percent').css('width', '0%');
            } else {
                var step = json.step;
                $('input[name="step"]').val(step);
                $('.tab_step_data .data_number_step').removeClass('active');
                $('.tab_step_data .data_number_step').removeClass('current_step');
                for (var i = 1; i <= step; i++) {
                    $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('active');
                    if (i != step)
                        $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('current_step');
                }
                $('.ybc-form-group').removeClass('active');
                $('.ybc-form-group.ybc-blog-tab-step' + step).addClass('active');
                $('.ybc-form-group.ybc-blog-tab-step' + step).html((json.form_step));
                if (ajaxPercentExport)
                    clearInterval(ajaxPercentExport);
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', '100%');
                $('.percentage_export').html('100%');
                setTimeout(function () {
                    $('#module_form .popup_uploading').removeClass('show');
                    $('button[name="submitBack"]').attr('disabled', 'disabled');
                }, 1000);

            }
        }
    });
    $(document).on('click', '.continue_importing', function () {
        $('.import-wapper-block-3 .ets_datamaster_error').remove();
        processImportData(true);
    });
    $(document).on('change', 'input[type="file"]', function () {
        var filename = $(this).val().split('\\').pop();
        if ($(this).parents('.data_upload_button_wrap').eq(0).next('.form_upfile_val').length) {
            $(this).parents('.data_upload_button_wrap').eq(0).next('.form_upfile_val').addClass('show').find('.file_name').html(filename);
        } else {
            $(this).parents('.data_upload_button_wrap').eq(0).after('<div class="form_upfile_val show"><div class="file_name">' + filename + '</div></div></div>');
        }
    });
    displayFormImport();
    displayFormUpload();
    $(document).on('click', '.change_data_import', function () {
        $.ajax({
            url: '',
            data: 'ajax_change_data_import=1',
            type: 'post',
            dataType: 'json',
            success: function (json) {
                $('.ybc-form-group.ybc-blog-tab-step1').html(json.upload_form);
                displayFormUpload();
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
            },
            error: function (xhr, status, error) {
            }
        });
    });
    $(document).on('change', '#source_type', function () {
        displayFormUpload();
    });
    $(document).on('click', 'input[name="have_made_backup"]', function () {
        if ($('input[name="have_made_backup"]:checked').length)
            $('button[name="submitImport"]').removeAttr('disabled');
        else
            $('button[name="submitImport"]').attr('disabled', 'disabled');
    });
    $(document).on('click', '.ybc-blog-tab-step2 input[type="checkbox"]', function () {
        displayFormImport();
    });
    $(document).on('click', '.ets_pres2pres_clearcache', function (e) {
        e.preventDefault();
        actionStep6('ets_pres2pres_clearcache');
    });
    $(document).on('click', '.ets_pres2pres_friendly_url', function (e) {
        e.preventDefault();
        actionStep6('ets_pres2pres_friendly_url');
    });
    $(document).on('click', '.ets_pres2pres_search', function (e) {
        e.preventDefault();
        actionStep6('ets_pres2pres_search');
    });

    $(document).on('click', 'button[name="submitImport"]', function (e) {
        e.preventDefault();
        if ($('#source_type').length) {
            if ($('#source_type').val() == 'upload_file' && !$('#module_form input[name="file_import"]').val()) {
                alert('Please select a file');
                return false;
            }
            if ($('#source_type').val() == 'link' && !$('#module_form input[name="link_file"]').val()) {
                alert('Please enter a link url');
                return false;
            }
            if ($('#source_type').val() == 'url_site' && (!$('#module_form input[name="link_site"]').val() || !$('#module_form input[name="secure_access_tocken"]').val())) {
                alert('Please enter a site url and Secure access tocken');
                return false;
            }
        }
        if (parseInt($('input[name="step"]').val()) >= 6)
            return;
        if (parseInt($('input[name="step"]').val()) == 1 && $('.change_data_import').length == 0 && $('#source_type').val() != 'url_site') {
            $('#module_form .popup_uploading').addClass('show');
            $('#module_form').submit();
            return false;
            //$('#module_form .popup_uploading .upload-wapper-percent').css('transition','all '+($('#source_type').val()=='url_site' ? '1200s' :'180s')+'  ease 0s');
//            $('#module_form .popup_uploading .upload-wapper-percent').css('width','90%');            
        }
        if (parseInt($('input[name="step"]').val()) > 1)
            $('input[name="link_site_connector"]').val('');
        if (parseInt($('input[name="step"]').val()) == 4) {
            if ($('#have_made_backup:checked').length == 0) {
                alert('You have not made necessary backup of the website.');
                return false;
            }
            $('.tab_step_data .data_number_step[data-step="5"]').addClass('active');
            $('.tab_step_data .data_number_step[data-step="4"]').addClass('current_step');
            $('.ybc-form-group').removeClass('active');
            $('.ybc-form-group.ybc-blog-tab-step5').addClass('active');
            if ($('#basicUsageClock').length > 0) {
                timer = new Timer();
                timer.start();
                timer.addEventListener('secondsUpdated', function (e) {
                    $('#basicUsageClock').html(timer.getTimeValues().toString());
                });
            }
            $('button[name="submitImport"]').attr('disabled', 'disabled');
            $('button[name="submitBack"]').attr('disabled', 'disabled');
            setTimeout(function () {
                var percent = Math.floor(Math.random() * 10) + 3;
                $('.list-data-to-importing li:first .process_import .label').html(percent + '%');
                $('.list-data-to-importing li:first .process_import').attr('data-import', percent);
                var rotate = percent * 3.6;
                if (rotate > 180) {
                    $('.list-data-to-importing li:first').find('.pie .left-side').css({
                        "transform": "rotate(180deg)"
                    });
                    $('.list-data-to-importing li:first').find('.pie .right-side').css({
                        "transform": "rotate(" + rotate + "deg)"
                    });
                } else {
                    $('.list-data-to-importing li:first').find('.pie .left-side').css({
                        "transform": "rotate(" + rotate + "deg)"
                    });
                }
            }, 1000);
            ajaxPercentageImport();
            ajaxPercentImport = setInterval(function () {
                ajaxPercentageImport()
            }, 3000);
        }
        $('.ets_datamaster_error').remove();
        if ($('#source_type').val() == 'url_site') {
            setCookieEts('zip_file_name', 'oc2m_data_' + gencodeEts(7));
            $('#module_form .popup_uploading').addClass('show');
            processExportConnector();
            ajaxPercentExport = setInterval(function () {
                ajaxPercentageExport()
            }, 3000);
        } else
            processImportData(true);
    });
    $(document).on('click', 'button[name="submitExport"]', function (e) {
        e.preventDefault();
        if (parseInt($('input[name="step"]').val()) >= 4)
            return;
        if (parseInt($('input[name="step"]').val()) == 3) {
            $('#module_form .popup_exporting').addClass('show');
            $('#module_form .popup_uploading .export-wapper-percent').css('transition', 'all 5s ease 0s');
            $('#module_form .popup_exporting .export-wapper-percent').css('width', '1%');
            ajaxPercentExport = setInterval(function () {
                ajaxPercentageExport()
            }, 3000);
        }
        $('.ets_datamaster_error').remove();
        processExportData();
    });
    $(document).on('change', '#file_import', function () {
        $('#data_upload_button_input').val($('#file_import').val());
        $('button[name="submitImport"]').removeAttr('disabled');
    });
    $(document).on('change', '#link_file', function () {
        if ($(this).val() != '') {
            $('button[name="submitImport"]').removeAttr('disabled');
        }
    });
    $(document).on('change', '#link_site,#secure_access_tocken', function () {
        if ($('#link_site').val() != '' && $('#secure_access_tocken').val() != '') {
            $('button[name="submitImport"]').removeAttr('disabled');
        }
    });
    $(document).on('click', 'button[name="submitBack"]', function (e) {
        e.preventDefault();
        var step = parseInt($('input[name="step"]').val());
        if (step <= 1)
            return;
        if (step == 4 && $('button[name="submitImport"]').length)
            $('button[name="submitImport"]').removeAttr('disabled');
        step--;
        $('input[name="step"]').val(step);
        if (step == 1) {
            $('button[name="submitBack"]').attr('disabled', 'disabled');
        }
        $('.tab_step_data .data_number_step').removeClass('active');
        for (var i = 1; i <= step; i++) {
            $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('active');
        }
        $('.ybc-form-group').removeClass('active');
        $('.ybc-form-group.ybc-blog-tab-step' + step).addClass('active');
    });
    $(document).on('click', '.dtm_history_tab_header .dtm_history_tab', function () {
        if (!$(this).hasClass('active')) {
            $('.dtm_history_tab_header .dtm_history_tab').removeClass('active');
            $(this).addClass('active');
            $('.tab_content').removeClass('active');
            $('.tab_content.' + $(this).attr('data-tab')).addClass('active');
        }
    });
    $(document).on('click', '.ets_pres2pres_resume', function () {
        $('button[name=submitImport]').click();
    });
    $(document).on('click', '.load_more_import, .load_more_export', function (ev) {
        ev.preventDefault();
        $(this).addClass('loading');
        var btn = $(this);
        if (!btn.hasClass('active')) {
            $.ajax({
                type : 'post',
                url : btn.attr('href'),
                dataType : 'json',
                success : function (json) {
                    btn.removeClass('active');
                    if (json) {
                        if (btn.is('.import')) {
                            $('table.import tbody').append(json.html);
                        } else if (btn.is('.export')) {
                            $('table.export tbody').append(json.html);
                        }
                        if (json.link_more) {
                            btn.attr('href', json.link_more)
                        } else {
                            btn.remove();
                        }
                        $(this).removeClass('loading');
                    }
                },
                error : function () {
                    btn.removeClass('active');
                }
            });
        }
    });
});

function ajaxPercentageImport() {
    $.ajax({
        url: '',
        data: 'ajax_percentage_import=1',
        type: 'post',
        dataType: 'json',
        success: function (json) {
            if (!json)
                return false;
            if (json.percent > 0 && !import_ok) {
                if (json.table_importing)
                    $('#module_form .popup_importing .percentage_import').html('Importing data to table <strong>"' + json.table_importing + '"</strong> (' + json.speed + ' records/s)');

                if ($('.list-data-to-importing li.' + json.import_group + '.process:not(.active) .process_import').length) {
                    $('.list-data-to-importing li.' + json.import_group + '.process:not(.active) .process_import').each(function () {
                        if (parseFloat(json.percent) > parseFloat($(this).find('.label').html()) || isNaN(parseFloat($(this).find('.label').html()))) {
                            $(this).find('.label').html(json.percent + '%');
                            $(this).find('.ets_pres2pres_items_second').html(json.speed);
                            $(this).attr('data-import', json.floor_percent);
                            var rotate = parseInt(json.floor_percent) * 3.6;
                            if (rotate > 180) {
                                $(this).find('.pie .left-side').css({
                                    "transform": "rotate(180deg)"
                                });
                                $(this).find('.pie .right-side').css({
                                    "transform": "rotate(" + rotate + "deg)"
                                });
                            } else {
                                $(this).find('.pie .left-side').css({
                                    "transform": "rotate(" + rotate + "deg)"
                                });
                            }
                            if (parseInt(json.floor_percent) > 50) {
                                $(this).find('.pie').css({
                                    "clip": "rect(auto, auto, auto, auto)"
                                });
                                $(this).find('.pie .right-side').css({
                                    "opacity": "1"
                                });
                            } else {
                                $(this).find('.pie .right-side').css({
                                    "opacity": "0"
                                });
                            }
                        }
                    });
                }
                if (json.list_import_active != '' && json.percent != 1) {
                    var exports_active = json.list_import_active.split(',');
                    if (exports_active.length > 0) {
                        for (var i = 0; i < exports_active.length; i++) {
                            $('.list-data-to-importing li.' + exports_active[i]).addClass('active');
                            $('.list-data-to-importing li.' + exports_active[i]).next().delay(300).queue(function () {
                                if (!$(this).hasClass('process')) {
                                    $(this).find('.label').html('1%');
                                    $(this).addClass('process').dequeue();
                                }
                            });
                        }
                        $('.list-data-to-importing li.active .process_import .label').html('100%');
                    }
                }
            }
            if (json.percent > 0 && json.percent != 100) {
                percent_import2 = json.totalItemImported;
            }
        },
        error: function (xhr, status, error) {
        }
    });
}

function ajaxPercentageExport() {
    if (getCookieEts('zip_file_name')) {
        var zip_file_name = getCookieEts('zip_file_name');
    } else {

        var zip_file_name = 'oc2m_data_' + gencodeEts(7);
        setCookieEts('zip_file_name', zip_file_name);
    }
    $.ajax({
        url: ETS_DT_MODULE_URL_AJAX,
        data: 'presconnector=1&zip_file_name=' + zip_file_name + '&ajaxPercentageExport=1&link_site=' + $('#link_site').val(),
        type: 'post',
        dataType: 'json',
        success: function (json) {
            if (!json)
                return false;
            if (json.percent > 0 && json.percent < 100) {
                $('#module_form .popup_uploading .upload-wapper-percent').css('transition', 'all 3s ease 0s');
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', json.percent + '%');
                $('#module_form .popup_uploading .percentage_export').html(json.percent + '%');
                if (json.table)
                    $('#module_form .popup_uploading .percentage_export_table').html('Exporting data from table <strong>"' + json.table + '"</strong>');
            }
            if (json.percent && json.percent != 100) {
                percent_export2 = json.totalItemExported;
            }

        },
        error: function (xhr, status, error) {
        }
    });
}

function displayFormImport() {
    if ($('#data_import_products').length) {
        if ($('#data_import_products:checked').length > 0) {
            if ($('#data_import_categories:checked').length > 0)
                $('.form-group.category_default').hide();
            else
                $('.form-group.category_default').show();
            if ($('#data_import_suppliers:checked').length > 0)
                $('.form-group.supplier_default').hide();
            else
                $('.form-group.supplier_default').show();
            if ($('#data_import_manufactures:checked').length > 0)
                $('.form-group.manufacturer_default').hide();
            else
                $('.form-group.manufacturer_default').show();
        } else {
            $('.form-group.category_default').hide();
            $('.form-group.supplier_default').hide();
            $('.form-group.manufacturer_default').hide();
        }
    }
    if ($('#data_import_CMS').length) {
        if ($('#data_import_CMS:checked').length) {
            if ($('#data_import_CMS_categories:checked').length > 0) {
                $('.form-group.cms_category_default').hide();
            } else
                $('.form-group.cms_category_default').show();
        } else
            $('.form-group.cms_category_default').hide();

    }
    if ($('#file_import').length > 0 && $('#link_file').length > 0)
        $('button[name="submitImport"]').attr('disabled', 'disabled');
}

function processExportConnector() {
    if (getCookieEts('zip_file_name')) {
        var zip_file_name = getCookieEts('zip_file_name');
    } else {

        var zip_file_name = 'oc2m_data_' + gencodeEts(7);
        setCookieEts('zip_file_name', zip_file_name);
    }
    $.ajax({
        url: ETS_DT_MODULE_URL_AJAX,
        data: 'presconnector=1&pres2prestocken=' + $('#secure_access_tocken').val() + '&zip_file_name=' + zip_file_name + '&link_site=' + $('#link_site').val(),
        type: 'post',
        dataType: 'json',
        success: function (json) {
            if (!json) {
                if (checkExportData())
                    processExportConnector();
            } else {
                if (json.link_site_connector) {
                    $('#link_site_connector').val(json.link_site_connector);
                    if (ajaxPercentExport)
                        clearInterval(ajaxPercentExport);
                    if (time_counter)
                        clearTimeout(time_counter);
                    processImportData(true);
                    setCookieEts('zip_file_name', '');
                } else {
                    if (checkExportData())
                        processExportConnector();
                }

            }
        },
        error: function (xhr, status, error) {
            if (checkExportData())
                processExportConnector();
        }
    });
}

function checkExportData() {
    if (percent_export == percent_export2) {
        total_export++;
        if (time_counter == '') {
            time_counter = setTimeout(
                function () {
                    passed_time = true;
                }, max_time * 60 * 1000);
        }
    } else {
        percent_export = percent_export2;
        total_export = 0;
        clearTimeout(time_counter);
        time_counter = setTimeout(
            function () {
                passed_time = true;
            }, max_time * 60 * 1000);
    }
    if (total_export > max_export && passed_time) {
        if (ajaxPercentExport)
            clearInterval(ajaxPercentExport);
        $('#module_form .popup_uploading').removeClass('show');
        $('#module_form .popup_exporting').removeClass('show');
        $('#module_form .popup_importing').removeClass('show');
        $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
        $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
        $('#module_form .popup_exporting .export-wapper-percent').css('width', '0%');
        $('.ybc-form-group').removeClass('active');
        $('.ybc-form-group.connector_error').addClass('active');
        return false;
    } else
        return true;

}

function checkImportData() {
    if (percent_import == percent_import2) {
        total_import++;
    } else {
        percent_import = percent_import2;
        total_import = 0;
        clearTimeout(time_counter);
        time_counter = setTimeout(
            function () {
                passed_time = true;
            }, max_time * 60 * 1000);
    }
    if (total_import > max_import && passed_time) {
        if (ajaxPercentImport)
            clearInterval(ajaxPercentImport);
        timer.stop();
        $('#module_form .popup_uploading').removeClass('show');
        $('#module_form .popup_exporting').removeClass('show');
        $('#module_form .popup_importing').removeClass('show');
        $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
        $('#module_form .popup_importing .import-wapper-percent').css('width', '0%');
        $('#module_form .popup_exporting .export-wapper-percent').css('width', '0%');
        $('.ybc-form-group').removeClass('active');
        $('.ybc-form-group.import_error').addClass('active');
        $('button[name=submitImport]').prop('disabled', false);
        return false;
    } else
        return true;
}

function processImportData(start) {
    var formData = new FormData($('button[name="submitImport"]').parents('form').get(0));
    formData.append('submitImport', '1');
    formData.append('forceIDs', '1');
    if ($('.defaultForm input[type="file"]').length > 0) {
        $('.defaultForm input[type="file"]').each(function () {
            if (document.getElementById($(this).attr('id')).files.length == 0) {
                formData.delete($(this).attr('id'));
            }
        });
    }
    if ($('.ybc-form-group.ybc-blog-tab-step6').hasClass('active'))
        return false;
    $('.source-data').hide();
    if (start) {
        clearTimeout(time_counter);
        time_counter = setTimeout(
            function () {
                passed_time = true;
            }, max_time * 60 * 1000);
    }
    $.ajax({
        url: ETS_DT_MODULE_URL_AJAX,
        data: formData,
        type: 'post',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (json) {
            if (!json || json.wait) {
                if (checkImportData()) {
                    setTimeout(function () {
                        processImportData(false);
                    }, 6000);

                }
            } else {
                clearTimeout(time_counter);
                if (json.error_xml) {
                    if (ajaxPercentImport)
                        clearInterval(ajaxPercentImport);
                    var html_errror = '<p>Invalid XML file: <a href="' + json.link_xml + '" target="_blank">' + json.file_xml + '</a></p><p>Follow steps below to fix the problems:</p><p>1. Open the XML file on a web browser such as Chrome, Safari or Firefox to see XML errors.</p><p>2. Open the XML located at: <span class="file_url">' + json.file_url + '</span> using a ftp client software such as FileZilla: https://filezilla-project.org/ or using file editor on your hosting management area to edit/remove invalid UTF-8 characters (or XML tags).</p><p>3. Open again the XML file on your web browser and make sure the XML file is valid (no errors represented) then save all the changes </p><p>4. Click on the <span class="continue_importing">"Continue importing"</span> button below to continue.</p>';
                    $('.import-wapper-block-3').append('<div class="ets_datamaster_error"><div class="bootstrap"><div class="module_error alert alert-danger"><button class="close" data-dismiss="alert" type="button">×</button><li>' + html_errror + '</li></div></div><div class="alert alert-warning import-alert alert-warning-xml-error">*Note: The errors are often caused by invalid utf-8 characters or invalid XML tags existing in content of your website in certain items such as product description, product title, category description, CMS content, etc. You need to manually fix the XML files to continue the import process</div></div>');
                } else {
                    if (json.error) {
                        if (ajaxPercentImport)
                            clearInterval(ajaxPercentImport);
                        if ($('input[name="link_site_connector"]').length && $('input[name="link_site_connector"]').val() != '' && $('#source_type').val() == 'url_site') {
                            clearTimeout(time_counter);
                            $('.ybc-blog-tab-step1').before('<p class="source-data" style="text-align: center; margin-bottom: 30px;">Looks good! Source data is successfully exported. <br/>To continue <a href="' + $('input[name="link_site_connector"]').val() + '" target ="_blank">Donwload Source Data</a> then upload source data using the upload form below:</p>');
                            $('#source_type option').removeAttr('selected');
                            $('#source_type option').each(function () {
                                if ($(this).val() == 'upload_file')
                                    $(this).attr('selected', 'selected');
                            });
                            $('#source_type').change();
                            $('#source_type').closest('.form-group').hide();
                            $('.form-group.source.upload label').html('Upload source data <span class="required">*</span>');
                        } else {
                            $('#module_form .form-wrapper').append('<div class="ets_datamaster_error">' + json.errors + '</div>');
                        }
                        $('#module_form .popup_uploading').removeClass('show');
                        $('#module_form .popup_exporting').removeClass('show');
                        $('#module_form .popup_importing').removeClass('show');
                        $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
                        $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
                        $('#module_form .popup_exporting .export-wapper-percent').css('width', '0%');
                    } else {

                        var step = json.step;
                        $('input[name="step"]').val(step);
                        $('.tab_step_data .data_number_step').removeClass('active');
                        $('.tab_step_data .data_number_step').removeClass('current_step');
                        for (var i = 1; i <= step; i++) {
                            $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('active');
                            if (i != step)
                                $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('current_step');
                        }

                        if (step == 6) {
                            if (ajaxPercentImport)
                                clearInterval(ajaxPercentImport);
                            timer.stop();
                            $('#module_form .panel-footer').hide();
                            $('.list-data-to-importing li').addClass('active');
                            $('.list-data-to-importing li.finalizing .process_import .label').html('100%');
                            setTimeout(function () {
                                $('.ybc-form-group').removeClass('active');
                                $('.ybc-form-group.ybc-blog-tab-step' + step).addClass('active');
                                $('.ybc-form-group.ybc-blog-tab-step' + step).html((json.form_step));
                                if ($('.ets_pres2pres_clearcache').length > 0) {
                                    actionStep6('ets_pres2pres_clearcache');
                                }
                                if ($('.ets_pres2pres_friendly_url').length > 0) {
                                    actionStep6('ets_pres2pres_friendly_url');
                                }
                                if ($('.ets_pres2pres_search').length > 0) {
                                    actionStep6('ets_pres2pres_search');
                                }
                            }, 2000);
                            import_ok = true;
                        } else {
                            $('.ybc-form-group').removeClass('active');
                            $('.ybc-form-group.ybc-blog-tab-step' + step).addClass('active');
                            $('.ybc-form-group.ybc-blog-tab-step' + step).html((json.form_step));
                        }
                        displayFormImport();
                        if (step == 1) {
                            if (ajaxPercentExport)
                                clearInterval(ajaxPercentExport);
                            $('#module_form .popup_uploading .upload-wapper-percent').css('transition', 'all 0s ease 0s');
                            $('#module_form .popup_uploading .upload-wapper-percent').css('width', '100%');
                            $('#module_form .popup_uploading .percentage_export').html('100%');
                            setTimeout(function () {
                                $('#module_form .popup_uploading').removeClass('show');
                                $('button[name="submitBack"]').attr('disabled', 'disabled');
                            }, 1000);
                        } else {
                            $('button[name="submitBack"]').removeAttr('disabled');
                            if (step == 4) {
                                $('.ybc-form-group.ybc-blog-tab-step5').html((json.form_step_5));
                            }
                        }
                        if (step >= 4) {
                            $('button[name="submitImport"]').attr('disabled', 'disabled');
                        } else {
                            $('button[name="submitImport"]').removeAttr('disabled');
                        }

                    }
                }
            }

        },
        error: function (xhr, status, error) {
            if ($('input[name="link_site_connector"]').length && $('input[name="link_site_connector"]').val() != '' && $('#source_type').val() == 'url_site') {
                clearTimeout(time_counter);
                if (ajaxPercentImport)
                    clearInterval(ajaxPercentImport);
                $('.ybc-blog-tab-step1').before('<p class="source-data" style="text-align: center; margin-bottom: 30px;">Looks good! Source data is successfully exported. <br/>To continue <a href="' + $('input[name="link_site_connector"]').val() + '" target ="_blank">Donwload Source Data</a> then upload source data using the upload form below:</p>');
                $('#source_type option').removeAttr('selected');
                $('#source_type option').each(function () {
                    if ($(this).val() == 'upload_file')
                        $(this).attr('selected', 'selected');
                });
                $('#source_type').change();
                $('#source_type').closest('.form-group').hide();
                $('.link_download_plugin').hide();
                $('.form-group.source.upload label').html('Upload source data <span class="required">*</span>');
                $('#module_form .popup_uploading').removeClass('show');
                $('#module_form .popup_exporting').removeClass('show');
                $('#module_form .popup_importing').removeClass('show');
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
                $('#module_form .popup_uploading .upload-wapper-percent').css('width', '0%');
                $('#module_form .popup_exporting .export-wapper-percent').css('width', '0%');
            } else {
                if (checkImportData())
                    processImportData(false);
            }
        }
    });
}

function processExportData() {
    var formData = new FormData($('button[name="submitExport"]').parents('form').get(0));
    formData.append('submitExport', '1');
    $.ajax({
        url: $('button[name="submitExport"]').parents('form').eq(0).attr('action'),
        data: formData,
        type: 'post',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (json) {
            if (ajaxPercentExport)
                clearInterval(ajaxPercentExport);
            if (json.error) {
                $('#module_form .form-wrapper').append('<div class="ets_datamaster_error">' + json.errors + '</div>');
                $('#module_form .popup_exporting').removeClass('show');
            } else {
                var step = json.step;
                $('button[name="submitBack"]').removeAttr('disabled');
                $('input[name="step"]').val(step);
                if (step == 4) {

                    $('#module_form .popup_exporting .export-wapper-percent').css('transition', 'all 1s ease 0s');
                    $('#module_form .popup_exporting .export-wapper-percent').css('width', '100%');
                    $('#module_form .panel-footer').hide();
                    setTimeout(function () {
                        $('#module_form .popup_exporting').removeClass('show');
                        $('.tab_step_data .data_number_step').removeClass('active');
                        for (var i = 1; i <= step; i++) {
                            $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('active');
                        }
                        $('.ybc-form-group.ybc-blog-tab-step' + step).html(json.form_step);
                        $('.ybc-form-group').removeClass('active');
                        $('.ybc-form-group.ybc-blog-tab-step' + step).addClass('active');
                    }, 1000);

                } else {
                    $('.tab_step_data .data_number_step').removeClass('active');
                    for (var i = 1; i <= step; i++) {
                        $('.tab_step_data .data_number_step[data-step="' + i + '"]').addClass('active');
                    }
                    $('.ybc-form-group.ybc-blog-tab-step' + step).html(json.form_step);
                    $('.ybc-form-group').removeClass('active');
                    $('.ybc-form-group.ybc-blog-tab-step' + step).addClass('active');
                }

            }
        },
        error: function (xhr, status, error) {
            if (ajaxPercentExport)
                clearInterval(ajaxPercentExport);
            alert('Internal Server Error');
            $('#module_form .popup_exporting').removeClass('show');
        }
    });
}

function displayFormUpload() {
    if ($('#source_type').length) {
        if ($('#source_type').val() == 'upload_file') {
            $('.form-group.source.upload').show();
            $('.form-group.source.link').hide();
            $('.form-group.source.url_site').hide();
        } else if ($('#source_type').val() == 'link') {
            $('.form-group.source.upload').hide();
            $('.form-group.source.link').show();
            $('.form-group.source.url_site').hide();
        } else {
            $('.form-group.source.upload').hide();
            $('.form-group.source.link').hide();
            $('.form-group.source.url_site').show();
        }
    }
}

function gencodeEts(size) {
    var code_value = '';
    var chars = "123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
    for (var i = 1; i <= size; ++i)
        code_value += chars.charAt(Math.floor(Math.random() * chars.length));
    return code_value;
}

function setCookieEts(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookieEts(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}