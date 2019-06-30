package com.db.controllers;
import com.db.auth.model.User;
import com.db.auth.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;

@Controller
public class AutorizeController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/")
    public String glitch() {

        return "glitch";
    }

    @GetMapping("/login")
    public String autorize() {

        return "autorize";
    }

    @PostMapping("registration")
    public String addUser (User user, Map<String, Object> model) {

        User userFromDb = userRepo.findByEmail(user.getEmail());

        if(userFromDb != null) {
            model.put("message", "Такой пользователь уже существует.");
            return "autorize";
        } else {

        }

        return "redirect:/login";
    }


}
