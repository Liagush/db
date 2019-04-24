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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

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

    @GetMapping("/product/{vendorCode}/categories")
    public String main(@PathVariable String vendorCode, Model model) {
        Product products = productRepo.findByVendorCode(vendorCode).get();
        model.addAttribute("products", products);
        List<Category> categories = products.getCategories();
        model.addAttribute("categories", categories);

        Iterable<Category> categoriesFromRepo = categoryRepo.findByLawsContains(products);
        model.addAttribute("categories", findByLawsContains);
        model.addAttribute("categories", categoryRepo);
        return "main";
    }

}
