package com.db.controllers;
import com.db.model.LawArticle;
import com.db.repos.LawArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class MainController {

    @Autowired
    private LawArticleRepo lawArticleRepo;

    @GetMapping("/main")
    public String main(Map<String,Object> model) {

        Iterable<LawArticle> listOfLaws = lawArticleRepo.findAll();
        model.put("listOfLaws", listOfLaws);

        return "main";
    }

}
