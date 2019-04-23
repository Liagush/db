package com.db.repos;

import com.db.model.categories;
import com.db.model.laws;
import org.springframework.data.repository.CrudRepository;

public interface lawsRepo extends CrudRepository<laws, Integer> {
}
