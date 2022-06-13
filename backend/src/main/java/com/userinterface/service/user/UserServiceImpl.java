package com.userinterface.service.user;

import com.userinterface.model.entity.Role;
import com.userinterface.model.entity.User;
import com.userinterface.repository.IUserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user){
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        return this.userRepository.save(user);
    }

    @Override
    public User findById(Long user_id)
    {
        return this.userRepository.findById(user_id).orElse(null);
    }

    @Override
    public User findByUsernameOrEmail(String username, String email) {
        return this.userRepository.findByUsernameOrEmail(username, email).orElse(null);
    }

    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public User updateUser(User user){
        User userUpdated = this.findById(user.getId());
        if (userUpdated != null){
            userUpdated.setUsername(user.getUsername());
            userUpdated.setName(user.getName());
            userUpdated.setLastname(user.getLastname());
            userUpdated.setEmail(user.getEmail());
            userUpdated.setCountry(user.getCountry());
            userUpdated.setCity(user.getCity());
            userUpdated.setNumberTelephone(user.getNumberTelephone());

            if (user.getPassword() != null || user.getPassword().length() != 0){
                userUpdated.setPassword(this.passwordEncoder.encode(user.getPassword()));
            }
        }
        return userUpdated;
    }

    @Override
    public boolean deleteUser(Long user_id) {
        User userDeleted = this.findById(user_id);
        if (userDeleted != null){
            this.userRepository.deleteById(user_id);
            return true;
        }
        return false;
    }
}
