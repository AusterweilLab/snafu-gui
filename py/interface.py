import sys, json
import rw as rw
import numpy as np
import networkx as nx

def main():
    exit_status = 0
    while exit_status == 0:
        command = sys.stdin.readline()  # else keep prompt open (desktop interface)
        command = command.split('\n')[0]
        try:
            command = json.loads(command)                # string to JSON
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
        except:
            response = rw.gui.error("Could not parse JSON message")
        sys.stdout.write(json.dumps(response) + "\n")
        sys.stdout.flush()

if __name__ == '__main__':
    main()
