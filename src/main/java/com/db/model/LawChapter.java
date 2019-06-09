package com.db.model;

import javax.persistence.OneToMany;
import java.util.List;

public class LawChapter {
    public LawChapter() {
    }

    public LawChapter(String chapter) {
        this.chapter = chapter;
    }

    @OneToMany
    private List<LawArticle> lawArticleList ;

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }

    private String chapter;
}
