package com.db.model;

public class LawArticle {
    public LawArticle() {
    }

    public LawArticle(String article) {
        this.article = article;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    private String article;
}
