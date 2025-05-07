@echo on
echo Checking Expense Tracker Application Health...
echo.

echo Testing Backend API...
powershell -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000/api/health' -Method GET; Write-Host 'Backend Status:' $response.StatusCode $response.StatusDescription; Write-Host 'Response:' $response.Content } catch { Write-Host 'Error connecting to backend:' $_.Exception.Message }"

echo.
echo Testing Frontend...
powershell -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5173' -Method GET; Write-Host 'Frontend Status:' $response.StatusCode $response.StatusDescription; Write-Host 'Frontend is running!' } catch { Write-Host 'Error connecting to frontend:' $_.Exception.Message }"

echo.
echo Health check completed!
pause
