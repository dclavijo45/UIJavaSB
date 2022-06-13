package com.userinterface.service.auth;

import com.userinterface.model.auth.AuthLogin;
import com.userinterface.model.entity.User;

public interface IAuthService {
    User register(User user);

    User login(AuthLogin authLogin);
}
