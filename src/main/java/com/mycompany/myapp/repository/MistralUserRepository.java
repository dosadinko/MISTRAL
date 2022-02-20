package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MistralUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MistralUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MistralUserRepository extends JpaRepository<MistralUser, Long> {

}
