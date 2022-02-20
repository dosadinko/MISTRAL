package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the UserPermission entity.
 */
public class UserPermissionDTO implements Serializable {

    private Long id;

    private Long mistralUserId;

    private String mistralUserName;

    private String mistralUserLastname;

    private Long permissionId;

    private String permissionName;

    private String permissionDescription;

    public String getPermissionDescription() {
        return permissionDescription;
    }

    public void setPermissionDescription(String permissionDescription) {
        this.permissionDescription = permissionDescription;
    }

    public String getMistralUserLastname() {
        return mistralUserLastname;
    }

    public void setMistralUserLastname(String mistralUserLastname) {
        this.mistralUserLastname = mistralUserLastname;
    }

    public Long getMistralUserId() {
        return mistralUserId;
    }

    public void setMistralUserId(Long mistralUserId) {
        this.mistralUserId = mistralUserId;
    }

    public String getMistralUserName() {
        return mistralUserName;
    }

    public void setMistralUserName(String mistralUserName) {
        this.mistralUserName = mistralUserName;
    }

    public Long getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserPermissionDTO userPermissionDTO = (UserPermissionDTO) o;
        if(userPermissionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userPermissionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserPermissionDTO{" +
            "id=" + getId() +
            "}";
    }
}
