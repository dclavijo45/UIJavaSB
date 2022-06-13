package com.userinterface.model.auth;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class AuthLogin {

    @Size(min=4, max=12)
    @NotNull
    @NotBlank
    private String username;

    @Size(min=6, max=12)
    @NotNull
    @NotBlank
    private String password;
}
