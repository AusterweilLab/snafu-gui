data_parameters = { 
    "cluster_types": ["fluid", "static"],
    "cluster_schemes": [],
    "spellfiles": [],
    "subjects": [],
    "groups": [],
    "categories": [],
	"factor_type": "subject",
    "dir": "",
	"filename": "",
	"fullpath": "",
    "subject": "",
    "group": "",
    "category": "",
    "spellfile": "animals snafu spellfile",
    "cluster_type": "fluid",
    "cluster_scheme": "animals snafu scheme",
    "freqfiles": [],
    "aoafiles": [],
    "freqfile": "subtlex-us",
    "aoafile": "kuperman",
    "freq_sub": 0.5,
    "aoa_sub": "",
    "freq_ignore": false,
    "aoa_ignore": true
}

network_parameters = {
    "starting_graphs": ["cn_valid","pf_valid","rw","fully_connected","empty_graph"],
    "starting_graph": "cn_valid",
    "network_methods": ["Pathfinder", "First Edge", "Community Network", "Correlation-based Network", "Naive Random Walk",  "U-INVITE"],
    "network_method": "U-INVITE",
    "jump_probability": 0.0,
    "jump_types": ["stationary","uniform"],
    "jump_type": "stationary",
    "priming_probability": 0.0,
    "priors": ["None", "USF"],
    "first_items": ["stationary","uniform"],
    "first_item": "stationary",
    "prior": "None",
    "cn_windowsize": 2,
    "cn_threshold": 2,
    "cn_alpha": 0.05

}

data_properties = { }
network_properties = { }

// Defines which models take which parameters (for hide/show in interface)
params={}
params['U-INVITE'] = ['prior', 'starting_graph', 'cn_windowsize', 'cn_threshold', 'cn_alpha', 'first_item', 'jump_type', 'jump_probability', 'priming_probability']
params['Naive Random Walk'] = []
params['Correlation-based Network'] = []
params['Community Network'] = ['cn_threshold', 'cn_windowsize', 'cn_alpha']
params['Pathfinder'] = []
params['First Edge'] = []

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
    return params[value].includes(arg)
}

var data_parameters_rvs = rivets.bind($('#data_parameters'), { data_parameters: data_parameters });
var network_parameters_rvs = rivets.bind($('#network_parameters'), { network_parameters: network_parameters, data_parameters: data_parameters });
var data_properties_rvs = rivets.bind($('#data_properties'), { data_properties: data_properties });
var network_properties_rvs = rivets.bind($('#network_properties'), { network_properties: network_properties });
var subj_and_category_rvs = rivets.bind($('#subj_and_category'), { data_parameters: data_parameters });
