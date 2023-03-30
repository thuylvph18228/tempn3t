package com.laclac.config;

import com.laclac.config.security.filter.StatelessAuthenticationFilter;
import com.laclac.config.security.filter.StatelessLoginFilter;
import com.laclac.config.security.service.AppUserDetailsService;
import com.laclac.config.security.service.TokenAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;


@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private TokenAuthService tokenAuthenticationService;

    @Autowired
    private AppUserDetailsService appUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/angularjs/**",
                "/css/**",
                "/font-awesome/**",
                "/images/**",
                "/js/**",
                "/style/**"
        );
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    private static final String[] PUBLIC_MATCHERS = {
	        "/angularjs/**",
	        "/css/**",
	        "/font-awesome/**",
	        "/images/**",
	        "/js/**",
	        "/style/**"
	};

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5500"));
//        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
////        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", TokenAuthService.AUTH_HEADER_NAME, "x-file-name"));
//        configuration.setExposedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", TokenAuthService.AUTH_HEADER_NAME, "x-file-name"));
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
//                .antMatchers("/authenticate").permitAll()
                .antMatchers("/signup").permitAll()
//                .antMatchers("/user/**").authenticated()
//                .antMatchers("/api/**").hasAnyAuthority("ADMIN","USER")
//                .antMatchers("/api/**").permitAll()
                .antMatchers("/**", "/favicon.ico").permitAll();
        http.addFilterBefore(new StatelessLoginFilter("/auth/login", tokenAuthenticationService, appUserDetailsService,
                authenticationManager()), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService),
                UsernamePasswordAuthenticationFilter.class);
        http.cors().configurationSource(request -> {
            final CorsConfiguration cors = new CorsConfiguration();
            cors.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://localhost:8080","http://localhost:63342"));
            cors.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
            cors.setAllowCredentials(true);
            cors.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", TokenAuthService.AUTH_HEADER_NAME, "x-file-name"));
            cors.setExposedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", TokenAuthService.AUTH_HEADER_NAME, "x-file-name"));
            return cors;
        });
        http.csrf().disable();
    }
}
