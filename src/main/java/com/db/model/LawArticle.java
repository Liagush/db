package com.db.model;

import javax.persistence.*;

@Entity
public class LawArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String article;

    public LawArticle() {
    }

    @OneToOne
    private Law law;

    public LawArticle(String article) {
        this.article = article;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }
}
