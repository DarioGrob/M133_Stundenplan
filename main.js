$(function(){
	var tableTime = ['07:15', '08:05', '08:55', '09:40', '10:00', '10:50', '11:35', '12:45', '13:35', '14:20', '14:40', '15:30', '16:20', '17:05'];  
	
    $.getJSON("http://sandbox.gibm.ch/berufe.php", function(result){
		$.each(result, function(key, field){
            if(field.beruf_name != 1){
                $("#jobDropdown").append('<option value="' + field.beruf_id + '">' + field.beruf_name + '</option>');
            }
        });
	})
	.fail(function(){
		alert("Connection to server faild!!!");
	});
	
	$("#jobDropdown").change(function(){
		$("#classDropdown").empty();
		$("#classDropdown").append('<option value="select">Select....</option>');
		$.getJSON("http://sandbox.gibm.ch/klassen.php?beruf_id=" + $("#jobDropdown :selected").val(), function(result){
            console.log(result);
            $.each(result, function(key, field){
				$("#classDropdown").append('<option value="' + field.klasse_id + '">' + field.klasse_longname + '</option>');
			}); 
		});
	});
	
	/*$("#classDropdown").change(function(){
		
		//$("#tableOutput").append("<tbody>");
		
		$.each(tableTime, function(index, value){
			$("#test").append("<tr><th>" + value + "<th></tr>");
		});
		
		//$("#tableOutput").append("</tbody>");
		
		$.getJSON("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val(), function(result){
			console.log(result);
			
		});
	});*/
});