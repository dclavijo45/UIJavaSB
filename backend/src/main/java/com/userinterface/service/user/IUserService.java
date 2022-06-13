package com.userinterface.service.user;

import com.userinterface.model.entity.User;

public interface IUserService {
    User saveUser(User user);

    User updateUser(User user);

    boolean deleteUser(Long user_id);

    User findById(Long user_id);

    User findByUsernameOrEmail(String username, String email);

    User findByUsername(String username);
}
