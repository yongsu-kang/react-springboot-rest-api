package com.example.gccoffee.service;

import com.example.gccoffee.model.Category;
import com.example.gccoffee.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProductsByCategory(Category category);

    List<Product> getAllProduct();

    Product createProduct(String productName, Category category, Long price);

    Product createProduct(String productName, Category category, Long price, String description);

}
