package com.n3t.config.security.service;

import com.n3t.entity.User;
import com.n3t.entity.UserRole;
import com.n3t.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Component
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    //Set user detail
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User users = userRepository.findByUsername(username);
        if(users == null){
            throw new UsernameNotFoundException(username);
        }
        UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(users.getUsername())
                .password(users.getPassword())
                .authorities(getAuthorities(users)).build();
        return userDetails;
    }

    //Get roles
    private Collection<? extends GrantedAuthority> getAuthorities(User users) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        Set<UserRole> roleList = users.getUserRoles();
        for (UserRole r : roleList){
            authorities.add(new SimpleGrantedAuthority(r.getRole().getName()));
        }
        return authorities;
    }
}
