package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.MistralUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MistralUser and its DTO MistralUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MistralUserMapper extends EntityMapper<MistralUserDTO, MistralUser> {

    default MistralUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        MistralUser mistralUser = new MistralUser();
        mistralUser.setId(id);
        return mistralUser;
    }
}
