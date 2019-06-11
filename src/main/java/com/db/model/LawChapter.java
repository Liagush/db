package com.db.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.TermVector;

import javax.persistence.*;
import java.util.List;

@Entity
@Indexed
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class LawChapter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Field(termVector = TermVector.YES)
    private String chapter;

    @OneToMany(mappedBy = "lawChapter")
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
