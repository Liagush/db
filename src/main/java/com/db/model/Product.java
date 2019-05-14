package com.db.model;

import javax.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private long id;

    private String vendorCode;

    private String productName;

    public Product() {
    }

    public Product(String vendorCode, String productName, Category category) {
        this.vendorCode = vendorCode;
        this.productName = productName;
        this.category = category;
    }

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
}