"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

#create Flask app
api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required() #this make privete the information, just for admins
def get_hello():

    username = get_jwt_identity()
    dictionary = {
        "message": "hello world" + username
    }
    
    return jsonify(dictionary)

@api.route("/user", methods=["GET"])
def createUser():

    response_body = {
        "msg": "Hello World"
    }

    return jsonify(response_body), 200