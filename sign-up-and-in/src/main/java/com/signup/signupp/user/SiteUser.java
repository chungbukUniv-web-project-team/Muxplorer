package com.signup.signupp.user;

import jakarta.persistence.*;

import lombok.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data            // Getter Setter
@Builder        // DTO -> Entity화
@AllArgsConstructor    // 모든 컬럼 생성자 생성
@NoArgsConstructor	// 기본 생성자
@Table(name = "siteuser")
public class SiteUser {

    @Id	// 내가 PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)	// 자동 id 생성
    private Integer id;

    @Column(unique = true)
    private String username;

    @Column
    private String nickname;
    @Column
    private String university;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_role")
    private UserRole userRole;
    @Column
    private String refreshToken;
    public void checkPassword(String inputPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(inputPassword, this.password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }
}
