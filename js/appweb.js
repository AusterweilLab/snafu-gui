// wrapper to send command but also display loading gif
function pysend(command) {
    command = JSON.stringify(command);
    $.ajax({
        type: "POST",
        url: "../py/interfaceweb.cgi",
        data: { "json_string": command },
        success: function(message) {
            message = JSON.parse(message);
            console.log("JSON response: ", message);
            messagetype = message.type;
            delete message.type;        // don't store return type in data/network properties
            if (messagetype == "data_properties") {
                delete data_properties.perseverations;      // these two properties may not get overwritten
                delete data_properties.intrusions;
                Object.assign(data_properties, message);
            } else if (messagetype == "network_properties") {
                Object.assign(network_properties, message);
            } else if (messagetype == "list_subjects_and_categories") {
                Object.assign(data_parameters, message);
            } else if (messagetype == "error") {
                alert("Unexpected Error: " + message.msg);
            }
            $("#loading").css("visibility","hidden");
        },
        error: function(request, error) { console.log(error); }
    });
    $("#loading").css("visibility","visible");
}

function openwindow(loc, params) {
    window.open(loc, target="_blank", 'location=no, width='+params.width+', height='+params.height)
}

// handle file upload
// http://wabism.com/html5-file-api-how-to-upload-files-dynamically-using-ajax/
// http://stackoverflow.com/questions/2320069/jquery-ajax-file-upload
$("#real_choose_file").change(function() {
    var myFile = this.files[0];
    var formData = new FormData();
	formData.append('datafile', myFile);

    $.ajax({
        type: "POST",
        url: "../py/snafu_upload.cgi",
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function(message) {
			message=JSON.parse(message);
            $("#fluency_files").val(message.filename);
			$("#fluency_dir").val(message.dir);
        },
        error: function(request, error) { console.log(error); }
    });
});

