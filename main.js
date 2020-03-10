$(function(){
	var tableTime = ['07:15 - 08:00', '08:05 - 08:50', '08:55 - 09:40', '09:40 - 10:00', '10:00 - 10:45', '10:50 - 11:35', '11:35 - 12:45', '12:45 - 13:30', '13:35 - 14:20', '14:20 - 14:40', '14:40 - 15:25', '15:30 - 16:20', '16:20 - 17:05'];  
	var weekdays = ['Montag', 'Dienstag', 'Mitwoch', 'Donnerstag', 'Freitag'];
	var date = new Date();

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
            $.each(result, function(key, field){
				$("#classDropdown").append('<option value="' + field.klasse_id + '">' + field.klasse_longname + '</option>');
			}); 
		})
		.fail(function(){
			alert("Connection to server faild!!!");
		});
	});
	
	$("#classDropdown").change(function(){
		
		$("#tableOutput thead").append("<tr><th></th></tr>");
		$.each(weekdays, function(index, value){
			$("#tableOutput thead tr").append("<th>" + value + "</th>");
		})

		$.each(tableTime, function(index, value){
			$("#tableOutput tbody").append("<tr><th>" + value + "<th><td></td><td></td><td></td><td></td></tr>");
		});
		
		$.getJSON("http://sandbox.gibm.ch/tafel.php?klasse_id=" + $("#classDropdown :selected").val() + "&woche=" + date.getWeek() + "-" + date.getFullYear() , function(result){
			$.each(result, function(index, value){
				//$("table tr:nth-child(")
			})
		})
		.fail(function(){
			alert("Connection to server faild!!!");
		});
	});



	Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	}
});