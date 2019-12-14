data_parameters = { 
    "fluency_types": ["semantic", "letter"],
    "cluster_types": ["fluid", "static"],
    "semantic_cluster_schemes": [],
    "letter_cluster_schemes": ["None","1 letter","2 letters", "3 letters"],
    "target_letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
    "spellfiles": [],
    "subjects": [],
    "groups": [],
    "categories": [],
    "freqfiles": [],
    "aoafiles": [],
	"factor_type": "subject",
    "dir": "",
	"filename": "",
	"fullpath": "",
    "subject": "",
    "group": "",
    "category": "",
    // DEFAULTS
    "target_letter": "",
    "spellfile": "animals snafu spellfile",
    "cluster_type": "fluid",
    "fluency_type": "semantic",
    "cluster_scheme": "animals snafu scheme",
    "freqfile": "subtlex-us",
    "aoafile": "kuperman",
    "freq_sub": 0.5,
    "aoa_sub": "",
    "freq_ignore": false,
    "aoa_ignore": true
}

network_parameters = {
    "starting_graphs": ["cn_valid","pf_valid","rw","fully_connected","empty_graph"],
    "network_methods": ["Pathfinder", "First Edge", "Conceptual Network", "Correlation-based Network", "Naive Random Walk",  "U-INVITE"],
    "jump_types": ["stationary","uniform"],
    "priors": ["None", "USF"],
    "first_items": ["stationary","uniform"],
    // DEFAULTS
    "first_item": "stationary",
    "starting_graph": "cn_valid",
    "network_method": "U-INVITE",
    "jump_type": "stationary",
    "priming_probability": 0.0,
    "jump_probability": 0.0,
    "prior": "None",
    "cn_windowsize": 2,
    "cn_threshold": 2,
    "cn_alpha": 0.05
}

// Defines which models take which parameters (for hide/show in interface)
model_parameters={
    "U-INVITE": ['prior', 'starting_graph', 'cn_windowsize', 'cn_threshold', 'cn_alpha', 'first_item', 'jump_type', 'jump_probability', 'priming_probability'],
    "Naive Random Walk": [],
    "Correlation-based Network": [],
    "Conceptual Network": ['cn_threshold', 'cn_windowsize', 'cn_alpha'],
    "Pathfinder": [],
    "First Edge": []
}


data_properties = { }
network_properties = { }


// Rivets formatters
rivets.formatters.trunc = function(value) {
    if (Number(value) == value) {
        return Math.round(value * 1000) / 1000;
    } else {
        return value;
    }
}

rivets.formatters.eq = function(value, arg) {
    return value == arg;
}

rivets.formatters.hasProp = function(value, arg) {
    return model_parameters[value].includes(arg)
}

var data_parameters_rvs = rivets.bind($('#data_parameters'), { data_parameters: data_parameters });
var network_parameters_rvs = rivets.bind($('#network_parameters'), { network_parameters: network_parameters, data_parameters: data_parameters });
var data_properties_rvs = rivets.bind($('#data_properties'), { data_properties: data_properties });
var network_properties_rvs = rivets.bind($('#network_properties'), { network_properties: network_properties });
var subj_and_category_rvs = rivets.bind($('#subj_and_category'), { data_parameters: data_parameters });
