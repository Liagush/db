package com.db.repos;

import com.db.model.Category;
import com.db.model.Law;
import org.springframework.data.repository.CrudRepository;

public interface LawRepo extends CrudRepository<Law, Integer> {
    Iterable<Law> findByCategoryIdContains(Integer categoryId);
}
