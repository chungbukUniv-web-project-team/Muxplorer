package com.signup.signupp.dto;

import com.signup.signupp.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFormDTO {
    @NotEmpty(message = "이메일은 필수항목입니다.")
    @Email
    private String email;
    @Size(min=3, max=20)
    @NotEmpty(message = "아이디는 필수항목입니다.")
    private String username;
    @NotEmpty(message = "비밀번호는 필수항목입니다.")
    private String password1;
    @NotEmpty(message = "비밀번호 확인은 필수항목입니다.")
    private String password2;
    @NotEmpty(message = "닉네임은 필수입니다.")
    private String nickname;
    @NotEmpty(message = "학교 이름은 필수항목입니다.")
    private String university;
}
