package com.db.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Law {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String lawNumber;

    private String law;

    public Law() {
    }

    public Law(String lawNumber, String law, List<Category> categories) {
        this.lawNumber = lawNumber;
        this.law = law;
        this.categories = categories;
    }

    @ManyToMany
    private List<Category> categories;

    public List<Category> getCategories() {
        return categories;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLawNumber() {
        return lawNumber;
    }

    public void setLawNumber(String itemLaw) {
        this.lawNumber = itemLaw;
    }

    public String getLaw() {
        return law;
    }

    public void setLaw(String law) {
        this.law = law;
    }
}

