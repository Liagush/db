package com.db.controllers;

import com.db.model.Category;
import com.db.model.Law;
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
    public String editlaw(@RequestParam Integer categoryId, Map<String,Object> model) {

        if(categoryId == null ) {
            Iterable<Law> laws = lawRepo.findAll();
            model.put("laws", laws);
        } else {
            Iterable<Law> lawsCategory = lawRepo.findByCategoryIdContains(categoryId);
            model.put("laws", lawsCategory);
        }

        Iterable<Category> categories = categoryRepo.findAll();
        model.put("categories",categories);
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
    public String productEditing(@RequestParam String[] vendorCode, @RequestParam String[] productName, @RequestParam String category,  Map<String,Object> model) {
        Category cat = new Category();
        cat.setCategory(category);
        categoryRepo.save(cat);
        for (int i = 0; i < vendorCode.length; i++) {
            String VendorCode = vendorCode[i];
            String ProductName = productName[i];
            Product products = new Product (VendorCode, ProductName, cat);
            productRepo.save(products);
        }
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
