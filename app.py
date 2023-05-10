from flask import *
from menousdb import *
from flask_session import Session
from functools import wraps
import json
import os
import sys
from auth import *
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

API_URL = "http://127.0.0.1:5555/"

def Login(username, password):
    Path = "/Library/Caches/.menousdb/authdata"
    if not os.path.exists(Path):
        os.mkdir(Path)
    if not os.path.exists(Path + "/keys.json"):
        with open(Path + "/login.json", 'w') as file:
            json.dump([],file)
    if not os.path.exists(Path + "/login.json"):
        with open(Path + "/login.json", 'w') as file:
            json.dump({},file)
        return 'Sign Up Required! Please contact Administrator'
    with open(Path + "/login.json", 'r') as file:
        data = json.load(file)
        for i in data:
            if i == username and data[i][0] == password:
                return True
        return False
    

def getUserKey(username):
    Path = "/Library/Caches/.menousdb/authdata"
    with open(Path + "/login.json", 'r') as file:
        data = json.load(file)
        for i in data:
            if i == username:
                return data[i][1]
            
def login_required(f):
   
    @wraps(f)
    def wrap(*args, **kwargs):
        if not session.get("logStatus"):
            session["logStatus"] = False

        if session["logStatus"] == False:
            return redirect('/login')
        # finally call f. f() now haves access to g.user
        return f(*args, **kwargs)
       
   
    return wrap
@app.route('/session',methods=['GET'])
def sess():
    return jsonify(session)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
    
        if Login(username, password) == True:
            session['logStatus'] = True
            session['key'] = getUserKey(username)
            return redirect('/')
        elif Login(username, password) == False:
            return render_template('login.html', loggFail=True)
        else:
            return render_template('login.html', signup=True, msg=Login(username, password))
    return render_template('login.html')
        

@app.route('/', methods=['GET'])
def indexmain():
    return redirect('/view')

@app.route('/view', methods=['GET','POST'])
@login_required
def homePage():
    if request.method == 'GET':
        db = MenousDB(
        API_URL,
        session["key"],
        'test'
    )
        return render_template('index.html',databases=db.get_databases())
    elif request.method == "POST":
        database = request.form.get("database_name").replace(" ", "_")
        db = MenousDB(
        API_URL,
        session["key"],
        database
        )
        db.createDb()
        return redirect(f'/view/{database}')
    

@app.route('/view/<database>/<table>', methods=["GET", "POST"])
@login_required
def index(database, table):
    db = MenousDB(
            API_URL,
            session["key"],
            database
        )
    if request.method == "GET":
        data = db.readDB()
        if not request.args == {}:
            values = {}
            for i in data[table]['attributes']:
                values[i] = request.args.get(i)
            db.insertIntoTable(
                table,values
            )
            return redirect(f'/view/{database}/{table}')
        return render_template('table.html', data = data[table])
    
    if request.method == "POST":
        conditions = {}
        values = {}
        deleteConditions = {}
        for i in request.form:
            if "originalAttribute" in i:
                conditions[request.form.get(i)] = request.form.get(i.replace("Attribute","Value"))
            elif "newAttribute" in i:
                values[request.form.get(i)] = request.form.get(i.replace("Attribute","Value"))
            elif "deleteAttribute" in i:
                deleteConditions[request.form.get(i)] = request.form.get(i.replace("Attribute","Value"))
            
        if conditions != {} and values != {}:
            db.update_table(table,conditions,values)
            return redirect(f"/view/{database}/{table}")
        
        if deleteConditions != {}:
            db.delete_where(table, deleteConditions)
            return redirect(f"/view/{database}/{table}")
    
        if "deleteTable" in request.form:
            db.delete_table(table)
            return redirect(f"/view/{database}")
        return jsonify(request.form)
        

@app.route('/logout', methods = ['GET'])
@login_required
def logout():
    session.pop('logStatus')
    session.pop('key')
    return redirect('/')

@app.route('/view/<database>', methods = ['GET', 'POST'])
@login_required
def db(database):
    if request.method == 'POST':
        table = request.form.get("table_name")
        params = []
        for i in request.form:
            if 'param' in i:
                params.append(request.form[i])
        db=MenousDB(
            API_URL,
            session["key"],
            database
        )
        if "deleteDatabase" in request.form:
            db.deleteDatabase()
            return redirect('/view')
        try:
            db.createTable(table, params)
            return redirect(f'/view/{database}')
        except:
            return "Table already Exists"
        
    else:
        db = MenousDB(
            API_URL,
            session["key"],
            database
        )
        tables = []
        for i in db.readDB():
            tables.append(i)
        return render_template('database.html', tables=tables, database=database)

if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--signup":
        signup()
    app.run(debug=True,host="0.0.0.0", port=5096)
