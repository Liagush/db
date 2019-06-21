package com.db.controllers;

import com.db.search.classes.HibernateSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
public class SearchController {

    @Autowired
    private HibernateSearchService hibernateSearchService;


    @RequestMapping("/searchexample")
    public String search(String q, Map<String,Object> model) {

        if(q != null){
            List searchResults = hibernateSearchService.search(q);

            model.put("searchResults", searchResults);

        }

        return "searchexample";
    }
}
