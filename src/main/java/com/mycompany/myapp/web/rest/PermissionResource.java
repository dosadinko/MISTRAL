package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.PermissionService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.PermissionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Permission.
 */
@RestController
@RequestMapping("/api")
public class PermissionResource {

    private final Logger log = LoggerFactory.getLogger(PermissionResource.class);

    private static final String ENTITY_NAME = "permission";

    private final PermissionService permissionService;

    public PermissionResource(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    /**
     * POST  /permissions : Create a new permission.
     *
     * @param permissionDTO the permissionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new permissionDTO, or with status 400 (Bad Request) if the permission has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/permissions")
    @Timed
    public ResponseEntity<PermissionDTO> createPermission(@RequestBody PermissionDTO permissionDTO) throws URISyntaxException {
        log.debug("REST request to save Permission : {}", permissionDTO);
        if (permissionDTO.getId() != null) {
            throw new BadRequestAlertException("A new permission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PermissionDTO result = permissionService.save(permissionDTO);
        return ResponseEntity.created(new URI("/api/permissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /permissions : Updates an existing permission.
     *
     * @param permissionDTO the permissionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated permissionDTO,
     * or with status 400 (Bad Request) if the permissionDTO is not valid,
     * or with status 500 (Internal Server Error) if the permissionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/permissions")
    @Timed
    public ResponseEntity<PermissionDTO> updatePermission(@RequestBody PermissionDTO permissionDTO) throws URISyntaxException {
        log.debug("REST request to update Permission : {}", permissionDTO);
        if (permissionDTO.getId() == null) {
            return createPermission(permissionDTO);
        }
        PermissionDTO result = permissionService.save(permissionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, permissionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /permissions : get all the permissions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of permissions in body
     */
    @GetMapping("/permissions")
    @Timed
    public List<PermissionDTO> getAllPermissions() {
        log.debug("REST request to get all Permissions");
        return permissionService.findAll();
        }

    /**
     * GET  /permissions/:id : get the "id" permission.
     *
     * @param id the id of the permissionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the permissionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/permissions/{id}")
    @Timed
    public ResponseEntity<PermissionDTO> getPermission(@PathVariable Long id) {
        log.debug("REST request to get Permission : {}", id);
        PermissionDTO permissionDTO = permissionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(permissionDTO));
    }

    /**
     * DELETE  /permissions/:id : delete the "id" permission.
     *
     * @param id the id of the permissionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/permissions/{id}")
    @Timed
    public ResponseEntity<Void> deletePermission(@PathVariable Long id) {
        log.debug("REST request to delete Permission : {}", id);
        permissionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
