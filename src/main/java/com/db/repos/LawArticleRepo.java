package com.db.repos;

import com.db.model.Category;
import com.db.model.LawArticle;
import org.springframework.data.repository.CrudRepository;

public interface LawArticleRepo extends CrudRepository<LawArticle, Integer> {
    Iterable<LawArticle> findByCategoriesContains(Category category);
}
