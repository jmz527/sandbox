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
	console.log(tmp_files);


	var data = new FormData();
	var count = 0;

	selDiv.innerHTML = "";

	$.each(tmp_files, function(i, file) {
		// console.log(i);
		// console.log(file);

		if(rmvd_files.indexOf(file.name)== -1) {
			data.append(count, file);
			count++;
		}
	});

	console.log(data);



	for (var i = 0; i < files.length; i++) {
		var f = files[i];

		console.log(f.name);
		tmp_files.push(f);

		selDiv.innerHTML += f.name + " <a href='#' data-index-num='"+i+"' class='rmvd'>X</a><br/>";
	}

	var xs = document.getElementsByClassName("rmvd");
	// console.log(xs);

	$(xs).click(function(e) {

		var index = e.target.dataset.indexNum;
		// console.log(index);
		// console.log(tmp_files);
		// console.log(tmp_files[index]);

		rmvd_files[index] = tmp_files[index];
		// console.log(rmvd_files);

	});
	// console.log(tmp_files);
}








$(document).ready(function() {


});