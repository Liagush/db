package com.db.model;

import com.db.search.interfaces.RenderableEntity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;
import org.hibernate.search.annotations.TermVector;

import javax.persistence.*;

@Entity
@Indexed
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Product implements RenderableEntity {

    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private long id;

    @Field(termVector = TermVector.YES)
    private String vendorCode;

    @Field(termVector = TermVector.YES)
    private String productName;

    public Product() {
    }

    public Product(String vendorCode, String productName, Category category) {
        this.vendorCode = vendorCode;
        this.productName = productName;
        this.category = category;
    }

    @IndexedEmbedded
    @ManyToOne
    private Category category;

    public Category getCategory() {
        return category;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    @Override
    public String getNum() {
        return this.vendorCode;
    }

    @Override
    public String getTitle() {
        return this.productName;
    }

    @Override
    public String getSnippet() {
        return this.category.getCategory();
    }

    public String getType() {
        return "product";
    }
}