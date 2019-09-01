package com.db.controllers;
import com.db.model.Category;
import com.db.model.LawArticle;
import com.db.model.LawChapter;
import com.db.model.Product;
import com.db.repos.CategoryRepo;
import com.db.repos.LawArticleRepo;
import com.db.repos.LawChapterRepo;
import com.db.repos.ProductRepo;
import com.db.search.classes.HibernateSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class MainController {

    @Autowired
    private LawArticleRepo lawArticleRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private LawChapterRepo lawChapterRepo;

    @Autowired
    private HibernateSearchService hibernateSearchService;

    @GetMapping("/main")
    public String main(String q, Map<String,Object> model) {

        Iterable<LawArticle> listOfLaws = lawArticleRepo.findAll();
        model.put("listOfLaws", listOfLaws);

        if(q != null) {
            List searchResults = hibernateSearchService.search(q);
            model.put("searchResults", searchResults);
        }

        return "main";
    }


    @RequestMapping("/getlistarticlelawOfReceivedCategory")
    public @ResponseBody
    List<LawArticle> getChapterOfReceivedCategory(Long idProduct, Map<String,Object> model) {

        Optional<Product> product = productRepo.findById(idProduct);
        Category receivedCategory = product.get().getCategory();
        Iterable<LawArticle> lawsArticlesItr = lawArticleRepo.findByCategoriesContains(receivedCategory);
        List<LawArticle> lawsArticles = StreamSupport.stream(lawsArticlesItr.spliterator(), false).collect(Collectors.toList());
        model.put("lawArticles", lawsArticles);
        return lawsArticles;
    }
}
