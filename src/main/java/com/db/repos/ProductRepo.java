package com.db.repos;

import com.db.model.Category;
import com.db.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Long> {
    Iterable<Product> findByCategory(Category category);
    Product findOneByVendorCode(String vendorCode);
}
