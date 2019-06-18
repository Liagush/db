package com.db.model;

import org.hibernate.search.annotations.*;

import javax.persistence.*;
import javax.persistence.Index;
import java.util.List;

@Entity
@Indexed
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Field(termVector = TermVector.YES)
    private String category;

    @OneToMany
    private List<Product> Products;

    @ManyToMany
    private List<LawArticle> lawArticles;

    public int getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Product> getProducts() {
        return Products;
    }

    public void setProducts(List<Product> products) {
        Products = products;
    }

    public List<LawArticle> getLawArticles() {
        return lawArticles;
    }

    public void setLawArticles(List<LawArticle> lawArticles) {
        this.lawArticles = lawArticles;
    }
}
