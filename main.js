$(function(){
    //$("#jobDropdown").append('<option selected value="test">Select....</option>');
    $.getJSON("http://sandbox.gibm.ch/berufe.php", function(result){
        $.each(result, function(key, field){
            if(field.beruf_name != 1){
                $("#jobDropdown").append('<option value="' + field.beruf_id + '">' + field.beruf_name + '</option>');
            }
        });
    });
});