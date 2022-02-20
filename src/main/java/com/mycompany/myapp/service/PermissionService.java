package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.PermissionDTO;
import java.util.List;

/**
 * Service Interface for managing Permission.
 */
public interface PermissionService {

    /**
     * Save a permission.
     *
     * @param permissionDTO the entity to save
     * @return the persisted entity
     */
    PermissionDTO save(PermissionDTO permissionDTO);

    /**
     * Get all the permissions.
     *
     * @return the list of entities
     */
    List<PermissionDTO> findAll();

    /**
     * Get the "id" permission.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PermissionDTO findOne(Long id);

    /**
     * Delete the "id" permission.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
