package com.laclac.config.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class TokenAuthService {
    public static final String AUTH_HEADER_NAME = "x-auth-token";

    @Autowired
    private JwtTokenHandler jwtTokenHandler;

    public void addJwtTokenToHeader(HttpServletResponse response, UserAuthentication authentication) {
        final UserDetails user = authentication.getDetails();
        response.addHeader(AUTH_HEADER_NAME, jwtTokenHandler.createTokenForUser(user));
    }

    public Authentication generateAuthenticationFromRequest(HttpServletRequest request) {
        final String token = request.getHeader(AUTH_HEADER_NAME);
        if (token == null || token.isEmpty())
            return null;
        return this.jwtTokenHandler.parseUserFromToken(token)
                .map(UserAuthentication::new)
                .orElse(null);
    }
}
