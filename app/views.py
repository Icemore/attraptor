from flask import render_template
from app import app, db
from models import User, ROLE_USER, ROLE_ADMIN

@app.route('/')
@app.route('/index')
def index():
    user = { 'nickname': 'Petr' }
    posts = list()
 
#    newuser = User(nickname = 'Chubakka', darkside=1,result=101, role = ROLE_USER)
#    db.session.add(newuser)
#    db.session.commit()
    users = User.query.all()
    for u in users:
        if u.darkside == 1:
	        posts.append({'author': {'nickname':u.nickname}, 'darkside' : 'yeah', 'result': u.result})
        else:
            posts.append({'author': {'nickname':u.nickname}, 'result': u.result})
    return render_template("index.html",
        title = 'Home',
        user = user,
        posts = posts)