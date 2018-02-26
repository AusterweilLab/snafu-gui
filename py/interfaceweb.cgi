#!/usr/local/bin/python

import sys, json, os
import snafu
import numpy as np
import networkx as nx
import cgi
from pathlib import Path
import string
import random
#import logging

# get SNAFU root path
root_path = str(Path(os.getcwd()).parent)

def main(command):
    if 'type' in command.keys():
        # for non-web version, directory listing is a nodejs function in app.js
        if command['type'] == "directory_listing":
            if command['folder'] == "schemes":
                files = [i[0:i.find(".csv")].replace("_"," ") for i in os.listdir('../schemes/') if ".csv" in i]
                response = {"type": "directory_listing", "cluster_schemes": files}
            elif command['folder'] == "spellfiles":
                files = [i[0:i.find(".csv")].replace("_"," ") for i in os.listdir('../spellfiles/') if ".csv" in i]
                response = {"type": "directory_listing", "spellfiles": files}
            else:
                response = snafu.gui.error("Unknown error in function: " + command['type'])
        
        # for non-web version, write data is a nodejs function in controllers.js
        elif command['type'] == "write_data":
            rand_string_length=5
            rand_string = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(rand_string_length))
            newdir="../output/"+rand_string
            os.makedirs(newdir)
            filename = newdir + "/data.csv"
            
            with open(filename,'w') as fo:
                fo.write(command['writestring'])
                response = {"type": "write_data", "filename": filename}
        
        elif command['type'] in dir(snafu.gui):
            try:
                response = getattr(snafu.gui, command['type'])(command, root_path)
            except:
                response = snafu.gui.error("Unknown error in function: " + command['type']) # + ", see error.log for more details")
        else:
            response = snafu.gui.error("Invalid command: " + command['type'])
    else:
        response = snafu.gui.error("No command specified")
    sys.stdout.write(json.dumps(response) + "\n")
    sys.stdout.flush()

if __name__ == '__main__':
    sys.stdout.write("Content-type: text/html\n\n")
    command = cgi.FieldStorage(environ={'REQUEST_METHOD':'POST'})
    command = json.loads(command['json_string'].value)
    main(command)
