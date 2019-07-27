package com.db.auth.web;

import com.db.auth.model.Role;
import com.db.auth.model.Status;
import com.db.auth.repos.RoleRepo;
import com.db.auth.repos.StatusRepo;
import com.db.auth.repos.UserRepo;
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

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;


@Controller
public class UserController {
    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private StatusRepo statusRepo;

    @Autowired
    private UserRepo userRepo;

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

        return "redirect:/login_error";
    }

    @GetMapping("/registration")
    public String displayRegistration(Map<String, Object> model) {
        model.put("user", new User());
        return "registration";
    }

    @GetMapping("/login_error")
    public String login_error(Map<String, Object> model, @RequestParam(required = false) String error){

        if(error != null) {
            if(error.equals("disabled")) {

                model.put("message", "На вашу почту уже отправлено письмо с кодом активации. Пожалуйста активируйте аккаунт.");

            } else if(error.equals("blocked")) {

                model.put("message", "Ваш аккаунт заблокирован.");
            }

        } else {

            model.put("message", "На вашу почту отправлено письмо с кодом активации.");

        }

        return "login_error";
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

    @GetMapping("/adminpage")
    public String adminPage(Map<String,Object> model){

        model.put("statuslist", statusRepo.findAll());
        model.put("userlist", userRepo.findAll());
        model.put("allRoles", roleRepo.findAll());

        return "adminpage";
    }

    @GetMapping("/useredit/{user}")
    public String userEditForm (@PathVariable User user, Map<String,Object> model) {

        model.put("user", user);
        model.put("allRoles", roleRepo.findAll());

        return "useredit";
    }

    @PostMapping("/useredit/save_user")
    public String userSave (@RequestParam("userId") Long userId,
                            @RequestParam("role") List<Long> roles)
    {

        List<Role> allRoles = roleRepo.findAll();
        User user =  userRepo.findById(userId).get();

        for (Role role : allRoles) {
            if (roles.contains(role.getId())) {
                user.getRoles().add(role);
            } else {
                user.getRoles().remove(role);
            }
        }

        userRepo.save(user);

        return "redirect:/useredit/" + user.getId();
    }
}