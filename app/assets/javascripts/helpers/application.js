function render(template_path, data) {
	return JST['templates/' + template_path](data);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}
