//selektierter Job im localStorage speichern
function localstorageSetJobId(jobId){
	localStorage.setItem("jobId", jobId);
}

//Job aus dem localStorage auslesen
function localstorageGetJobId(){
	return localStorage.getItem("jobId");
}

//selektierte Klasse im localStorage speichern
function localstorageSetClassId(classId){
	localStorage.setItem("classId", classId);
}

//Klasse aus dem localStorage auslesen
function localstorageGetClassId(){
	return localStorage.getItem("classId");
}