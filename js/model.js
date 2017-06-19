data_parameters = { 
    "cluster_types": ["fluid", "static"],
    "cluster_schemes": ["Troyer","Troyer-Hills", "Troyer-Hills-Zemla"],
    "spellfiles": ["None","Zemla"],
    "subjects": [],
    "categories": [],

	"dir": "",
	"filename": "",
	"fullpath": "",
    "subject": "",
    "category": "",
    "spellfile": "Zemla",
    "cluster_type": "fluid",
    "cluster_scheme": "Troyer-Hills"
}

network_parameters = {
    "network_methods": ["RW", "U-INVITE", "Goni"],
    "network_method": "U-INVITE"
}

data_properties = { }
network_properties = { }

// Rivets formatters
rivets.formatters.trunc = function(value){
  return Math.round(value * 1000) / 1000
}

var data_parameters_rvs = rivets.bind($('#data_parameters'), { data_parameters: data_parameters });
var network_parameters_rvs = rivets.bind($('#network_parameters'), { network_parameters: network_parameters, data_parameters: data_parameters });
var data_properties_rvs = rivets.bind($('#data_properties'), { data_properties: data_properties });
var network_properties_rvs = rivets.bind($('#network_properties'), { network_properties: network_properties });
var subj_and_category_rvs = rivets.bind($('#subj_and_category'), { data_parameters: data_parameters });
