package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.MistralUserService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.MistralUserDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MistralUser.
 */
@RestController
@RequestMapping("/api")
public class MistralUserResource {

    private final Logger log = LoggerFactory.getLogger(MistralUserResource.class);

    private static final String ENTITY_NAME = "mistralUser";

    private final MistralUserService mistralUserService;

    public MistralUserResource(MistralUserService mistralUserService) {
        this.mistralUserService = mistralUserService;
    }

    /**
     * POST  /mistral-users : Create a new mistralUser.
     *
     * @param mistralUserDTO the mistralUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mistralUserDTO, or with status 400 (Bad Request) if the mistralUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mistral-users")
    @Timed
    public ResponseEntity<MistralUserDTO> createMistralUser(@RequestBody MistralUserDTO mistralUserDTO) throws URISyntaxException {
        log.debug("REST request to save MistralUser : {}", mistralUserDTO);
        if (mistralUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new mistralUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MistralUserDTO result = mistralUserService.save(mistralUserDTO);
        return ResponseEntity.created(new URI("/api/mistral-users/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /mistral-users : Updates an existing mistralUser.
     *
     * @param mistralUserDTO the mistralUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mistralUserDTO,
     * or with status 400 (Bad Request) if the mistralUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the mistralUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mistral-users")
    @Timed
    public ResponseEntity<MistralUserDTO> updateMistralUser(@RequestBody MistralUserDTO mistralUserDTO) throws URISyntaxException {
        log.debug("REST request to update MistralUser : {}", mistralUserDTO);
        if (mistralUserDTO.getId() == null) {
            return createMistralUser(mistralUserDTO);
        }
        MistralUserDTO result = mistralUserService.save(mistralUserDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mistralUserDTO.getId().toString()))
                .body(result);
    }

    /**
     * GET  /mistral-users : get all the mistralUsers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mistralUsers in body
     */
    @GetMapping("/mistral-users")
    @Timed
    public ResponseEntity<List<MistralUserDTO>> getAllMistralUsers(Pageable pageable) {
        log.debug("REST request to get a page of MistralUsers");
        Page<MistralUserDTO> page = mistralUserService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mistral-users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mistral-users/:id : get the "id" mistralUser.
     *
     * @param id the id of the mistralUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mistralUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mistral-users/{id}")
    @Timed
    public ResponseEntity<MistralUserDTO> getMistralUser(@PathVariable Long id) {
        log.debug("REST request to get MistralUser : {}", id);
        MistralUserDTO mistralUserDTO = mistralUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mistralUserDTO));
    }

    /**
     * DELETE  /mistral-users/:id : delete the "id" mistralUser.
     *
     * @param id the id of the mistralUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mistral-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteMistralUser(@PathVariable Long id) {
        log.debug("REST request to delete MistralUser : {}", id);
        mistralUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
