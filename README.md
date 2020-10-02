# SPIKEHIVE2K20

## Team Members:
- Roshan Pai
- Aanjanaye Kajaria
- Vivian Dai
- Ege G Kula
- Zhuoliang Cai
- Harry Pretel

### Install django:
```
$ python3 --version
3.6.1

$ pip3 install django

$ pip3 install djangorestframework

$ pip3 install Pillow

$ pip3 install django-cors-headers
```

### Create and run migrations:
```
$ cd SPIKEHIVE2K20/hive
$ python3 manage.py createmigrations
$ python3 manage.py migrate
```


### Run Server:
- Navigate to SPIKEHIVE2K20/hive directory, then run
```
$ python3 manage.py runserver
```

### Create superuser:
```
$ cd SPIKEHIVE2K20/hive
$ python3 manage.py createsuperuser
```
You will be prompted to enter a username and password, fill them in and write them down.

### Backend notes:
admin user: harrisonp
password: admin

### Run the react server:
- Navigate to SPIKEHIVE2K20/frontend directory, then run 
```	
$ npm ci
$ npm start 
```

