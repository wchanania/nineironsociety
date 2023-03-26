import json
import uuid
import os
import sqlite3
import click
from flask import Flask, request, jsonify, session, current_app, g
from datetime import datetime, timedelta, timezone
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            'database.sqlite',
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

api = Flask(__name__)
init_app(api)
api.secret_key = 'febddbfe0b0945d1936eb8b78b2e7652'
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

@api.route('/register_user',methods = ['POST', 'GET'])
def register_user():
    if request.method == 'POST':
        try:
            first_name = request.json.get("first_name",None)
            last_name = request.json.get("last_name",None)
            email = request.json.get("email",None)
            password = request.json.get("password",None)
            zipcode = request.json.get("zipcode",None)
            db = get_db()
            with sqlite3.connect("database.sqlite") as con:
                cur = con.cursor()
                cur.execute("INSERT INTO users (user_id,first_name,last_name,email,password,zipcode) VALUES (?,?,?,?,?,?)",(str(uuid.uuid1()),first_name,last_name,email,generate_password_hash(password), zipcode))  
                con.commit()
                msg = "Record successfully added"
        except db.IntegrityError:
            msg = f"User {email} is already registered."
            con.rollback()
        finally:
            con.close()
            return jsonify({'msg':msg})

@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"msg": "Logout Successful"})
    unset_jwt_cookies(response)
    return response, 200

@api.route('/authenticate', methods=["POST"])
def authenticate():
    if request.method == 'POST':
        email = request.json.get('email',None)
        password = request.json.get('password',None)
        db = get_db()
        response = None
        user = db.execute(
            'SELECT * FROM users WHERE email = ?', (email,)
        ).fetchone()
        if user is None:
            print('User is None')
            response = {"msg": "Wrong username or password"}, 401
        elif not check_password_hash(user['password'], password):
            print('Pass Does not match')
            response = {"msg": "Wrong username or password"}, 401
        if response is None:
            access_token = create_access_token(identity=email)
            response = {"access_token":access_token}
            print('Access token granted')
    return response
        
@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@api.route('/profile')
@jwt_required() #makes auth required
def my_dashoard():
    response_body = {
        "first_Name": "King",
        "last_Name" :"Kong"
    }

    return response_body






