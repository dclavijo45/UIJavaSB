package com.userinterface.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@Entity
@Table(name="user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @Size(min=3, max=12)
    @NotNull
    private String name;

    @Column(name = "lastname")
    @Size(min=3, max=12)
    @NotNull
    @NotBlank
    private String lastname;

    @Column(name = "email", unique = true)
    @Email
    @NotNull
    @NotBlank
    private String email;

    @Column(name = "number_telephone")
    @Size(min=10, max=10)
    @NotNull
    @NotBlank
    private String numberTelephone;

    @Column(name = "city")
    @Size(min=2, max=50)
    @NotNull
    @NotBlank
    private String city;

    @Column(name = "country")
    @Size(min=2, max=50)
    @NotNull
    @NotBlank
    private String country;

    @Column(name="username", unique = true)
    @Size(min=4, max=12)
    @NotNull
    @NotBlank
    private String username;

    @Column(name="password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;

    @Transient
    private String token;
}
