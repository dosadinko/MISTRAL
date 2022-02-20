package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.MistralUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing MistralUser.
 */
public interface MistralUserService {

    /**
     * Save a mistralUser.
     *
     * @param mistralUserDTO the entity to save
     * @return the persisted entity
     */
    MistralUserDTO save(MistralUserDTO mistralUserDTO);

    /**
     * Get all the mistralUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MistralUserDTO> findAll(Pageable pageable);

    /**
     * Get the "id" mistralUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MistralUserDTO findOne(Long id);

    /**
     * Delete the "id" mistralUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
