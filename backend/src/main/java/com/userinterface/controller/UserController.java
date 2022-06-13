package com.userinterface.controller;

import com.userinterface.jwt.JwtTokenProvider;
import com.userinterface.model.entity.User;

import com.userinterface.service.user.IUserService;

import io.jsonwebtoken.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;


@RestController
@Secured("ROLE_USER")
@RequestMapping("/api")
public class UserController {

    private final HttpServletRequest globalRequest;

    private final IUserService userService;

    private final JwtTokenProvider jwtTokenProvider;

    public UserController(IUserService userService, JwtTokenProvider jwtTokenProvider, HttpServletRequest globalRequest){
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.globalRequest = globalRequest;
    }

    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user){
        int user_id =  -1;
        Map<String, Object> response = new HashMap<>();
        response.put("updated", false);

        try {
            user_id = this.jwtTokenProvider.getUserIdAuth(this.globalRequest);
        }catch (SignatureException e){
            response.put("message", "Unauthorized");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        if (user_id != user.getId()){
            response.put("message", "You can't edit user");
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        User userUpdated = this.userService.updateUser(user);
        if(userUpdated == null){
            response.put("message", "User is not exist");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        userUpdated.setPassword(null);
        userUpdated.setToken(this.jwtTokenProvider.generateToken(userUpdated));
        response.put("updated", true);
        response.put("user", userUpdated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(){
        int user_id = -1;
        Map<String, Object> response = new HashMap<>();
        response.put("deleted", false);

        try {
            user_id = this.jwtTokenProvider.getUserIdAuth(this.globalRequest);
        }catch (SignatureException e){
            response.put("message", "Unauthorized");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        boolean userDeleted = this.userService.deleteUser(((long) user_id));
        if(!userDeleted){
            response.put("message", "User is not exist");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        response.put("deleted", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
