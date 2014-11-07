from flask import render_template, flash, redirect, request, json
from app import app, db
from models import User, ROLE_USER, ROLE_ADMIN
from forms import UsernameForm

@app.route('/', methods = ['GET'])
def index():
    form = UsernameForm()
    posts = list()
    users = User.query.order_by(User.result.desc()).all()
    for u in users:
        if u.darkside == 1:
	        posts.append({'author': {'nickname':u.nickname}, 'darkside' : 'yeah', 'result': u.result})
        else:
            posts.append({'author': {'nickname':u.nickname}, 'result': u.result})
    return render_template("index.html",
        title = 'Home',
        posts = posts)
#        form = form)

@app.route('/add', methods = ['POST'])
def gameover():
        data = request.data
        dataDict = json.loads(data)
        if dataDict[score] < 0:
		    darkside = 1
		    dataDict[score] = -dataDict[score]
        else:
		    darkside = 0
        newuser = User(nickname = dataDicr[name], darkside = darkside, result = dataDict[score], role = ROLE_USER)
        db.session.add(newuser)
        db.session.commit()