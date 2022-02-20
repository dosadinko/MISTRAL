package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.MistralUserService;
import com.mycompany.myapp.domain.MistralUser;
import com.mycompany.myapp.repository.MistralUserRepository;
import com.mycompany.myapp.service.dto.MistralUserDTO;
import com.mycompany.myapp.service.mapper.MistralUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing MistralUser.
 */
@Service
@Transactional
public class MistralUserServiceImpl implements MistralUserService {

    private final Logger log = LoggerFactory.getLogger(MistralUserServiceImpl.class);

    private final MistralUserRepository mistralUserRepository;

    private final MistralUserMapper mistralUserMapper;

    public MistralUserServiceImpl(MistralUserRepository mistralUserRepository, MistralUserMapper mistralUserMapper) {
        this.mistralUserRepository = mistralUserRepository;
        this.mistralUserMapper = mistralUserMapper;
    }

    /**
     * Save a mistralUser.
     *
     * @param mistralUserDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MistralUserDTO save(MistralUserDTO mistralUserDTO) {
        log.debug("Request to save MistralUser : {}", mistralUserDTO);
        MistralUser mistralUser = mistralUserMapper.toEntity(mistralUserDTO);
        mistralUser = mistralUserRepository.save(mistralUser);
        return mistralUserMapper.toDto(mistralUser);
    }

    /**
     * Get all the mistralUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MistralUserDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MistralUsers");
        return mistralUserRepository.findAll(pageable)
            .map(mistralUserMapper::toDto);
    }

    /**
     * Get one mistralUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MistralUserDTO findOne(Long id) {
        log.debug("Request to get MistralUser : {}", id);
        MistralUser mistralUser = mistralUserRepository.findOne(id);
        return mistralUserMapper.toDto(mistralUser);
    }

    /**
     * Delete the mistralUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MistralUser : {}", id);
        mistralUserRepository.delete(id);
    }
}
