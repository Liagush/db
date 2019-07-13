package com.db.auth.repos;

import com.db.auth.model.Status;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepo extends CrudRepository<Status, Long> {
}
