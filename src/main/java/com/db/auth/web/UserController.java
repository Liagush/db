package com.db.auth.web;

import com.db.auth.repos.UserRepo;
import com.db.auth.service.UserService;
import com.db.auth.model.User;
import com.db.auth.service.SecurityService;
import com.db.auth.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @PostMapping("registration")
    public String registration(@ModelAttribute("regForm") User regForm, Map<String, Object> model, BindingResult bindingResult) {
        userValidator.validate(regForm, bindingResult);

        userService.save(regForm);

        securityService.autoLogin(regForm.getUsername(), regForm.getPasswordConfirm());

        return "main";
    }

    @PostMapping("login")
    public String autorize(User user, Map<String, Object> model) {

        return "main";
    }

    @GetMapping("/login")
    public String autorize() {

        return "login";
    }

    @GetMapping("/")
    public String glitch() {

        return "glitch";
    }
}