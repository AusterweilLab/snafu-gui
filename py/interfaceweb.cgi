#!/usr/bin/python

import sys, json
import rw
import numpy as np
import networkx as nx
import cgi
import logging

# logging doesn't work for web version... write permission issues??

# log errors for debugging
# https://stackoverflow.com/questions/4690600/python-exception-message-capturing
#logger = logging.getLogger('snafu')
#hdlr = logging.FileHandler('error.log')
#formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
#hdlr.setFormatter(formatter)
#logger.addHandler(hdlr)
#logger.setLevel(logging.INFO)
# Use logger.info('stuff') to record non-errors

def main(command):
    if 'type' in command.keys():
        if command['type'] in dir(rw.gui):
            try:
                response = getattr(rw.gui, command['type'])(command)
            except:
                response = rw.gui.error("Unknown error in function: " + command['type']) # + ", see error.log for more details")
                logger.error('UNKNOWN ' + str(e))
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
