from django.core.management.base import BaseCommand
from core.models import Category, Subcategory, Product
from faker import Faker
import random
import os




class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **kwargs):
        # Initialize Faker
        fake = Faker()

    
        
        # Create categories if they don't exist
        category1, created = Category.objects.get_or_create(name='Furniture', defaults={'description': 'All kinds of furniture'})
        category2, created = Category.objects.get_or_create(name='Electronics', defaults={'description': 'Electronic items'})
        category2, created = Category.objects.get_or_create(name='Dress', defaults={'description': 'Electronic items'})
        
        # Create subcategories if they don't exist
        subcategory1, created = Subcategory.objects.get_or_create(name='Chairs', category=category1, defaults={'description': 'Various types of chairs'})
        subcategory2, created = Subcategory.objects.get_or_create(name='Tables', category=category1, defaults={'description': 'Various types of tables'})
        subcategory3, created = Subcategory.objects.get_or_create(name='TVs', category=category2, defaults={'description': 'Various types of TVs'})
        subcategory4, created = Subcategory.objects.get_or_create(name='Laptops', category=category2, defaults={'description': 'Various types of laptops'})
        
        # List of categories and subcategories for random assignment
        categories = [category1, category2]
        subcategories = [subcategory1, subcategory2, subcategory3, subcategory4]

        # Create 50 products with random data
        for _ in range(50):
            category = random.choice(categories)
            subcategory = random.choice(subcategories)
            product_name = fake.catch_phrase()
            description = fake.text()
            price = round(random.uniform(10.0, 1000.0), 2) # Should not Put 3 in place 2.
            quantity = random.randint(1, 100)
            rating = random.randint(1, 5)
            #print(subcategory.name)
            #print(created)

            

            
            Product.objects.create(
                category=category,
                subcategory=subcategory,
                name=product_name,
                description=description,
                price=price,
                quantity=quantity,
                rating=rating
            )
        
        self.stdout.write(self.style.SUCCESS('Database populated with 50 dummy products successfully'))
