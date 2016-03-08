var selDiv = "", fileInput, files;

fileInput = document.getElementById("attachments-input");
files = $(fileInput)[0].files;

var tmp_files = new Array();
var rmvd_files = new Array();

document.addEventListener("DOMContentLoaded", init, false);

function init() {
	document.querySelector('#attachments-input').addEventListener('change', handleFileSelect, false);

	selDiv = document.querySelector("#selectedFiles");
}

function handleFileSelect(e) {
	if (!e.target.files || !window.FileReader) return;

	var files = e.target.files;
	for (var i = 0; i < files.length; i++) {
		file = files[i];

		tmp_files.push(file);
	}	
	// console.log(tmp_files);

	newFormData();
	setRemoveListeners();
}

function newFormData() {
	var data = new FormData();
	var count = 0;
	selDiv.innerHTML = "";

	$.each(tmp_files, function(i, file) {
		if(rmvd_files.indexOf(file)== -1) {
			data.append(count, file);
			selDiv.innerHTML += file.name + " <a href='#' data-index-num='"+i+"' class='rmvd'>X</a><br/>";
			count++;
		}
	});
	// console.log(data);
}

function setRemoveListeners() {
	var xs = document.getElementsByClassName("rmvd");

	$(xs).click(function(e) {
		var index = e.target.dataset.indexNum;

		rmvd_files[index] = tmp_files[index];
		// console.log(rmvd_files);
		newFormData();
		setRemoveListeners();
	});
}

