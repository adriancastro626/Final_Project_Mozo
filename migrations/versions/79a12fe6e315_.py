"""empty message

<<<<<<< HEAD:migrations/versions/6863a4404094_.py
Revision ID: 6863a4404094
Revises: 
Create Date: 2021-05-06 23:37:37.826006
=======
Revision ID: 79a12fe6e315
Revises: 
Create Date: 2021-05-07 00:31:07.110522
>>>>>>> e20235f7c315188ae509165db7c94971e08d3e3e:migrations/versions/79a12fe6e315_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/6863a4404094_.py
revision = '6863a4404094'
=======
revision = '79a12fe6e315'
>>>>>>> e20235f7c315188ae509165db7c94971e08d3e3e:migrations/versions/79a12fe6e315_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('CategoryID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('CategoryID'),
    sa.UniqueConstraint('Name')
    )
    op.create_table('ordertype',
    sa.Column('OrderTypeID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(length=15), nullable=False),
    sa.PrimaryKeyConstraint('OrderTypeID'),
    sa.UniqueConstraint('Name')
    )
    op.create_table('usertypes',
    sa.Column('TypeID', sa.Integer(), nullable=False),
    sa.Column('Position', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('TypeID'),
    sa.UniqueConstraint('Position')
    )
    op.create_table('order',
    sa.Column('OrderID', sa.Integer(), nullable=False),
    sa.Column('OrderTypeID', sa.Integer(), nullable=False),
    sa.Column('OrderDate', sa.DateTime(), nullable=True),
    sa.Column('State', sa.String(length=50), nullable=False),
    sa.Column('TotalQuantity', sa.Integer(), nullable=False),
    sa.Column('EstimatedTime', sa.Integer(), nullable=True),
    sa.Column('Notes', sa.String(length=500), nullable=True),
    sa.Column('SubTotal', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Discount', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Tax', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Total', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('ClientName', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['OrderTypeID'], ['ordertype.OrderTypeID'], ),
    sa.PrimaryKeyConstraint('OrderID')
    )
    op.create_table('product',
    sa.Column('ProductID', sa.Integer(), nullable=False),
    sa.Column('CategoryID', sa.Integer(), nullable=True),
    sa.Column('Name', sa.String(length=100), nullable=False),
    sa.Column('Price', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Description', sa.String(length=300), nullable=True),
    sa.Column('ImageURL', sa.String(length=500), nullable=True),
    sa.Column('Available', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['CategoryID'], ['category.CategoryID'], ),
    sa.PrimaryKeyConstraint('ProductID')
    )
    op.create_table('user',
    sa.Column('UserID', sa.Integer(), nullable=False),
    sa.Column('UserName', sa.String(length=100), nullable=False),
    sa.Column('Email', sa.String(length=130), nullable=False),
    sa.Column('Password', sa.String(length=180), nullable=False),
    sa.Column('TypeID', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['TypeID'], ['usertypes.TypeID'], ),
    sa.PrimaryKeyConstraint('UserID'),
    sa.UniqueConstraint('Email'),
    sa.UniqueConstraint('UserName')
    )
    op.create_table('orderdetail',
    sa.Column('OrderDetailID', sa.Integer(), nullable=False),
    sa.Column('OrderID', sa.Integer(), nullable=False),
    sa.Column('ProductID', sa.Integer(), nullable=False),
    sa.Column('Quantity', sa.Integer(), nullable=False),
    sa.Column('SubTotal', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Discount', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Tax', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.Column('Total', sa.Numeric(precision=18, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['OrderID'], ['order.OrderID'], ),
    sa.ForeignKeyConstraint(['ProductID'], ['product.ProductID'], ),
    sa.PrimaryKeyConstraint('OrderDetailID')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orderdetail')
    op.drop_table('user')
    op.drop_table('product')
    op.drop_table('order')
    op.drop_table('usertypes')
    op.drop_table('ordertype')
    op.drop_table('category')
    # ### end Alembic commands ###
