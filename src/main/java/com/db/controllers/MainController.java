package com.db.controllers;
import com.db.model.*;
import com.db.repos.*;
import com.db.search.classes.HibernateSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private ClaimTemplatesRepo claimTemplatesRepo;

    @GetMapping("/main")
    public String main(String q, Map<String,Object> model) {

        Iterable<LawArticle> listOfLaws = lawArticleRepo.findAll();
        model.put("listOfLaws", listOfLaws);

        if(q != null) {
            List searchResults = hibernateSearchService.search(q);
            model.put("searchResults", searchResults);
        }

        Iterable<ClaimTemplates> claimTemplates = claimTemplatesRepo.findAll();
        model.put("claimTemplates", claimTemplates);

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


    @RequestMapping("/getLawItem")
    public @ResponseBody
    LawArticle getLawItem (Integer idArticle, Map<String,Object> model) {

        LawArticle lawArticle = lawArticleRepo.findById(idArticle).get();
        model.put("lawArticles", lawArticle);

        return lawArticle;
    }








//    @Autowired
//    private ClaimTemplatesRepo claimTemplatesRepo;
//
//    @Value("${upload.path}")
//    private String uploadPath;
//
//    @GetMapping("/editfiletemplates")
//    public String editFileTemplates (Map<String,Object> model) {
//
//        Iterable<ClaimTemplates> claimTemplatesList = claimTemplatesRepo.findAll();
//        model.put("claimTemplatesList", claimTemplatesList);
//
//        return "editfiletemplates";
//    }
//
//    @PostMapping("deletefiletemplate")
//    public String deleteFileTemplate(@RequestParam List<Integer> claimTemplate) {
//
//
//        for (Integer item : claimTemplate) {
//            if(claimTemplatesRepo.existsById(item)){
//                claimTemplatesRepo.deleteById(item);
//            }
//        }
//
//        return "redirect:/editfiletemplates";
//    }



}
