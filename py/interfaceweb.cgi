#!/usr/local/bin/python

import sys, json, os
import rw
import numpy as np
import networkx as nx
import cgi
from pathlib import Path
#import logging

# get SNAFU root path
root_path = str(Path(os.getcwd()).parent)

def main(command):
    if 'type' in command.keys():
        if command['type'] == "directory_listing":
            if command['folder'] == "schemes":
                files = [i[0:i.find(".csv")].replace("_"," ") for i in os.listdir('../schemes/') if ".csv" in i]
                response = {"type": "directory_listing", "cluster_schemes": files}
            elif command['folder'] == "spellfiles":
                files = [i[0:i.find(".csv")].replace("_"," ") for i in os.listdir('../spellfiles/') if ".csv" in i]
                response = {"type": "directory_listing", "spellfiles": files}
            else:
                response = rw.gui.error("Unknown error in function: " + command['type'])
        elif command['type'] in dir(rw.gui):
            try:
                response = getattr(rw.gui, command['type'])(command, root_path)
            except:
                response = rw.gui.error("Unknown error in function: " + command['type']) # + ", see error.log for more details")
        else:
            response = rw.gui.error("Invalid command: " + command['type'])
    else:
        response = rw.gui.error("No command specified")
    sys.stdout.write(json.dumps(response) + "\n")
    sys.stdout.flush()

if __name__ == '__main__':
    sys.stdout.write("Content-type: text/html\n\n")
    command = cgi.FieldStorage(environ={'REQUEST_METHOD':'POST'})
    command = json.loads(command['json_string'].value)
    main(command)
