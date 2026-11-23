@echo off
title Wedding Invitation Local Preview Server
cd /d "%~dp0"
chcp 65001 > nul

echo ============================================================
echo   DANG BUILD CAP NHAT DU LIEU THIEP CUOI...
echo ============================================================
node build.js

echo.
echo ============================================================
echo   DANG KHOI CHAY PREVIEW SERVER TAI CONG 3000...
echo   (Trinh duyet se tu dong mo trang thiep cuoi)
echo ============================================================
start http://localhost:3000/nhatrai/
node server.js
pause
