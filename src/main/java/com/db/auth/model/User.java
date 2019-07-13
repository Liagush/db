package com.db.auth.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String activationCode;
    private String username;
    private String password;
    private boolean loginAllowed;
    private boolean online;
    private Long dateOfRegistration;

    @Transient
    private String passwordConfirm;

    @ManyToMany
    private Set<Role> roles;

    @ManyToOne
    private Status status;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public boolean isLoginAllowed() {
        return loginAllowed;
    }

    public void setLoginAllowed(boolean loginAllowed) {
        this.loginAllowed = loginAllowed;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public String getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(String activationCode) {
        this.activationCode = activationCode;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public Long getDateOfRegistration() {
        return dateOfRegistration;
    }

    public void setDateOfRegistration(Long dateOfRegistration) {
        this.dateOfRegistration = dateOfRegistration;
    }


}
