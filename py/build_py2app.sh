#!/bin/bash

set -e                       # abort if any line returns an error
sudo python setup.py py2app  #compile
rm -rf build                 # remove excess file

# unzip site-packages because one module causes errors when zipped
# see https://bugs.python.org/issue24960
mkdir ./dist/interface.app/Contents/Resources/lib/python2.7/site-packages
unzip ./dist/interface.app/Contents/Resources/lib/python2.7/site-packages.zip -d ./dist/interface.app/Contents/Resources/lib/python2.7/site-packages/
rm -rf ./dist/interface.app/Contents/Resources/lib/python2.7/site-packages.zip
