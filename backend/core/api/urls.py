from django.urls import path
from . import views

urlpatterns = [
    # path('', views.apiOverview, name='apiOverview'),
    path('product-list/', views.ShowAll, name='product-list'),
    path('product-detail/<int:pk>/', views.ViewProduct, name='product-detail'),
    path('product-create/', views.CreateProduct, name='product-create'),
    path('product-update/<int:pk>/', views.updateProduct, name='product-update'),
    path('product-delete/<int:pk>/', views.deleteProduct, name='product-delete'),
    path('products-search/', views.SearchProduct, name='product-search'),
    path('show-all-categories-and-subcategories/', views.ShowAllCategoriesAndSubcategories, name='show-all-categories-and-subcategories'),
    path('orders/', views.create_order, name='create_order'),
    path('send-mail/', views.SendMail, name='send-mail')

]