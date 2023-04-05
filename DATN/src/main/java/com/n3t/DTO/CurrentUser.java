package com.n3t.DTO;

import com.n3t.entity.User;
import com.n3t.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CurrentUser {

    private static UserRepository userRepo;

    @Autowired
    public CurrentUser(UserRepository userRepository) {
        CurrentUser.userRepo = userRepository;
    }

    public static Optional<User> getCurrentUser(){
        Optional<User> userEntity = getCurrentUserEntity();
//                .orElseThrow(() -> new Exception("Token expired"));
        return userEntity;
    }

    protected static Optional<User> getCurrentUserEntity() {
        Authentication userAuthentication = SecurityContextHolder.getContext().getAuthentication();
        if (userAuthentication == null) {
            return Optional.empty();
        }
        String principal = userAuthentication.getName();
        return userRepo.findByUsernameOrEmail(principal, principal);
    }
}
