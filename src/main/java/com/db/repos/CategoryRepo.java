package com.db.repos;

import com.db.model.Category;
import com.db.model.LawArticle;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepo extends CrudRepository<Category, Integer> {
    Iterable<Category> findByLawArticlesContains(LawArticle lawArticle);
}
