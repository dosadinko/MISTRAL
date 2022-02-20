package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.UserPermissionService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.UserPermissionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

import com.mycompany.myapp.repository.UserPermissionRepository;
import com.mycompany.myapp.service.mapper.UserPermissionMapper;
/**
 * REST controller for managing UserPermission.
 */
@RestController
@RequestMapping("/api")
public class UserPermissionResource {

    private final Logger log = LoggerFactory.getLogger(UserPermissionResource.class);

    private static final String ENTITY_NAME = "userPermission";

    private final UserPermissionService userPermissionService;

    private final UserPermissionRepository userPermissionRepository;

    private final UserPermissionMapper userPermissionMapper;

    public UserPermissionResource(UserPermissionService userPermissionService,
                                  UserPermissionRepository userPermissionRepository,
                                  UserPermissionMapper userPermissionMapper) {
        this.userPermissionService = userPermissionService;
        this.userPermissionRepository = userPermissionRepository;
        this.userPermissionMapper = userPermissionMapper;
    }

    /**
     * POST  /user-permissions : Create a new userPermission.
     *
     * @param userPermissionDTO the userPermissionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userPermissionDTO, or with status 400 (Bad Request) if the userPermission has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-permissions")
    @Timed
    public ResponseEntity<UserPermissionDTO> createUserPermission(@RequestBody UserPermissionDTO userPermissionDTO) throws URISyntaxException {
        log.debug("REST request to save UserPermission : {}", userPermissionDTO);
        if (userPermissionDTO.getId() != null) {
            throw new BadRequestAlertException("A new userPermission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserPermissionDTO result = userPermissionService.save(userPermissionDTO);
        return ResponseEntity.created(new URI("/api/user-permissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-permissions : Updates an existing userPermission.
     *
     * @param userPermissionDTO the userPermissionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userPermissionDTO,
     * or with status 400 (Bad Request) if the userPermissionDTO is not valid,
     * or with status 500 (Internal Server Error) if the userPermissionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-permissions")
    @Timed
    public ResponseEntity<UserPermissionDTO> updateUserPermission(@RequestBody UserPermissionDTO userPermissionDTO) throws URISyntaxException {
        log.debug("REST request to update UserPermission : {}", userPermissionDTO);
        if (userPermissionDTO.getId() == null) {
            return createUserPermission(userPermissionDTO);
        }
        UserPermissionDTO result = userPermissionService.save(userPermissionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userPermissionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-permissions : get all the userPermissions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userPermissions in body
     */
    @GetMapping("/user-permissions")
    @Timed
    public List<UserPermissionDTO> getAllUserPermissions() {
        log.debug("REST request to get all UserPermissions");
        return userPermissionService.findAll();
        }

    /**
     * GET  /user-permissions/:id : get the "id" userPermission.
     *
     * @param id the id of the userPermissionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userPermissionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-permissions/{id}")
    @Timed
    public ResponseEntity<UserPermissionDTO> getUserPermission(@PathVariable Long id) {
        log.debug("REST request to get UserPermission : {}", id);
        UserPermissionDTO userPermissionDTO = userPermissionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userPermissionDTO));
    }

    /**
     * GET  /user-permissions/user/:id : get the "id" userPermission.
     *
     * @param id the id of the user for permissions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userPermissionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-permissions/user/{id}")
    @Timed
    public List<UserPermissionDTO> getPermissionsPerUser(@PathVariable Long id) {
        log.debug("REST request to get UserPermission : {}", id);

        return userPermissionMapper.toDto(userPermissionRepository.findByUserId(id));
    }

    /**
     * DELETE  /user-permissions/:id : delete the "id" userPermission.
     *
     * @param id the id of the userPermissionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-permissions/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserPermission(@PathVariable Long id) {
        log.debug("REST request to delete UserPermission : {}", id);
        userPermissionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
