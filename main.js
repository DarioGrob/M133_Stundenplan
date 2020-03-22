var tableTime = ['07:15 - 08:00', '08:05 - 08:50', '08:55 - 09:40', '10:00 - 10:45', '10:50 - 11:35', '12:45 - 13:30', '13:35 - 14:20', '14:40 - 15:25', '15:30 - 16:15', '16:20 - 17:05'];  
var weekdays = ['Montag', 'Dienstag', 'Mitwoch', 'Donnerstag', 'Freitag'];
var date = new Date();
const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
var lessons;
var week;

$(function(){
	getDataFromApi("http://sandbox.gibm.ch/berufe.php", "#jobDropdown");
});

Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

Date.prototype.getFriday = function() {
	var day = this.getDay();  
	if( day !== 5 ) {
		this.setHours(24 * (5 - day));
	} 
	return this;
}
	
Date.prototype.getMonday = function() {
	var day = this.getDay();  
	if( day !== 1 ) {
		this.setHours(-24 * (day - 1)); 
	}
	return this;
}

function dateFormatter(date){
			
	const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(date);
	return `${da}.${mo}.${ye}`;
}

function displayTable(){	
	var indexOfTableTimeBisLesson;
	var indexOfTableTimeVonLesson;
	var indexOfWeekdayLesson;
	var lessonsInfo = [];
	
	$("#displayResultArea").prepend('<p class="h2">' + dateFormatter(date.getMonday()) + ' - ' + dateFormatter(date.getFriday()) +'</p>');
	if(lessons.length == 0){
		$("#tableOutput").append('<p class="display-4 text-center">Kein Unterricht hinterlegt</p>');
	}else{
		for(i = 0; i <= tableTime.length; i ++){
			for(j = 0; j <= weekdays.length; j++){
				if(isFirstCellInTable(j, i)){
					$("#tableOutput").append("<tr><td class='bg-light'></td></tr>");
				}else if(isColumnHeader(i)){
					if(isSchoolDay(j)){
						$("#tableOutput tr").append("<td class='bg-light text-secondary font-weight-bold'>" + weekdays[j - 1] + "</td>");
					}else{
						$("#tableOutput tr").append("<td class='bg-light text-secondary font-weight-bold d-none d-lg-table-cell'>" + weekdays[j - 1] + "</td>");
					}
				}else if(isRowHeader(j)){
					$("#tableOutput").append("<tr><td class='bg-light text-secondary font-weight-bold'>" + tableTime[i - 1] + "</td></tr>");
				}else{
					var lesson =  isStartOfLesson(j, i);
					if(lesson){
						indexOfTableTimeVonLesson = tableTime.findIndex(s => s.includes(lesson.tafel_von.substr(0, 5)));
						indexOfTableTimeBisLesson = tableTime.findIndex(s => s.includes(lesson.tafel_bis.substr(0, 5)));
						indexOfWeekdayLesson = lesson.tafel_wochentag;
						
						const lessonInfo = {
							wochentag: indexOfWeekdayLesson,
							vonIndex: indexOfTableTimeVonLesson,
							bisIndex: indexOfTableTimeBisLesson
						};
						
						lessonsInfo.push(lessonInfo);
						
						var rowspan = indexOfTableTimeBisLesson - indexOfTableTimeVonLesson + 1;
						var trRow1 = i + 1;
						$("#tableOutput tr:nth-child(" + trRow1 + ")").append("<td rowspan='" + rowspan + "'><div class='lesson'>" + lesson.tafel_longfach + "</br>" + lesson.tafel_raum + "</br>" + lesson.tafel_lehrer + "</div></td>");
					}else{
						if(isBetweenLessonStartAndEnd(j, i)){
							var trRow2 = i + 1;
							if(isSchoolDay(j)){
								$("#tableOutput tr:nth-child(" + trRow2 + ")").append("<td></td>");
							}else{
								$("#tableOutput tr:nth-child(" + trRow2 + ")").append("<td class='d-none d-lg-table-cell'></td>");
							}
						}
					}
				}
			}
		}
	}
	$("#weekDisplay").html(week);		
	$("#calenderWeekTitleHidden").css('visibility', 'visible');
	$("#calenderWeekSelectionHidden").css('visibility', 'visible');

	function isFirstCellInTable(columnIndex, rowIndex){
		if(columnIndex == 0 && rowIndex == 0){
			return true;
		}else{
			return false;
		}
	}
	
	function isColumnHeader(rowIndex){
		if(rowIndex == 0){
			return true;
		}else{
			return false;
		}
	}
	
	function isSchoolDay(columnIndex){
		if(lessons.find(jsonObject => jsonObject.tafel_wochentag == columnIndex)){
			return true;
		}else{
			return false;
		}
	}
	
	function isRowHeader(columnIndex){
		if(columnIndex == 0){
			return true;
		}else{
			return false;
		}
	}
	
	function isBetweenLessonStartAndEnd(columnIndex, rowIndex){
		if(!lessonsInfo.find(lesson => lesson.wochentag == columnIndex && lesson.vonIndex + 1 <= rowIndex && lesson.bisIndex + 1 >= rowIndex)){
			return true;
		}else{
			return false;
		}
	}
	
	function isStartOfLesson(columnIndex, rowIndex){
		var result; 
		result = lessons.find(lesson => lesson.tafel_wochentag == columnIndex && lesson.tafel_von == tableTime[rowIndex - 1].substr(0, 5) + ":00");
		if(result){
			return result;
		}else{
			return false;
		}
	}
}