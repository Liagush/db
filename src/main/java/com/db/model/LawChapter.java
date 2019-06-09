package com.db.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class LawChapter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String chapter;

    @OneToOne
    private Law law;

    public LawChapter() {
    }

    public LawChapter(String chapter) {
        this.chapter = chapter;
    }

    @OneToMany
    private List<LawArticle> lawArticleList ;

    public int getId() {
        return id;
    }

    public List<LawArticle> getLawArticleList() {
        return lawArticleList;
    }

    public void setLawArticleList(List<LawArticle> lawArticleList) {
        this.lawArticleList = lawArticleList;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }
}
