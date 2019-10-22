#!/bin/sh
echo "Did you remember to update versioning everywhere? (package.json, html/index.html, py/snafu/_version.py)"
echo "Press enter if yes, otherwise please abort"
read

sudo rm -rf ../dist
sudo rm -rf ../dist/snafu.dmg

sudo pyinstaller interface.spec
sudo rm -rf build
cd ..
sudo npm run dist
sudo chmod -R 777 dist/*/snafu.app
sudo rm dist/*/snafu.app/Contents/Resources/app.nw/snet/BEAGLEdata.mat
sudo rm dist/*/snafu.app/Contents/Resources/app.nw/snet/swow_one.snet
sudo rm dist/*/snafu.app/Contents/Resources/app.nw/snet/swow.mat.snet
sudo rm dist/*/snafu.app/Contents/Resources/app.nw/snet/dedeyne.snet

FILESIZE=$(du -kh dist/*/ | cut -f1 | tail -n 1 | cut -d'M' -f 1)
FILESIZE=$((FILESIZE+1))
hdiutil create -srcfolder dist/*/ -size $FILESIZE -fs HFS+ -volname snafu snafu.dmg
