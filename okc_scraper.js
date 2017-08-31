// okc.js

var peep, loc, york;

for (var i = 0; i < peeps.length; i++) {
	peep = peeps[i];
	loc = peep.querySelectorAll('span.userrow-meta-location')[0].innerText;
	york = loc.includes("NY");

	if (!york) peep.remove();
}