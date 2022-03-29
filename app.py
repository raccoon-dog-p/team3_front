from flask import Flask, request,render_template,url_for,redirect
# JWT 사용을 위한 SECRET_KEY 정보가 들어있는 파일 임포트

from flask.json import jsonify
from http import HTTPStatus
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# 환경변수 셋팅 




@app.route("/")
def home():
    return render_template("home.html")
# 경로와 리소스를 연결한다.

@app.route("/search")
def search():
    return render_template("search.html")


@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/contents")
def contents():
    return render_template("contents.html")

@app.route("/bookmark")
def bookmark():
    return render_template("bookmark.html")

@app.route("/rec")
def rec():
    return render_template("rec.html")

if __name__ == '__main__' :
    app.run(host="52.78.40.92",port="8505")