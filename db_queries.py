# -*- coding: utf-8 -*-
"""
Playing around with new parle database

Created on Sun Jul 31 17:08:47 2016

@author: Shay Neufeld
"""

from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import mapper, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
 
dbPath = './test.db'
engine = create_engine('sqlite:///%s' % dbPath, echo=False)
Base = declarative_base(engine)
    
class Member(Base):
    __tablename__ = 'Member'
    __table_args__ = {'autoload':True} 
 
#----------------------------------------------------------------------
 
def loadSession():
    """"""     
    metadata = Base.metadata
    Session = sessionmaker(bind=engine)
    session = Session()
    return session
 
if __name__ == "__main__":
    session = loadSession()
    first_names = session.query(Member.first_name).all()
    last_names = session.query(Member.id).order_by(Member.id)
    for row in last_names:
        print(row)
        print()
        

