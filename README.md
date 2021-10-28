# draw and guess
based on django_channels_chat_official_tutorial_react project,
create draw and guess game feature.

# requirements

## basics
- [x] draw page, for artist, provide a sketch pad for artist to draw
- [x] guess page, for gusser, display drawing at real time for gusser

## authentication
- [ ] display logging page if not logged by user.
- [ ] display home page(draw & guess) if logged by user.


# Technology Stack

| Category | Name | Description |
| ----------- | ----------- | ----------- |
| Backend | Django | web framework |
| Backend | DRF | web framework of RESTAPI |
| Backend | Channels | websocket server library |
| Backend | djoser | authentication library based on DRF |
| Frontend | React | frontend library |
| Frontend | AntDesign | frontend UI library |
| Frontend | react-sketch2 | Canvas Drawing UI library |

# demo
draw page: when you are painting on this page

![avatar](./demo/draw.png)

guess page: guesser can watch the drawing lively.

![avatar](./demo/guess.png)

# reference
## react-sketch2
https://www.npmjs.com/package/react-sketch2

## django channels
https://channels.readthedocs.io/en/stable/tutorial/index.html


# RUN

## frontend build

```
npm run build
```

## frontend development(optional)

```
npm start
```


## start redis server

```
docker run -p 6379:6379 -d redis:5
```

## start dev server
```
cd backend

pipenv install

pipenv run python3 manage.py runserver
```

## access page
go to chrome, access the following URL:
http://127.0.0.1:8000/

enter draw page

then open another chrome window, access URL
http://127.0.0.1:8000/

enter guess page

finally, keep two page visible, then draw and guess.


# Dev

## DB migrate

```
pipenv run python3 manage.py  migrate
```



