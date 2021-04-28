"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Order, OrderType,OrderDetail
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
def allUsers():

    users = User.query.all()
    all_Users = list(map(lambda x: x.serialize(), users))

    return jsonify(all_Users), 200

@api.route("/user", methods=["POST"])
def createUsers():

    request_body_user = request.get_json()

    newUser = User(UserName=request_body_user["Username"], Email=request_body_user["Email"], Password=request_body_user["Password"])
    db.session.add(newUser)
    db.session.commit()
        
    return jsonify(request_body_user), 200

@api.route("/user/<int:user_id>", methods=["PUT"])
def editUser(user_id):

    request_body_user = request.get_json()

    updateUser = User.query.get(user_id)
    if updateUser is None:
        raise APIException('User not found', status_code=404)

    if "Username" in request_body_user:
        updateUser.Username = request_body_user["Username"]
    if "Email" in request_body_user:
        updateUser.Email = request_body_user["Email"]
    if "Password" in request_body_user:
        updateUser.Password = request_body_user["Password"]    
    db.session.commit()
        
    return jsonify(request_body_user), 200

@api.route("/user/<int:user_id>", methods=["DELETE"])
def deleteUser(user_id):

    delUser = User.query.get(user_id)
    if delUser is None:
        raise APIException('Usuario no encontrado', status_code=404)
    db.session.delete(delUser)
    db.session.commit()

    return jsonify("Usuario Eliminado"), 200

@api.route('/manageorder', methods=['GET'])
#@jwt_required()
def get_AllOrders():      
    return jsonify(Order.getAllOrders()), 200
<<<<<<< HEAD

@api.route('/orderdetail/<int:id>', methods=['GET'])
def get_OrderDetail(id):  
    return jsonify(OrderDetail.getOrderDetail(id)), 200

@api.route('/changeorderstate/<int:id>', methods=['POST'])
#@jwt_required()
def changeOrderState(id):
    values = request.json
    print("Request", values)    
    orderid = values["OrderID"]
    state = values["State"]
    findOrder = Order.query.filter_by(OrderID= orderid).first()
    findOrder.State = state
    db.session.commit()
    response_body = {
        "status": "Ok"
    }
    status_code = 200 
    
    return jsonify(response_body),200
=======
>>>>>>> 15466b33f58463e519c3a2932479320abebc9ce4
