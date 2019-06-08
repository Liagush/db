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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public String editlaw(@RequestParam (required = false) Optional<Integer> category, Map<String,Object> model) {

        if(!category.isPresent()) {
            Iterable<Law> laws = lawRepo.findAll();
            model.put("laws", laws);
        } else {
            Optional<Category> cat = categoryRepo.findById(category.get());
            Iterable<Law> lawsCategory = lawRepo.findByCategoriesContains(cat.get());
            model.put("laws", lawsCategory);
        }

        Iterable<Category> categories = categoryRepo.findAll();
        model.put("categories",categories);
        model.put("categoryId", category);
        return "editlaw";
    }

    @PostMapping("/editlawform")
    public String editlawform(@RequestParam String[] headOfLaw, @RequestParam String[] articleOfTheLaw, @RequestParam Integer[] categories,  Map<String,Object> model) {

        List<Category> lawCategories = new ArrayList<>();

        for (Integer category : categories) {
            Optional<Category> categoryId = categoryRepo.findById(category);
            if (categoryId.isPresent()){
                lawCategories.add(categoryId.get());
            }
        }

        /*for (String categoryTitle : categories) {
            Category cat = new Category();
            cat.setCategory(categoryTitle);
            categoryRepo.save(cat);
            lawCategories.add(cat);
        }*/

        for (int i = 0; i < headOfLaw.length; i++) {
            String head = headOfLaw[i];
            String article = articleOfTheLaw[i];
            Law laws = new Law (head, article, lawCategories);
            lawRepo.save(laws);
        }

        return "redirect:/editlaw";
    }


    @GetMapping("/productediting")
    public String productediting(Map<String,Object> model) {

        Iterable<Product> products = productRepo.findAll();
        Iterable<Category> categories = categoryRepo.findAll();
        model.put("categories",categories);
        model.put("products", products);
        return "productediting";
    }

    /*@PostMapping("producteditingform")
    public String producteditingform(@RequestParam String[] vendorCode, @RequestParam String[] productName, @RequestParam (required = false) Optional<String> categoryName, @RequestParam (required = false) Optional<Integer> categoryId,  Map<String,Object> model) {
        Category cat = new Category();
        if(categoryName.isPresent()) {
            cat.setCategory(categoryName.get());
            categoryRepo.save(cat);
        } else {
            if (categoryId.isPresent()) {
                Optional<Category> catOfBd = categoryRepo.findById(categoryId.get());
                cat = catOfBd.get();
            }
        }

        for (int i = 0; i < vendorCode.length; i++) {
            String VendorCode = vendorCode[i];
            String ProductName = productName[i];
            Product products = new Product (VendorCode, ProductName, cat);
            productRepo.save(products);
        }
        return "redirect:/productediting";
    }*/

    @PostMapping("producteditingform")
    public String producteditingform(@RequestParam String[] vendorCode, @RequestParam String[] productName, @RequestParam (required = false) Optional<String> categoryName, @RequestParam (required = false) Optional<Integer> categoryId,  Map<String,Object> model) {
        Category cat = getOrCreateCategory(categoryName, categoryId);

        for (int i = 0; i < vendorCode.length; i++) {
            String VendorCode = vendorCode[i];
            String ProductName = productName[i];
            Product products = new Product (VendorCode, ProductName, cat);
            productRepo.save(products);
        }
        return "redirect:/productediting";
    }

    private Category getOrCreateCategory(@RequestParam(required = false) Optional<String> categoryName, @RequestParam(required = false) Optional<Integer> categoryId) {
        if (categoryId.isPresent()) {
            Optional<Category> existCategory = categoryRepo.findById(categoryId.get());
            if (existCategory.isPresent()) {
                return existCategory.get();
            }
        }
        if(categoryName.isPresent()) {
            Category cat = new Category();
            cat.setCategory(categoryName.get());
            categoryRepo.save(cat);
            return cat;
        }
        throw new RuntimeException("categoryId either categoryName should be set");
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
