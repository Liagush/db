package com.db.auth.repos;

import com.db.auth.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Set;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Set<Role> findByName(String user);
}
