data_parameters = { 
    "cluster_types": ["fluid", "static"],
    "cluster_schemes": ["Troyer-Hills", "Troyer-Hills-Zemla"],
    "subjects": [],
    "categories": [],

	"dir": "",
	"filename": "",
	"fullpath": "",
    "subject": "",
    "category": "",
    "cluster_type": "fluid",
    "cluster_scheme": "Troyer-Hills"
}

network_parameters = {
    "network_methods": ["RW", "U-INVITE"],
    "network_method": "RW"
}

data_properties = { }
network_properties = { }

// Rivets formatters
rivets.formatters.trunc = function(value){
  return Math.round(value * 100) / 100
}

var data_parameters_rvs = rivets.bind($('#data_parameters'), { data_parameters: data_parameters });
var network_parameters_rvs = rivets.bind($('#network_parameters'), { network_parameters: network_parameters, data_parameters: data_parameters });
var data_properties_rvs = rivets.bind($('#data_properties'), { data_properties: data_properties });
var network_properties_rvs = rivets.bind($('#network_properties'), { network_properties: network_properties });
var subj_and_category_rvs = rivets.bind($('#subj_and_category'), { data_parameters: data_parameters });
