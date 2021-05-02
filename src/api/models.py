from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    UserID = db.Column(db.Integer, primary_key=True)
    UserName = db.Column(db.String(100), unique=True, nullable=False)
    Email = db.Column(db.String(130), unique=True, nullable=False)
    Password = db.Column(db.String(180), nullable=False)
    TypeID = db.Column(db.Integer, db.ForeignKey("usertypes.TypeID"), nullable=True)
    # usertypes = db.relationship('UserTypes')  

    def __ref__(self):
        return '<User %r>' % self.UserName
    
    def serialize(self):
        return {
            "UserID": self.UserID,
            "UserName": self.UserName,
            "Email": self.Email            
        }
    
    # def getAllUsers():
    #     all_users = User.query.all()
    #     all_users = list(map(lambda x: x.serialize(), all_users))
    #     return all_users

class UserTypes(db.Model):
    __tablename__ = 'usertypes'
    TypeID = db.Column(db.Integer, primary_key=True)
    Position = db.Column(db.String(10), unique=True, nullable=False)
    tipoUsuario = db.relationship('User', lazy=True)

    def __ref__(self):
        return '<UserTypes %r>' % self.Position
    
    def serialize(self):
        return {
            "Position": self.Position                      
        }

class OrderType(db.Model):
    __tablename__ = 'ordertype'
    OrderTypeID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(15), unique=True, nullable=False)

class Category(db.Model):
    __tablename__ = 'category'
    CategoryID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(10), unique=True, nullable=False)

class Product(db.Model):
    __tablename__ = 'product'
    ProductID = db.Column(db.Integer, primary_key=True)
    CategoryID = db.Column(db.Integer, db.ForeignKey("category.CategoryID"), nullable=True) #if is null it has to appear in all categories
    Name = db.Column(db.String(100), nullable=False)
    Price = db.Column(db.Numeric(18,2), nullable=False)
    Description = db.Column(db.String(300), nullable=True)
    ImageURL = db.Column(db.String(500), nullable=True)
    Available = db.Column(db.Boolean(), nullable=False)
    category = db.relationship('Category')  

    def serialize(self):
        category = Category.query.filter_by(CategoryID=self.CategoryID).first()
        return {
            "ProductID": self.ProductID,
            "CategoryID": self.CategoryID,
            "Category": category.Name,
            "Name": self.Name,
            "Price": float(self.Price),
            "Description": self.Description,
            "ImageURL": self.ImageURL,
            "Available": self.Available,
        }

    def getAllProducts():
        all_products = Product.query.order_by(Product.Available).all()        
        all_products = list(map(lambda x: x.serialize(), all_products))
        return all_products

class Order(db.Model):
    __tablename__ = 'order'
    OrderID = db.Column(db.Integer, primary_key=True)
    OrderTypeID = db.Column(db.Integer, db.ForeignKey("ordertype.OrderTypeID"), nullable=False)
    OrderDate = db.Column(db.DateTime, nullable=True)
    State = db.Column(db.String(50), nullable=False)
    TotalQuantity = db.Column(db.Integer, nullable=False)
    EstimatedTime = db.Column(db.Integer, nullable=True)
    Notes = db.Column(db.String(500), nullable=True)
    SubTotal = db.Column(db.Numeric(18,2), nullable=False)
    Discount = db.Column(db.Numeric(18,2), nullable=False)
    Tax = db.Column(db.Numeric(18,2), nullable=False)
    Total = db.Column(db.Numeric(18,2), nullable=False)
    ClientName = db.Column(db.String(100), nullable=True)
    ordertype = db.relationship('OrderType')  

    def serialize(self):
        return {
            "OrderID": self.OrderID,
            "OrderTypeID": self.OrderTypeID,
            "Notes": self.Notes,
            "State": self.State,
            "TotalQuantity": self.TotalQuantity
        }
    
    def getAllOrders():
     #   all_orders = Order.query.order_by(Order.State).all()        .
        all_orders =  Order.query.order_by(db.case(
            [
                (Order.State == 'En Preparacion', 'En Preparacion'),
                (Order.State == 'Nueva', 'Nueva'),
                (Order.State == 'Esperando recolecta', 'Esperando recolecta'),
                (Order.State == 'Completada', 'Completada'),
                (Order.State == 'Cancelada', 'Cancelada'),
            ]
        )).all()

        all_orders = list(map(lambda x: x.serialize(), all_orders))
        return all_orders


class OrderDetail(db.Model):
    __tablename__ = 'orderdetail'
    OrderDetailID = db.Column(db.Integer, primary_key=True)
    OrderID = db.Column(db.Integer, db.ForeignKey("order.OrderID"), nullable=False)
    ProductID = db.Column(db.Integer, db.ForeignKey("product.ProductID"), nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    SubTotal = db.Column(db.Numeric(18,2), nullable=False)
    Discount = db.Column(db.Numeric(18,2), nullable=False)
    Tax = db.Column(db.Numeric(18,2), nullable=False)
    Total = db.Column(db.Numeric(18,2), nullable=False)
    order = db.relationship('Order')  
    product = db.relationship('Product')  

    def serialize(self):
        product_Detail = Product.query.filter_by(ProductID=self.ProductID).first()
        return {
            "Quantity": self.Quantity,
            "Product": product_Detail.Name
        }
    
    def getOrderDetail(id):
        order_detail = OrderDetail.query.filter_by(OrderID=id)
        order_detail = list(map(lambda x: x.serialize(), order_detail))
        order_detail = {
            "OrderID": id,
            "Products": order_detail
        }
        return order_detail
