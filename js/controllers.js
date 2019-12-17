// Bind HTML elements

// Cheap hack to style file select button
$("#choose_file").click(function() {
    $("#real_choose_file").click();
});

$("#real_choose_file").change(function() {
    var selected_file = $(this).val();
    $("#fluency_files").val(selected_file);
    $("#fluency_dir").val("");
});

$("#fluency_type").change(function() {
	data_parameters.cluster_scheme = "None";
});

$("#loaddata").click(function() {
	data_parameters.dir = $("#fluency_dir").val(); 
    data_parameters.filename = $("#fluency_files").val();
    data_parameters.fullpath = data_parameters.filename;
    if(data_parameters.dir.length>0)
        data_parameters.fullpath = data_parameters.dir + '/' + data_parameters.filename;
    command = { "type": "list_subjects_and_categories",
                "fullpath": data_parameters.fullpath
              }
    pysend(command);
});

$("#reset").click(function() {
    data_properties = {};
    network_properties = {};
    data_properties_rvs.update({ data_properties: data_properties });
    network_properties_rvs.update({ network_properties: network_properties });
});

$("#calculate_data_properties").click(function() {
    data_parameters_clone = JSON.parse(JSON.stringify(data_parameters));    // deep copy of data parameters at time of compute for Export Summary
    data_properties = {};
    data_properties_rvs.update({ data_properties: data_properties });
    command = { "type": "data_properties",
                "data_parameters": data_parameters
              }
    pysend(command);
});

$("#generate_network").click(function() {
    network_properties = {};
    network_properties_rvs.update({ network_properties: network_properties });
    command = { "type": "network_properties",
                "data_parameters": data_parameters,
                "network_parameters": network_parameters
              }
    pysend(command);
});

$("#view_network").click(function() {
    openwindow("viewgraph.html", {
        "title": "Graph Viewer",
        "height": 600,
        "width": 1000});
});


$("#export_data").click(function() {
    $("#real_export_data").click();
});

$("#real_export_data").change(function() {
    function saveFile(filename) {
        var fs = require('fs');
        data_properties_clone = JSON.parse(JSON.stringify(data_properties))  // deep copy of data properties for Export Summary
        export_json = {"data_properties": data_properties_clone, "data_parameters": data_parameters_clone}
        // delete some junk
        delete export_json['data_properties']['csv_file'];
        delete export_json['data_parameters']['fluency_types'];
        delete export_json['data_parameters']['cluster_types'];
        delete export_json['data_parameters']['categories'];
        delete export_json['data_parameters']['semantic_cluster_schemes'];
        delete export_json['data_parameters']['letter_cluster_schemes'];
        delete export_json['data_parameters']['target_letters'];
        delete export_json['data_parameters']['spellfiles'];
        delete export_json['data_parameters']['subjects'];
        delete export_json['data_parameters']['groups'];
        delete export_json['data_parameters']['freqfiles'];
        delete export_json['data_parameters']['aoafiles'];
        if (export_json['data_parameters']['factor_type'] == "subject") {
            delete export_json['data_parameters']['group'];
        } else {
            delete export_json['data_parameters']['subject'];
        }
        if (export_json['data_parameters']['fluency_type'] == "semantic") {
            delete export_json['data_parameters']['target_letter'];
        } else {
            delete export_json['data_parameters']['cluster_scheme'];
        }

        fs.writeFile(filename, JSON.stringify(export_json,null,'\t'), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File saved");
        });
    }

    var filename = $(this).val();
    saveFile(filename);
});

$("#export_network").click(function() {
    if (snafu_type == "web") {
        command = { "type": "write_data", "writestring": JSON.stringify(network_properties.graph) }
        pysend(command)
    } else {
        $("#real_export_network").click();
    }
});

$("#export_network_csv").click(function() {
    if (snafu_type == "web") {
        // NOT YET IMPLEMENTED
        // command = { "type": "write_data", "writestring": JSON.stringify(network_properties.graph) }
        // pysend(command)
    } else {
        $("#real_export_network_csv").click();
    }
});

$("#export_network_gml").click(function() {
    if (snafu_type == "web") {
        // NOT YET IMPLEMENTED
        // command = { "type": "write_data", "writestring": JSON.stringify(network_properties.graph) }
        // pysend(command)
    } else {
        $("#real_export_network_gml").click();
    }
});

$("#real_export_network").change(function() {
    function saveFile(filename) {
        var fs = require('fs');
        fs.writeFile(filename, JSON.stringify(network_properties.graph,null,'\t'), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File saved");
        });
    }

    var filename = $(this).val();
    saveFile(filename);
});

$("#real_export_network_csv").change(function() {
    function saveFile(filename) {
        var fs = require('fs');

        var obj = network_properties.graph;
        var nodes = JSON.parse("[]");
        var csv = "";
        
        for (var node in obj.nodes) {
            if(obj.nodes.hasOwnProperty(node)) {
                var val = obj.nodes[node];
                nodes[val["id"]]=JSON.parse("{}");
                nodes[val["id"]].label = val.label;
            }
        }

        for (var edge in obj.edges) {
          if (obj.edges.hasOwnProperty(edge)) {
            var val = obj.edges[edge];
            csv+=nodes[val.source].label+","+nodes[val.target].label+"\n";
          }
        }

        fs.writeFile(filename, csv , function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File saved");
        });
    }
    var filename = $(this).val();
    saveFile(filename);
});

$("#real_export_network_gml").change(function() {
    function saveFile(filename) {
        var fs = require('fs');
        
        var obj = network_properties.graph;
        var nodes = JSON.parse("[]");
        var gml = `graph\n[\n\tCreator "SNAFU"\n\tdirected 1\n`;
        
        for (var node in obj.nodes) {
            if(obj.nodes.hasOwnProperty(node)) {
                var val = obj.nodes[node];
                gml += `\tnode\n\t[\n\t\tid `+val.id+`\n\t\tlabel "`+val.label+`"\n\t]\n`;
                nodes[val["id"]]=JSON.parse("{}");
                nodes[val["id"]].id = val.id;            }
        }
        
        var edgeId = 0;
        for (var edge in obj.edges) {
          if (obj.edges.hasOwnProperty(edge)) {
            var val = obj.edges[edge];
            gml += `\tedge\n\t[\n\t\tid `+(edgeId++)+`\n\t\tsource `+nodes[val.source].id+`\n\t\ttarget `+nodes[val.target].id+`\n\t]\n`;
          }
        }
        
        gml+="]\n";


        fs.writeFile(filename, gml , function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File saved");
        });
    }
    var filename = $(this).val();
    saveFile(filename);
});

$("#question").click(function() {
    openwindow("help.html", {
        "title": "Help",
        "height": 600,
        "width": 600});
});

// $("#intrusion_list").click() used to work and now it doesn't. 
// #something to do with the element being hidden on start, but not sure why it used to work
// https://stackoverflow.com/a/11050439/353278

$("body").on("click","#spellcorrect_list",function(e) {
    e.preventDefault();
    openwindow("spellcorrect.html", {
        "title": "Spelling corrections",
        "height": 300,
        "width": 300});
});

$("body").on("click","#intrusion_list",function(e) {
    e.preventDefault();
    openwindow("intrusions.html", {
        "title": "Intrusion list",
        "height": 300,
        "width": 300});
});

$("body").on("click","#perseveration_list",function(e) {
    e.preventDefault();
    openwindow("perseverations.html", {
        "title": "Perseveration list",
        "height": 300,
        "width": 300});
});

$("body").on("click","#word_freq_list",function(e) {
    e.preventDefault();
    openwindow("word_freq.html", {
        "title": "Excluded Words",
        "height": 300,
        "width": 300});
});

$("body").on("click","#word_aoa_list",function(e) {
    e.preventDefault();
    openwindow("word_aoa.html", {
        "title": "Excluded Words",
        "height": 300,
        "width": 300});
});

$("#import_network").click(function() {
    $("#real_import_network").click();
});

$("#real_import_network").change(function() {
    var selected_file = $(this).val();
    // $("#file_import").val(selected_file);
    // var json = require(selected_file); // read json from a file path
    // network_properties.graph = json;
    command = {
        "type": "analyze_graph",
        "fullpath": selected_file
    };
    pysend(command);
});

$("#export_data_csv").click(function() {
        $("#real_export_data_csv").click();
});

$("#real_export_data_csv").change(function() {
    function saveFile(filename) {
        var fs = require('fs');
        var csv = "";

        csv = data_properties.csv_file;

        fs.writeFile(filename, csv, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File saved");
        });
    }

    var filename = $(this).val();
    saveFile(filename);
});
