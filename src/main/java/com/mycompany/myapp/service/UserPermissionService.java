package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.UserPermissionDTO;
import java.util.List;

/**
 * Service Interface for managing UserPermission.
 */
public interface UserPermissionService {

    /**
     * Save a userPermission.
     *
     * @param userPermissionDTO the entity to save
     * @return the persisted entity
     */
    UserPermissionDTO save(UserPermissionDTO userPermissionDTO);

    /**
     * Get all the userPermissions.
     *
     * @return the list of entities
     */
    List<UserPermissionDTO> findAll();

    /**
     * Get the "id" userPermission.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserPermissionDTO findOne(Long id);

    /**
     * Delete the "id" userPermission.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
