package com.db.auth.web;

import com.db.auth.service.UserService;
import com.db.auth.model.User;
import com.db.auth.service.SecurityService;
import com.db.auth.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
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

    @PostMapping("/registration")
    public String registration(@ModelAttribute("user") User user, BindingResult bindingResult) {

        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return "registration";
        }

        userService.save(user);

        securityService.autoLogin(user.getUsername(), user.getPasswordConfirm());

        return "redirect:/main";
    }

    @GetMapping("/registration")
    public String displayRegistration(Map<String, Object> model) {
        model.put("user", new User());
        return "registration";
    }


    @GetMapping("/login")
    public String authenticate(Map<String, Object> model) {
        model.put("loginForm", new LoginForm());
        return "login";
    }

    @GetMapping("/")
    public String glitch() {

        return "glitch";
    }

    private class LoginForm {
        String username;
        String password;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }
}