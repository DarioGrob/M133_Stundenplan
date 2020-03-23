var tableTime = ['07:15 - 08:00', '08:05 - 08:50', '08:55 - 09:40', '10:00 - 10:45', '10:50 - 11:35', '12:45 - 13:30', '13:35 - 14:20', '14:40 - 15:25', '15:30 - 16:15', '16:20 - 17:05'];  
var weekdays = ['Montag', 'Dienstag', 'Mitwoch', 'Donnerstag', 'Freitag'];
var date = new Date();
const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
var lessons;
var week;

//wird ausgeführt sobald Seite feritg geladen ist
$(function(){
	//Daten aus dem localStorage lesen
	var localstorageJobId = localstorageGetJobId(); 
	var localstorageClassId = localstorageGetClassId();

	//Daten für das job Dropdown auslesen und befüllen
	getDataFromApi("http://sandbox.gibm.ch/berufe.php", "#jobDropdown", localstorageJobId);

	//Falls ein Job im localStorage hinterlegt ist, die Klassen für den Beruf auslesen und anzeigen
	if(localstorageJobId != null){
		getDataFromApi("http://sandbox.gibm.ch/klassen.php?beruf_id=" + localstorageJobId, "#classDropdown", localstorageClassId);
	}

	//Falls ein Job und Klasse im localStorage hinterlegt ist, Stundenplandaten auslesen und anzeigen
	if(localstorageClassId != null && localstorageJobId != null){
		week = date.getWeek() + "-" + date.getFullYear();
		getDataFromApi("http://sandbox.gibm.ch/tafel.php?klasse_id=" + localstorageClassId + "&woche=" + week, "lessons", null);
	}
});
//funktion zum Date Objekt hinzugefügt
//gibt die Kalenderwoche zurück
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
//funktion zum Date Objekt hinzugefügt
//gibt den Freitag der Woche zurück 
Date.prototype.getFriday = function() {
	var day = this.getDay();  
	if( day !== 5 ) {
		this.setHours(24 * (5 - day));
	} 
	return this;
}
//funktion zum Date Objekt hinzugefügt
//gibt den Montag der Woche zurück
Date.prototype.getMonday = function() {
	var day = this.getDay();  
	if( day !== 1 ) {
		this.setHours(-24 * (day - 1)); 
	}
	return this;
}
//gibt das Datum formatiert zurück -> format: dd.mm.yyyy
function dateFormatter(date){
	const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(date);
	return `${da}.${mo}.${ye}`;
}

//erstellt die Stundenplantabelle
function displayTable(){	
	var indexOfTableTimeBisLesson;
	var indexOfTableTimeVonLesson;
	var indexOfWeekdayLesson;
	var lessonsInfo = [];
	
	//Von bis Datum anzeigen des Stundenplans
	$("#displayResultArea").prepend('<p class="h2">' + dateFormatter(date.getMonday()) + ' - ' + dateFormatter(date.getFriday()) +'</p>');
	if(lessons.length == 0){
		//Falls kein Unterricht hinterleg ist, dies dem User anzeigen
		$("#tableOutput").append('<p class="display-4 text-center">Kein Unterricht hinterlegt</p>');
	}else{
		for(i = 0; i <= tableTime.length; i ++){
			for(j = 0; j <= weekdays.length; j++){
				if(isFirstCellInTable(j, i)){
					$("#tableOutput").append("<tr><td class='bg-light'></td></tr>");
				}else if(isColumnHeader(i)){
					//überprüfen ob an dem tag schule ist, um zu schauen ob header ausgeblendet werden kann bei kleinem bildschirm 
					if(isSchoolDay(j)){
						$("#tableOutput tr").append("<td class='bg-light text-secondary font-weight-bold'>" + weekdays[j - 1] + "</td>");
					}else{
						$("#tableOutput tr").append("<td class='bg-light text-secondary font-weight-bold d-none d-lg-table-cell'>" + weekdays[j - 1] + "</td>");
					}
				}else if(isRowHeader(j)){
					$("#tableOutput").append("<tr><td class='bg-light text-secondary font-weight-bold'>" + tableTime[i - 1] + "</td></tr>");
				}else{
					//überpüfen ob in der Zelle eine Lektion beginnt
					var lesson =  isStartOfLesson(j, i);
					if(lesson){
						//vom lektionsstart den tabellen index herausfinden
						indexOfTableTimeVonLesson = tableTime.findIndex(tableLesson => tableLesson.includes(lesson.tafel_von.substr(0, 5)));
						//vom lektionsende den tabellen index herausfinden
						indexOfTableTimeBisLesson = tableTime.findIndex(tableLesson => tableLesson.includes(lesson.tafel_bis.substr(0, 5)));
						indexOfWeekdayLesson = lesson.tafel_wochentag;
						
						//objekt der lektion erstellen mit startindex, endindex und wochentag
						const lessonInfo = {
							wochentag: indexOfWeekdayLesson,
							vonIndex: indexOfTableTimeVonLesson,
							bisIndex: indexOfTableTimeBisLesson
						};
						
						lessonsInfo.push(lessonInfo);
						//nötiger rowspan der zelle ermitteln
						var rowspan = indexOfTableTimeBisLesson - indexOfTableTimeVonLesson + 1;
						//herausfinden das wievielte (zeilen) kind es ist 
						var trRow1 = i + 1;
						$("#tableOutput tr:nth-child(" + trRow1 + ")").append("<td rowspan='" + rowspan + "'><div class='lesson'>" + lesson.tafel_longfach + "</br>" + lesson.tafel_raum + "</br>" + lesson.tafel_lehrer + "</div></td>");
					}else{
						if(isBetweenLessonStartAndEnd(j, i)){
							//herausfinden das wievielte (zeilen) kind es ist
							var trRow2 = i + 1;
							//überprüfen ob an dem tag schule ist, um zu schauen ob zelle ausgeblendet werden kann bei kleinem bildschirm
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
	//Kalenderwoche anzeigen
	$("#weekDisplay").html(week);
	//button für das Wechseln zwischen verschiedenen wochen anzeigen		
	$("#calenderWeekTitleHidden").css('visibility', 'visible');
	$("#calenderWeekSelectionHidden").css('visibility', 'visible');

	//Methoden für diverse überprüfungen welche beim erstellen der Tabelle benötigt werden -> übersichtlicher

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