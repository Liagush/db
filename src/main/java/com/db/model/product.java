package com.db.model;

import org.hibernate.annotations.Generated;

import javax.persistence.*;
import java.util.Locale;

@Entity
public class product {
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private long id;

    private String vendorCode;

    private String productName;

    @ManyToOne
    private categories categories;

    public categories getCategories() {
        return categories;
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
}