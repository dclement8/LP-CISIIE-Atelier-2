@echo off
REM Supprime le dossier doc.old déja présent.
rmdir /S /Q "./doc.old"
REM Renomme le dossier doc en doc.old
ren doc doc.old
REM Créer un dossier doc
mkdir doc
