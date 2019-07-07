package com.db.auth.service;

import com.db.auth.model.User;
import com.db.auth.repos.RoleRepo;
import com.db.auth.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

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
        user.setRoles(new HashSet<>(roleRepo.findAll()));
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
