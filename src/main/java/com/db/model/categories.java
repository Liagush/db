package com.db.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class categories {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String category;

    @OneToMany
    private List<product> products;

    public List<product> getProducts() {
        return products;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
