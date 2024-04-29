package com.example.shopclothes.security;

import com.example.shopclothes.entity.ERole;
import com.example.shopclothes.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
public class CustomFilterSecurity {

    @Value("${api.prefix}")
    private String apiPrefix;

    @Autowired
    CustomUserDetailService customUserDetailService;

    @Autowired
    CustomJwtFilter customJwtFilter;

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());

        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(
                           // String.format("%s/login/signup", apiPrefix),
                            String.format("%s/login/signin", apiPrefix)
                    )
                            .permitAll()
                            .requestMatchers(POST,
                                    String.format("%s/login/signup", apiPrefix)).permitAll()
                            .requestMatchers(POST,
                                    String.format("%s/user/resetPw", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/category/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/category/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/product/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/tag/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/blog/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/image/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/order/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/user/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/order/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/size/**", apiPrefix)).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/banner/**", apiPrefix)).permitAll()
                            .anyRequest()
                            .authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable);

        http.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("*"));
                configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
                configuration.setAllowedHeaders(Arrays.asList("authorization","content-type","x-auth-token"));
                configuration.setExposedHeaders(List.of("x-auth-token"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**",configuration);
                httpSecurityCorsConfigurer.configurationSource(source);
            }
        });

        return http.build();
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
