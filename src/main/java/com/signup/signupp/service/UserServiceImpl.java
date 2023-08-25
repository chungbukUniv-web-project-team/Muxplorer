package com.signup.signupp.service;

import com.signup.signupp.dto.UserFormDTO;
import com.signup.signupp.login.LoginRequest;
import com.signup.signupp.repository.UserRepository;
import com.signup.signupp.user.SiteUser;
import com.signup.signupp.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Transactional
@Service            // 내가 서비스다
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Integer join(UserFormDTO userFormDTO) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        SiteUser user = SiteUser.builder()
                .email(userFormDTO.getEmail())
                .username(userFormDTO.getUsername())
                .password(passwordEncoder.encode(userFormDTO.getPassword1()))
                .university(userFormDTO.getUniversity())
                .userRole(UserRole.USER)
                .nickname(userFormDTO.getNickname())
                .build();

        return userRepository.save(user).getId();
    }
    public String findNickname(LoginRequest loginRequest){
        SiteUser findUser = userRepository.findByUsername(loginRequest.getUsername());
        return findUser.getNickname();
    }
    public int findUserId(LoginRequest loginRequest){
        SiteUser findUser = userRepository.findByUsername(loginRequest.getUsername());
        return findUser.getId();
    }

    public int validateDuplicateUser(UserFormDTO userFormDTO) {
        SiteUser findMember = userRepository.findByUsername(userFormDTO.getUsername());
        if (findMember == null) {
            return 1;
        }
        return 0;
    }

    public int validateUserIdLength(UserFormDTO userFormDTO) {
        if (userFormDTO.getUsername().length() < 3 || userFormDTO.getUsername().length() > 20) {
            return 0;
        }
        return 1;
    }

    public int validateDuplicateEmail(UserFormDTO userFormDTO) {
        SiteUser findMemberEmail = userRepository.findByEmail(userFormDTO.getEmail());
        if (findMemberEmail == null) {
            return 1;
        }
        return 0;
    }

    public int validateEmailFormat(UserFormDTO userFormDTO) {
        String emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(userFormDTO.getEmail());

        if (matcher.matches()) {
            return 1; // 이메일 형식이 올바름
        } else {
            return 0; // 이메일 형식이 올바르지 않음
        }
    }

    public int validatePassword1and2(UserFormDTO userFormDTO) {
        if (!userFormDTO.getPassword1().equals(userFormDTO.getPassword2())) {
            return 0;
        }
        return 1;
    }

    public int validateNickname(UserFormDTO userFormDTO) {
        SiteUser findMemberNickname = userRepository.findByNickname(userFormDTO.getNickname());
        if (findMemberNickname == null) {
            return 1;
        }
        return 0;
    }
}
