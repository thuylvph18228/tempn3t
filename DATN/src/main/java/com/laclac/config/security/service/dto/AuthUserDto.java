package com.laclac.config.security.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

public class AuthUserDto {
    /** The username. */
    @Getter
    private final String username;

    /** The password. */
    private final String password;

    /**
     * Instantiates a new admin user detail.
     *
     * @param loginId the login id
     * @param password the password
     * @param displayName the display name
     * @param status the status
     */
    public AuthUserDto(@JsonProperty("username") String username, @JsonProperty("password") String password) {
        this.username = username.trim();
        this.password = password.trim();
    }

    /**
     * Gets the password.
     *
     * @return the password
     */
    public Optional<String> getPassword() {
        return Optional.ofNullable(password).map(p -> new BCryptPasswordEncoder().encode(p));
    }

    /**
     * To authentication token.
     *
     * @return the username password authentication token
     */
    public UsernamePasswordAuthenticationToken toAuthenticationToken() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
