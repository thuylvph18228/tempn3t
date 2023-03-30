package com.laclac.config.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JwtTokenHandler {

    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    private AppUserDetailsService applicationUserService;

    Optional<UserDetails> parseUserFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        String username = claims.get("username", String.class);
        return Optional.ofNullable(applicationUserService.loadUserByUsername(username));
    }

    public String createTokenForUser(UserDetails user) {
        final ZonedDateTime afterOneWeek = ZonedDateTime.now().plusWeeks(1);
        List<? extends GrantedAuthority> roles = new ArrayList<>(user.getAuthorities());
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("displayName", "")
                .claim("roles", roles.isEmpty() ? null : roles.stream().map(item -> item.getAuthority()).collect(Collectors.toList()))
                .signWith(SignatureAlgorithm.HS512, secret)
                .setExpiration(Date.from(afterOneWeek.toInstant()))
                .compact();
    }
}
