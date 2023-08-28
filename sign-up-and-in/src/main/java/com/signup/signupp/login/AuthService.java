package com.signup.signupp.login;

import com.signup.signupp.repository.UserRepository;
import com.signup.signupp.user.SiteUser;
import com.signup.signupp.user.UserRole;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public AuthService(JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    public String createToken(String username, String password){
        SiteUser siteUser = userRepository.findByUsername(username);
        if(siteUser==null){
            throw new IllegalArgumentException("유저 정보가 올바르지 않습니다");
        }
        siteUser.checkPassword(password);
        return jwtTokenProvider.createToken(siteUser.getUsername(),siteUser.getUserRole());
    }

    public String createRefreshToken(String username, String password){
        SiteUser siteUser = userRepository.findByUsername(username);
        String refreshToken = jwtTokenProvider.createRefreshToken(siteUser.getUsername());
        siteUser.setRefreshToken(refreshToken);
        userRepository.save(siteUser);
        return refreshToken;
    }

    public void logout(String username){
        SiteUser siteUser = userRepository.findByUsername(username);
        if(siteUser!=null) {
            siteUser.setRefreshToken(null);
            userRepository.save(siteUser);
        }
    }
    public String refreshAccessToken(String refreshToken){
        // refreshToken의 유효성 검증
        if (jwtTokenProvider.validateToken(refreshToken)) {
            // refreshToken에서 사용자 정보 추출
            String username = jwtTokenProvider.getUsernameFromToken(refreshToken);


            // 사용자의 refresh token을 데이터베이스에서 확인
            SiteUser user = userRepository.findByUsername(username);
            UserRole userRole = user.getUserRole();
            if (user != null && user.getRefreshToken().equals(refreshToken)) {
                // 새로운 accessToken 생성
                String newAccessToken = jwtTokenProvider.createToken(username,userRole);
                return newAccessToken;
            }
        }
        // refreshToken이 유효하지 않은 경우 또는 사용자 정보가 일치하지 않는 경우
        return null; // 또는 에러 처리 방식에 맞게 수정
    }
}
