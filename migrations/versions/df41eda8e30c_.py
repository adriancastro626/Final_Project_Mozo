"""empty message

Revision ID: df41eda8e30c
Revises: 7200c295bff9
Create Date: 2021-04-28 01:04:52.228589

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df41eda8e30c'
down_revision = '7200c295bff9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'TypeID',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'TypeID',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
