## hard links

These directories are hard links:

snet/
schemes/
spellfiles/
aoa/
frequency/

They are synched with snafu-py. If deleted here, they are deleted for snafu-py instead!
They are made using https://github.com/selkhateeb/hardlink
To remove them, use `hln -u [dir]` instead

Hard links are used to assist with github synching without maintaining multiple separate copies


## compiling with pyinstaller

* successfully compiled using python 3.5

* if not installed already
pip install pyinstaller 

* compilation:
cd py
sudo pyinstaller interface.py 	# should take 5-10 minutes 
cd ..
sudo npm run dist-win  **OR** npm run dist

* and then the compiled version should appear in ./dist/
* ~ 271mb unzipped, ~110mb zipped (using 7-Zip with smallest size specification)


## notes on packaging/distribution nwjs app without SDK

1) Install phoenix-builder (https://github.com/evshiron/nwjs-builder-phoenix) if not installed locally
    * npm install nwjs-builder-phoenix --save-dev
    
2) update nwjs/snafu version in package.json?

3) set flag in app.js to nwjs-app and debug to 0

sudo rm -rf dist    # remove old version
npm run dist        # compile new version

* chmod 777 snafu.app
* manually remove large files? (dedyne.snet, BEAGLEdata.mat)
* zip up folder (use mac gui zip, smaller than terminal zip)
