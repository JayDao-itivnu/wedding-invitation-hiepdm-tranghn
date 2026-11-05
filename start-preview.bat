@echo off
title Wedding Invitation Local Preview Server
chcp 65001 > nul

echo ============================================================
echo   💍 ĐANG BUILD CẬP NHẬT DỮ LIỆU THIỆP CƯỚI (NHÀ TRAI & GÁI)...
echo ============================================================
node build.js

echo.
echo ============================================================
echo   🚀 ĐANG KHỞI CHẠY PREVIEW SERVER TẠI CỔNG 3000...
echo   (Trình duyệt sẽ tự động mở trang xem thử)
echo ============================================================
start http://localhost:3000/
node server.js
pause
