from flask.ext.wtf import Form
from wtforms import TextField
from wtforms.validators import Required

class UsernameForm(Form):
    username = TextField('username', validators = [Required()])