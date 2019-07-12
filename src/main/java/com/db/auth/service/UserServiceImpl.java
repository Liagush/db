package com.db.auth.service;

import com.db.auth.model.Role;
import com.db.auth.model.User;
import com.db.auth.repos.RoleRepo;
import com.db.auth.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(roleRepo.findByName("USER"));

        // Код регистрации
        user.setActivationCode(UUID.randomUUID().toString());

        // Дата регистрации
//        LocalDate date = LocalDate.now ();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MMM/yyyy");
//        String text = date.format (formatter);
//        LocalDate parsedDate = LocalDate.parse(text, formatter);
        //user.setDateOfRegistration(java.sql.Date.valueOf(parsedDate));

        user.setDateOfRegistration(LocalDate.now().atStartOfDay().toInstant(ZoneOffset.UTC).getEpochSecond());

        user.setLoginAllowed(true);

        userRepo.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public boolean activateUser(String code) {
        User user = userRepo.findByActivationCode(code);

        if(user == null){
            return false;
        }

        user.setActivationCode(null);

        userRepo.save(user);

        return true;
    }
}
