package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.UserPermissionService;
import com.mycompany.myapp.domain.UserPermission;
import com.mycompany.myapp.repository.UserPermissionRepository;
import com.mycompany.myapp.service.dto.UserPermissionDTO;
import com.mycompany.myapp.service.mapper.UserPermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserPermission.
 */
@Service
@Transactional
public class UserPermissionServiceImpl implements UserPermissionService {

    private final Logger log = LoggerFactory.getLogger(UserPermissionServiceImpl.class);

    private final UserPermissionRepository userPermissionRepository;

    private final UserPermissionMapper userPermissionMapper;

    public UserPermissionServiceImpl(UserPermissionRepository userPermissionRepository, UserPermissionMapper userPermissionMapper) {
        this.userPermissionRepository = userPermissionRepository;
        this.userPermissionMapper = userPermissionMapper;
    }

    /**
     * Save a userPermission.
     *
     * @param userPermissionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserPermissionDTO save(UserPermissionDTO userPermissionDTO) {
        log.debug("Request to save UserPermission : {}", userPermissionDTO);
        UserPermission userPermission = userPermissionMapper.toEntity(userPermissionDTO);
        userPermission = userPermissionRepository.save(userPermission);
        return userPermissionMapper.toDto(userPermission);
    }

    /**
     * Get all the userPermissions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserPermissionDTO> findAll() {
        log.debug("Request to get all UserPermissions");
        return userPermissionRepository.findAll().stream()
            .map(userPermissionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userPermission by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserPermissionDTO findOne(Long id) {
        log.debug("Request to get UserPermission : {}", id);
        UserPermission userPermission = userPermissionRepository.findOne(id);
        return userPermissionMapper.toDto(userPermission);
    }

    /**
     * Delete the userPermission by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserPermission : {}", id);
        userPermissionRepository.delete(id);
    }
}
