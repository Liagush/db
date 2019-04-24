package com.db.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String category;

    @OneToMany
    private List<Product> Products;

    @ManyToMany
    private List<Law> laws;

    public List<Law> getLaws() {
        return laws;
    }

    public List<Product> getProducts() {
        return Products;
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
