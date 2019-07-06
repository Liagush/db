package com.db.controllers;

import com.db.auth.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class AutorizeController {

    @Autowired
    private UserRepo userRepo;

}
