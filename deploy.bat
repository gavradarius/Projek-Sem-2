@echo off
echo ========================================
echo    LogiCorp - Git Deploy Script
echo ========================================
echo.

set /p commit_msg="Masukkan pesan commit: "

echo.
echo Menambahkan file ke git...
git add .

echo.
echo Membuat commit...
git commit -m "%commit_msg%"

echo.
echo Push ke GitHub...
git push origin main

echo.
echo ========================================
echo ✅ Deploy selesai!
echo Website akan otomatis update di GitHub Pages
echo ========================================
pause