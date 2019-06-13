package com.db.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.TermVector;

import javax.persistence.*;
import java.util.List;

@Entity
@Indexed
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class LawArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Field(termVector = TermVector.YES)
    private String article;

    @ManyToOne
    private LawChapter lawChapter;

    @Field(termVector = TermVector.YES)
    private String lawText;

    @ManyToMany
    private List<Category> categories;

    public LawArticle() {
    }

    public LawArticle(LawChapter lawChapter, String article, String lawText, List<Category> categories) {
        this.article = article;
        this.lawChapter = lawChapter;
        this.lawText = lawText;
        this.categories = categories;
    }

    public String getLawText() {
        return lawText;
    }

    public void setLawText(String lawText) {
        this.lawText = lawText;
    }

    public int getId() {
        return id;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public LawChapter getLawChapter() {
        return lawChapter;
    }

    public void setLawChapter(LawChapter lawChapter) {
        this.lawChapter = lawChapter;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

}