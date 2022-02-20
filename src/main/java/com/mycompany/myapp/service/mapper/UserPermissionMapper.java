package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.UserPermissionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserPermission and its DTO UserPermissionDTO.
 */
@Mapper(componentModel = "spring", uses = {MistralUserMapper.class, PermissionMapper.class})
public interface UserPermissionMapper extends EntityMapper<UserPermissionDTO, UserPermission> {

    @Mapping(source = "user.id", target = "mistralUserId")
    @Mapping(source = "user.firstName", target = "mistralUserName")
    @Mapping(source = "user.lastName", target = "mistralUserLastname")
    @Mapping(source = "permission.id", target = "permissionId")
    @Mapping(source = "permission.code", target = "permissionName")
    @Mapping(source = "permission.description", target = "permissionDescription")
    UserPermissionDTO toDto(UserPermission userPermission);

    @Mapping(source = "mistralUserId", target = "user")
    @Mapping(source = "permissionId", target = "permission")
    UserPermission toEntity(UserPermissionDTO userPermissionDTO);

    default UserPermission fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserPermission userPermission = new UserPermission();
        userPermission.setId(id);
        return userPermission;
    }
}
