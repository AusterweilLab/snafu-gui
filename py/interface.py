import sys, json, os
import snafu
import numpy as np
import networkx as nx
import logging
from pathlib import Path

if sys.argv[1] == "nwjs-app":
    py2app = 1
else:
    if sys.argv[1] == "nwjs-win":
        py2app = 2           # compiled on windows
    else:
        py2app = 0          # is interface.py compiled with py2app?

log_errors = 1      # do you want to log errors?

# get SNAFU root path
root_path = Path(os.getcwd())
if py2app==1:
    root_path = root_path.parent.parent.parent.parent.parent
if py2app==2:
    root_path = root_path # this line seems unnecessary but takes lots of debugging time
root_path = str(root_path)


if log_errors:
# log errors for debugging
    # does not work for py2app or web versions!
    # https://stackoverflow.com/questions/4690600/python-exception-message-capturing
    logger = logging.getLogger('snafu')
    hdlr = logging.FileHandler(root_path + '/error.log')
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    hdlr.setFormatter(formatter)
    logger.addHandler(hdlr)
    logger.setLevel(logging.INFO)
    # Use logger.info('stuff') to record non-errors
        
def main():
    exit_status = 0
    while exit_status == 0:
        command = sys.stdin.readline()  # else keep prompt open (desktop interface)
        command = command.split('\n')[0]
        try:
            command = json.loads(command)                # string to JSON
            if 'type' in list(command.keys()):
                if command['type'] in dir(snafu.gui):
                    try:
                        response = getattr(snafu.gui, command['type'])(command, root_path)
                    except Exception as e:
                        error_msg = "Unknown error in function: " + command['type']
                        if log_errors:
                            error_msg += ", see error.log for more details"

                            exc_type, exc_obj, exc_tb = sys.exc_info()
                            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
                            logger.error(fname + ':' + str(exc_tb.tb_lineno) + " UNKNOWN")
                            logger.exception(e)
                        response = snafu.gui.error(error_msg)
                    if command['type'] == "quit":
                        exit_status = 1
                else:
                    response = snafu.gui.error("Invalid command: " + command['type'])
            else:
                response = snafu.gui.error("No command specified")
        except Exception as e:
            error_msg = "Could not parse JSON message"
            if log_errors:
                error_msg += ", see error.log for more details"
                
                # print filename and line no; https://stackoverflow.com/a/1278740/353278
                exc_type, exc_obj, exc_tb = sys.exc_info()
                fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
                logger.error(fname + ':' + str(exc_tb.tb_lineno) + " JSON")
                logger.exception(e)
            response = snafu.gui.error(error_msg)
            response = snafu.gui.error(", see error.log for more details")
        sys.stdout.write(json.dumps(response) + "\n")
        sys.stdout.flush()

if __name__ == '__main__':
    main()
