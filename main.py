from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

# Initialize database with mock data
@app.before_first_request
def create_tables():
    db.create_all()
    if not Product.query.first():
        mock_products = [
            Product(name='Laptop', description='High performance laptop', price=999.99, stock=50),
            # Add more mock products here
        ]
        db.session.bulk_save_objects(mock_products)
        db.session.commit()

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    try:
        products = Product.query.filter(Product.name.contains(query)).all()
        results = [{'id': p.id, 'name': p.name, 'description': p.description, 'price': p.price, 'stock': p.stock} for p in products]
        return jsonify(results)
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
