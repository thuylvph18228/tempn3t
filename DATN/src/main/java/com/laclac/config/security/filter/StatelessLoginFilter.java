package com.laclac.config.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laclac.config.security.service.AppUserDetailsService;
import com.laclac.config.security.service.TokenAuthService;
import com.laclac.config.security.service.UserAuthentication;
import com.laclac.config.security.service.dto.AuthUserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StatelessLoginFilter extends AbstractAuthenticationProcessingFilter {
    /** The token authentication service. */
    private final TokenAuthService tokenAuthenticationService;

    /** The user service. */
    private final AppUserDetailsService userService;

    /**
     * Instantiates a new stateless login filter.
     *
     * @param urlMapping the url mapping
     * @param tokenAuthenticationService the token authentication service
     * @param userService the user service
     * @param authenticationManager the authentication manager
     */
    public StatelessLoginFilter(String urlMapping, TokenAuthService tokenAuthenticationService,
                                AppUserDetailsService userService, AuthenticationManager authenticationManager) {
        super(urlMapping);
        this.tokenAuthenticationService = tokenAuthenticationService;
        this.userService = userService;
        setAuthenticationManager(authenticationManager);
    }

    /*
     * (non-Javadoc)
     *
     * @see org.springframework.security.web.authentication.
     * AbstractAuthenticationProcessingFilter#attemptAuthentication(javax.
     * servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        if (!request.getMethod().equals("POST")) {
            return null;
        }
        final AuthUserDto user = this.toUser(request);
        final UsernamePasswordAuthenticationToken loginToken = user.toAuthenticationToken();
        return getAuthenticationManager().authenticate(loginToken);
    }

    /**
     * To user.
     *
     * @param request the request
     * @return the admin user detail
     * @throws IOException Signals that an I/O exception has occurred.
     */
    private AuthUserDto toUser(HttpServletRequest request) throws IOException {
        return new ObjectMapper().readValue(request.getInputStream(), AuthUserDto.class);
    }

    /*
     * (non-Javadoc)
     *
     * @see org.springframework.security.web.authentication.
     * AbstractAuthenticationProcessingFilter#successfulAuthentication(javax.
     * servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse,
     * javax.servlet.FilterChain,
     * org.springframework.security.core.Authentication)
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        final UserDetails authenticatedUser = this.userService.loadUserByUsername(authResult.getName());
        final UserAuthentication userAuthentication = new UserAuthentication(authenticatedUser);
        this.tokenAuthenticationService.addJwtTokenToHeader(response, userAuthentication);
        SecurityContextHolder.getContext().setAuthentication(userAuthentication);
    }
}
