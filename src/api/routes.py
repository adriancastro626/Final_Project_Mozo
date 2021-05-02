"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Order, OrderType,OrderDetail, Product, Category
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

@api.route('/neworder', methods=['POST'])
#@jwt_required()
def newOrder():
    values = request.json

    neworder = Order(OrderTypeID= values["OrderTypeID"], 
    OrderDate= values["OrderDate"], 
    State= values["State"], 
    TotalQuantity= values["TotalQuantity"],
    EstimatedTime= 20,
    Notes= values["Notes"],
    SubTotal= values["SubTotal"],
    Discount= values["Discount"],
    Tax= values["Tax"],
    Total= values["Total"],
    ClientName= values["ClientName"])

    db.session.add(neworder)
    db.session.commit()

    cart = values["Cart"]

    for i in cart: 
        neworderdetail = OrderDetail(OrderID=  neworder.OrderID, 
        ProductID= i["ProductID"], 
        Quantity= i["Quantity"],
        SubTotal= i["SubTotal"],
        Discount=i["Discount"],
        Tax= i["Tax"],
        Total= i["Total"])
        db.session.add(neworderdetail)
        db.session.commit()

    response_body = {
        "status": "Ok",
        "NewOrderID": neworder.OrderID
    }
    status_code = 200 
    
    return jsonify(response_body),200

@api.route('/managemenu', methods=['GET'])
#@jwt_required()
def get_AllProducts():      
    return jsonify(Product.getAllProducts()), 200

@api.route('/newproduct', methods=['POST'])
#@jwt_required()
def newProduct():
    values = request.json

    category = values["Category"]
    if(category):
        findCategory = Category.query.filter_by(Name= category).first()        
    else:
        findCategory = Category.query.filter_by(Name= "Todas").first()

    newproduct = Product(CategoryID= findCategory.CategoryID, 
    Name= values["Name"], 
    Price=  values["Price"] , 
    Description=  values["Description"],
    ImageURL=  values["ImageURL"] ,
    Notes= values["Notes"],
    Available= values["Available"])

    db.session.add(newproduct)
    db.session.commit()
    response_body = {
        "status": "OK"
    }
    status_code = 200 
    
    return jsonify(response_body),200

@api.route('/updateproduct', methods=['POST'])
#@jwt_required()
def updateProduct():
    values = request.json
    productid = values["ProductID"]
    category = values["Category"]
    name = values["Name"] 
    price = values["Price"] 
    description = values["Description"]
    imageurl = values["ImageURL"] 
    available = values["Available"]

    findProduct = Product.query.filter_by(ProductID= productid).first()
    if(category):
        findCategory = Category.query.filter_by(Name= category).first()        
    else:
        findCategory = Category.query.filter_by(Name= "Todas").first()

    findProduct.CategoryID = findCategory.CategoryID
    findProduct.Name = name
    findProduct.Price = price
    findProduct.Description = description
    findProduct.ImageURL = imageurl
    findProduct.Available = available
    db.session.commit()
    response_body = {
        "status": "OK"
    }
    status_code = 200 
    
    return jsonify(response_body),200

@api.route("/deleteproduct/<int:producid>", methods=["POST"])
def deleteProduct(producid):
    delProduct = Product.query.get(producid)
    if delProduct is None:
        raise APIException('Producto no existe', status_code=404)
    
    delProduct.Available = False
    db.session.commit()

    response_body = {
        "status": "OK"
    }

    return jsonify(response_body), 200

