package com.db.controllers;

import com.db.model.Category;
import com.db.model.LawArticle;
import com.db.model.LawChapter;
import com.db.model.Product;
import com.db.repos.CategoryRepo;
import com.db.repos.LawArticleRepo;
import com.db.repos.LawChapterRepo;
import com.db.repos.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class EditingController {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private LawChapterRepo lawChapterRepo;

    @Autowired
    private LawArticleRepo lawArticleRepo;

    @GetMapping("/editlaw")
    public String editlaw(@RequestParam(required = false) Optional<Integer> category, Map<String,Object> model) {

        if(!category.isPresent()) {
            Iterable<LawArticle> lawArticles = lawArticleRepo.findAll();
            model.put("lawArticles", lawArticles);
        } else {
            Optional<Category> cat = categoryRepo.findById(category.get());
            Iterable<LawArticle> lawsCategory = lawArticleRepo.findByCategoriesContains(cat.get());
            model.put("lawArticles", lawsCategory);
        }

        Iterable<Category> categories = categoryRepo.findAll();
        model.put("categories",categories);
        model.put("categoryId", category);

        Iterable<LawArticle> choiceOfLaw = lawArticleRepo.findAll();
        model.put("choiceOfLaw", choiceOfLaw);

        return "editlaw";
    }

    @PostMapping("/editlawform")
    public String editlawform(@RequestParam(required = false) String[] chapterOfLaw,
                              @RequestParam(required = false) String[] articleOfTheLaw,
                              @RequestParam(required = false) String[] textOfTheLaw,
                              @RequestParam(required = false) Integer[] articleLawSelect,
                              @RequestParam Integer[] categories,
                              Map<String,Object> model) {

        List<Category> lawCategories = new ArrayList<>();


        for (Integer category : categories) {
            Optional<Category> categoryId = categoryRepo.findById(category);
            if (categoryId.isPresent()){
                lawCategories.add(categoryId.get());
            }
        }

        if(chapterOfLaw != null) {
            for (int i = 0; i < chapterOfLaw.length; i++) {
                LawChapter lawChapter = new LawChapter();
                lawChapter.setChapter(chapterOfLaw[i]);
                lawChapterRepo.save(lawChapter);
                String lawArticle = articleOfTheLaw[i];
                String lawText = textOfTheLaw[i];
                LawArticle lawArticles = new LawArticle (lawChapter, lawArticle, lawText, lawCategories);
                lawArticleRepo.save(lawArticles);
            }
        }

        if (articleLawSelect != null) {
            for (Integer articleLaw : articleLawSelect) {

                Optional<LawArticle> lawArticleId = lawArticleRepo.findById(articleLaw);
                if (lawArticleId.isPresent()){
                    LawArticle lawArticle = lawArticleId.get();
                    List<Category> getAllArticles = lawArticle.getCategories();

                    for (Category category : getAllArticles)
                        lawCategories.add(category);
                    lawArticle.setCategories(lawCategories);
                    lawArticleRepo.save(lawArticle);
                }
            }
        }

        return "redirect:/editlaw";
    }

    @RequestMapping("/getlistchapterlaw")
    public @ResponseBody
    List<LawChapter> getSelectChapter() {

        Iterable<LawChapter> chapter = lawChapterRepo.findAll();
        List<LawChapter> lawChapter = StreamSupport.stream(chapter.spliterator(), false).collect(Collectors.toList());

        return lawChapter;
    }


    @RequestMapping("/getlistarticlelaw")
    public @ResponseBody List<LawArticle> getSelectArticle(Integer chapterLawSelect) {

        Optional<LawChapter> chapter = lawChapterRepo.findById(chapterLawSelect);
        List<LawArticle> lawArticle = new ArrayList<>();

        if (chapter.isPresent()) {

            lawArticle = chapter.get().getLawArticleList();
        }

        return lawArticle;
    }

    @RequestMapping("/getParagraphlaw")
    public @ResponseBody LawArticle getParagraphLaw (Integer articleLawSelect) {

        Optional<LawArticle> article = lawArticleRepo.findById(articleLawSelect);
        LawArticle paragraphLaw = null;
        if (article.isPresent()) {
            paragraphLaw = article.get();
        }

        return paragraphLaw;
    }

    @GetMapping("/productediting")
    public String productediting(Map<String,Object> model) {

        Iterable<Product> products = productRepo.findAll();
        Iterable<Category> categories = categoryRepo.findAll();
        model.put("categories",categories);
        model.put("products", products);
        return "productediting";
    }

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
