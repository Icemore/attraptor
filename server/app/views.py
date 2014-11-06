from flask import render_template, flash, redirect
from app import app, db
from models import User, ROLE_USER, ROLE_ADMIN
from forms import UsernameForm

@app.route('/')
@app.route('/index')
def index():
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
@app.route('/')
@app.route('/gameover', methods = ['GET', 'POST'])
def gameover():
    form = UsernameForm()
    if form.validate_on_submit():
        newuser = User(nickname = form.username.data, darkside=0,result=404, role = ROLE_USER)
        db.session.add(newuser)
        db.session.commit()	    
        flash('Added username ' + form.username.data + ' with some result')
        return redirect('/index')
    return render_template("gameover.html",
		title = 'Gameover',
        form = form)