package com.signup.signupp.login;

import com.signup.signupp.service.UserServiceImpl;
import com.signup.signupp.user.SiteUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;

@Slf4j
@RestController
public class AuthController {
    private final AuthService authService;
    private final UserServiceImpl userServiceImpl;

    public AuthController(AuthService authService,UserServiceImpl userServiceImpl) {

        this.authService = authService;
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/api/login")
    public ResponseEntity login(@RequestBody LoginRequest request) {
        try {
            String token = authService.createToken(request.getUsername(), request.getPassword());
            String refreshToken = authService.createRefreshToken(request.getUsername(), request.getPassword());

            String userNickname = userServiceImpl.findNickname(request);
            int userId = userServiceImpl.findUserId(request);

            HashMap<String, String> response = new HashMap<>();
            response.put("username",request.getUsername());
            response.put("nickname",userNickname);
            response.put("id",String.valueOf(userId));
            response.put("accessToken", token);
            response.put("refreshToken", refreshToken);
            return ResponseEntity.ok().body(response);
        }catch(IllegalArgumentException ex){
            return ResponseEntity.badRequest().body("유저 정보가 올바르지 않습니다.");
        }
    }
    @PostMapping("/api/logout")
    public ResponseEntity logout(@RequestBody LogoutRequest request){
        authService.logout(request.getUsername());
        return ResponseEntity.ok().body("로그아웃 성공");
    }
    @PostMapping("/api/refresh")
    public ResponseEntity refresh(@RequestBody RefreshRequest request) {
        String token = authService.refreshAccessToken(request.getRefreshToken());
        if(token==null){
            return ResponseEntity.badRequest().body("토큰이 만료되었습니다. 다시 로그인해주세요");
        }
        HashMap<String, String> response = new HashMap<>();
        response.put("accessToken",token);
        return ResponseEntity.ok(response);
    }
    private AuthController.ApiResponse createResponse(HttpStatus status, String message) {
        return new AuthController.ApiResponse(status.value(), message);
    }

    private static class ApiResponse {
        private final int status;
        private final String message;

        public ApiResponse(int status, String message) {
            this.status = status;
            this.message = message;
        }

        public int getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }
}
