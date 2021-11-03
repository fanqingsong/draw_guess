
## start redis server
docker run -p 6379:6379 -d redis:5

cd backend
pipenv run python3 manage.py runserver
cd -


