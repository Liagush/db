package com.db.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class LawChapter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String chapter;

    @OneToMany
    private List<LawArticle> lawArticleList;

    public LawChapter() {
    }

    public LawChapter(String chapter, List<LawArticle> lawArticleList) {
        this.chapter = chapter;
        this.lawArticleList = lawArticleList;
    }

    public int getId() {
        return id;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }

    public List<LawArticle> getLawArticleList() {
        return lawArticleList;
    }

    public void setLawArticleList(List<LawArticle> lawArticleList) {
        this.lawArticleList = lawArticleList;
    }
}
