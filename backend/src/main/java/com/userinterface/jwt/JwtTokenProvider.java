package com.userinterface.jwt;

import com.userinterface.model.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.token.prefix}")
    private String jwtTokenPrefix;

    @Value("${app.jwt.header.string}")
    private String jwtHeaderString;

    @Value("${app.jwt.expiration-in-ms}")
    private Long jwtExpirationInMs;

    public String generateToken(User user){
        return Jwts.builder().setSubject(user.getUsername())
                .claim("roles", user.getRole())
                .claim("user_id", user.getId())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
    }

    public Authentication getAuthentication(HttpServletRequest request){
        String token = resolveToken(request);
        if(token == null){
            return null;
        }
        try {
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            String username = claims.getSubject();
            List<GrantedAuthority> authorities = Arrays.stream(claims.get("roles").toString().split(","))
                    .map(role -> role.startsWith("ROLE_")? role:"ROLE_"+role)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
            return  username != null ?
                    new UsernamePasswordAuthenticationToken(username, "", authorities) : null;
        }catch (SignatureException e){
            return null;
        }
    }

    public boolean validateToken(HttpServletRequest request){
        String token = resolveToken(request);
        if(token == null){
            return false;
        }
        try {
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            if(claims.getExpiration().before(new Date())){
                return false;
            }
            return true;
        }catch (SignatureException e){
            return false;
        }
    }

    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(jwtHeaderString);
        if(bearerToken!=null && bearerToken.startsWith(jwtTokenPrefix)){
            return bearerToken.substring(7);
        }
        return null;
    }

    public int getUserIdAuth(HttpServletRequest request){
        try {
            String token = resolveToken(request);
            if(token == null){
                throw new SignatureException("JWT invalid");
            }
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

            return claims.get("user_id") != null ? (int) claims.get("user_id") : -1;
        }catch (SignatureException e){
            throw new SignatureException("JWT invalid");
        }
    }
}
