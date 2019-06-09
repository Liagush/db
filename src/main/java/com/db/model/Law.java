package com.db.model;

import javax.persistence.*;
import java.util.List;

// Новый код
@Entity
public class Law {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    private LawChapter lawChapter;

    @OneToOne
    private LawArticle lawArticle;

    private String law;

    public Law() {
    }

    public Law(LawChapter lawChapter, LawArticle lawArticle, String law, List<Category> categories) {
        this.lawChapter = lawChapter;
        this.lawArticle = lawArticle;
        this.law = law;
        this.categories = categories;
    }

    @ManyToMany
    private List<Category> categories;

}


// рабочий старый код
/*@Entity
public class Law {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String lawChapter;

    private String lawNumber;

    private String law;

    public Law() {
    }

    public Law(String lawChapter, String lawNumber, String law, List<Category> categories) {
        this.lawChapter = lawChapter;
        this.lawNumber = lawNumber;
        this.law = law;
        this.categories = categories;
    }

    @ManyToMany
    private List<Category> categories;

    public List<Category> getCategories() {
        return categories;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLawNumber() {
        return lawNumber;
    }

    public void setLawNumber(String itemLaw) {
        this.lawNumber = itemLaw;
    }

    public String getLaw() {
        return law;
    }

    public void setLaw(String law) {
        this.law = law;
    }

    public String getLawChapter() {
        return lawChapter;
    }

    public void setLawChapter(String lawChapter) {
        this.lawChapter = lawChapter;
    }
}*/

