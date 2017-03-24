#!/usr/bin/python

import sys, json
import rw
import numpy as np
import networkx as nx
import cgi

def main(command):
    if 'type' in command.keys():
        if command['type'] in dir(rw.gui):
            try:
                response = getattr(rw.gui, command['type'])(command)
            except:
                response = rw.gui.error("Unknown error in function: " + command['type'])
            if command['type'] == "quit":
                exit_status = 1
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
