package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserPermission;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the UserPermission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {
    List<UserPermission> findByUserId(Long userId);
}
