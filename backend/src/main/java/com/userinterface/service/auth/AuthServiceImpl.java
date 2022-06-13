package com.userinterface.service.auth;

import com.userinterface.jwt.JwtTokenProvider;
import com.userinterface.model.auth.AuthLogin;
import com.userinterface.model.entity.Role;
import com.userinterface.model.entity.User;

import com.userinterface.service.user.IUserService;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthServiceImpl implements IAuthService {

    private final IUserService userService;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(IUserService userService, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public User login(AuthLogin authLogin){
        User user = this.userService.findByUsername(authLogin.getUsername());
        if (user != null){
            if (this.passwordEncoder.matches(authLogin.getPassword(), user.getPassword())){
                user.setToken(this.jwtTokenProvider.generateToken(user));
                user.setPassword(null);

                return user;
            }
        }
        return null;
    }

    @Override
    public User register(User user){
        if(this.userService.findByUsernameOrEmail(user.getUsername(), user.getEmail()) != null){
            return null;
        }
        user.setRole(Role.USER);

        User newUser = this.userService.saveUser(user);
        newUser.setPassword(null);
        return newUser;
    }
}
