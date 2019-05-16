package com.db.controllers;

import com.db.model.Category;
import com.db.model.Product;
import com.db.repos.CategoryRepo;
import com.db.repos.LawRepo;
import com.db.repos.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class MainController {
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private LawRepo lawRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

    @GetMapping("/editlaw")
    public String editlaw() {
        return "editlaw";
    }

    @GetMapping("/productediting")
    public String productediting(Map<String,Object> model) {

        Iterable<Product> products = productRepo.findAll();
        Iterable<Category> categories = categoryRepo.findAll();
        model.put("categories",categories);
        model.put("products", products);
        return "productediting";
    }

    @PostMapping("productEditing")
    public String productEditing(@RequestParam String vendorCode, @RequestParam String productName, @RequestParam String category, Map<String,Object> model) {
        Category cat = new Category();
        cat.setCategory(category);
        Product products = new Product (vendorCode, productName, cat);
        productRepo.save(products);
        Category categorySaveDB = new Category();
        categorySaveDB.setCategory(category);
        categoryRepo.save(categorySaveDB);
        return "productediting";
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/product/{vendorCode}/category")
    public String main(@PathVariable String vendorCode, Model model) {
        Product product = productRepo.findOneByVendorCode(vendorCode);
        Category category = product.getCategory();
        model.addAttribute("category", category);
        return "main";
    }
}
