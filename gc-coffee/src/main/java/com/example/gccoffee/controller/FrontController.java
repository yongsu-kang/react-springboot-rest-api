package com.example.gccoffee.controller;

import com.example.gccoffee.model.Product;
import com.example.gccoffee.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

//관리자가 접속하기 위한 뷰를 반환해주는 컨트롤러
@Controller
public class FrontController {

    private final ProductService productService;

    public FrontController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public String productsPage(Model model) {
        List<Product> products = productService.getAllProduct();
        model.addAttribute("products", products);
        return "product-list";
    }

    @GetMapping("new-product")
    public String newProductPage() {
        return "new-product";
    }

    @PostMapping("/products")
    public String newProduct(CreateProductRequest createProductReqeust) {
        productService.createProduct(createProductReqeust.productName(), createProductReqeust.category(), createProductReqeust.price(), createProductReqeust.description());
        return "redirect:/products";
    }
}
