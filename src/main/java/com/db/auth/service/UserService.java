package com.db.auth.service;

import com.db.auth.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);

    boolean activateUser(String code);
}
