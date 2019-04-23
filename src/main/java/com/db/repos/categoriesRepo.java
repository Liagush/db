package com.db.repos;

import com.db.model.categories;
import com.db.model.product;
import org.springframework.data.repository.CrudRepository;

public interface categoriesRepo extends CrudRepository<categories, Integer> {
}
