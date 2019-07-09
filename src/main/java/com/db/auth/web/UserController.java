package com.db.auth.web;

import com.db.auth.service.MailSender;
import com.db.auth.service.UserService;
import com.db.auth.model.User;
import com.db.auth.service.SecurityService;
import com.db.auth.validator.UserValidator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Controller
public class UserController {
    @Autowired
    private MailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @PostMapping("/registration")
    public String registration(@ModelAttribute("user") User user, BindingResult bindingResult, Map<String, Object> model) {

        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return "registration";
        }

        userService.save(user);

        if(!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Здравствуйте, %s \n" +
                            "Чтобы завершить регистрацию, пожалйста перейдите по ссылке http://localhost:8080/activate/%s",
                    user.getUsername(),
                    user.getActivationCode()
            );

            mailSender.send(user.getEmail(), "Код активаций для HELPER", message);
        }

        return "redirect:/activationmessagepage";
    }

    @GetMapping("/registration")
    public String displayRegistration(Map<String, Object> model) {
        model.put("user", new User());
        return "registration";
    }

    @GetMapping("/activationmessagepage")
    public String activationMessagePage(Map<String, Object> model){

        model.put("message", "На вашу почту отправлено письмо с кодом активации.");
        return "activationmessagepage";
    }

    @GetMapping("/activate/{code}")
    public String activate (Map<String, Object> model, @PathVariable String code) {

        boolean isActivated = userService.activateUser(code);

        if(isActivated) {
            model.put("message", "Пользователь успешно зарегестрирован");
        } else {
            model.put("message", "Код активации не найден");
        }

        // securityService.autoLogin(user.getUsername(), user.getPasswordConfirm());

        return "login";
    }

    @GetMapping("/login")
    public String authenticate(Map<String, Object> model) {
        model.put("loginForm", new LoginForm());
        return "login";
    }

//    @PostMapping("/perform_login")
//    public boolean performLogin () {
//
//        return true;
//    }

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