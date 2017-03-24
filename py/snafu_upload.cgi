#!/usr/bin/python

# http://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits-in-python
# http://stackoverflow.com/questions/6425365/creation-of-a-simple-html-file-upload-page

import cgi, random, string, os, json

print "Content-Type: text/html"
print

form = cgi.FieldStorage()
filedata = form['datafile']

rand_string_length=5

if filedata.file:
    rand_string = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(rand_string_length))
    newdir="../uploads/"+rand_string
    os.makedirs(newdir)
    filename = newdir + "/" + filedata.filename
    with file(filename, 'w') as outfile:
        outfile.write(filedata.file.read())
        print json.dumps({ "dir": newdir, "filename": filedata.filename })
