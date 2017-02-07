@echo off
rmdir /S /Q "./doc.old"
ren doc doc.old
mkdir doc
apidoc -i ./ -o doc/