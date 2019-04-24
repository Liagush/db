package com.db.repos;

import com.db.model.Category;
import com.db.model.Law;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepo extends CrudRepository<Category, Integer> {
    Iterable<Category> findByLawsContains(Law law);
}
