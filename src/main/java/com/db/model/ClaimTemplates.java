package com.db.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
public class ClaimTemplates {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Type(type="text")
    private String filepath;

    private String filename;

    public int getId() {
        return id;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

}
