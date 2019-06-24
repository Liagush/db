package com.db.controllers;
import com.db.model.LawArticle;
import com.db.repos.LawArticleRepo;
import com.db.search.classes.HibernateSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
public class MainController {

    @Autowired
    private LawArticleRepo lawArticleRepo;

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
}
