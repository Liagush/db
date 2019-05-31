package com.db.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Law {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String itemLaw;

    private String law;

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

    public String getItemLaw() {
        return itemLaw;
    }

    public void setItemLaw(String itemLaw) {
        this.itemLaw = itemLaw;
    }

    public String getLaw() {
        return law;
    }

    public void setLaw(String law) {
        this.law = law;
    }
}

