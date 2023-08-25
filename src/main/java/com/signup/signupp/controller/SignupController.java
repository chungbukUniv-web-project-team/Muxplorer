package com.signup.signupp.controller;

import com.signup.signupp.dto.UserFormDTO;
import com.signup.signupp.service.UserServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SignupController {
    private final UserServiceImpl userServiceimpl;

    @PostMapping("/api/signup")
    public ResponseEntity<?> createUser(@RequestBody UserFormDTO userFormDTO) {
        if(userServiceimpl.validateUserIdLength(userFormDTO)==0){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아이디는 3자 이상 20자 이하여야 합니다");
//            return new ResponseEntity<String>("아이디는 3자 이상 20자 이하여야 합니다",HttpStatus.BAD_REQUEST);
            return ResponseEntity.badRequest().body(createResponse(HttpStatus.BAD_REQUEST, "아이디는 3자 이상 20자 이하여야 합니다"));
        }
        if(userServiceimpl.validateDuplicateUser(userFormDTO)==0){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 존재하는 아이디 입니다.");
//            return new ResponseEntity<String>("이미 존재하는 아이디 입니다.",HttpStatus.BAD_REQUEST);
            return  ResponseEntity.badRequest().body(createResponse(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디 입니다."));

        }
        if(userServiceimpl.validateDuplicateEmail(userFormDTO)==0){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 존재하는 이메일 입니다.");
//            return new ResponseEntity<String>("이미 존재하는 이메일 입니다.",HttpStatus.BAD_REQUEST);
            return ResponseEntity.badRequest().body(createResponse(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일 입니다."));
        }
        if(userServiceimpl.validateEmailFormat(userFormDTO)==0){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 형식이 올바르지 않습니다.");
//            return new ResponseEntity<String>("이메일 형식이 올바르지 않습니다.",HttpStatus.BAD_REQUEST);
            return ResponseEntity.badRequest().body(createResponse(HttpStatus.BAD_REQUEST, "이메일 형식이 올바르지 않습니다"));
        }
        if(userServiceimpl.validatePassword1and2(userFormDTO)==0){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호와 비밀번호 확인이 다릅니다");
//            return new ResponseEntity<String>("비밀번호와 비밀번호 확인이 다릅니다",HttpStatus.BAD_REQUEST);
            return ResponseEntity.badRequest().body(createResponse(HttpStatus.BAD_REQUEST, "비밀번호와 비밀번호 확인이 다릅니다"));
        }
        if(userServiceimpl.validateNickname(userFormDTO)==0){
            return ResponseEntity.badRequest().body(createResponse(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임입니다."));
        }

        userServiceimpl.join(userFormDTO);
//        return new ResponseEntity<String>("회원가입 성공",HttpStatus.CREATED);
        System.out.println("userFormDTO = " + userFormDTO);
        return ResponseEntity.ok().body(createResponse(HttpStatus.OK, "회원가입 성공"));
    }



    private ApiResponse createResponse(HttpStatus status, String message) {
        return new ApiResponse(status.value(), message);
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
