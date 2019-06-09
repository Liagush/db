package com.db.repos;

import com.db.model.Category;
import com.db.model.Law;
import com.db.model.LawArticle;
import com.db.model.LawChapter;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LawRepo extends CrudRepository<Law, Integer> {
    Iterable<Law> findByCategoriesContains(Category category);
}
