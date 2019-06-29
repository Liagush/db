package com.db.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AutorizeController {

    @GetMapping("/")
    public String glitch() {

        return "glitch";
    }

    @GetMapping("/login")
    public String autorize() {

        return "autorize";
    }
}
