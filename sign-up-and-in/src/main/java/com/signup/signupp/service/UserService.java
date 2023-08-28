package com.signup.signupp.service;

import com.signup.signupp.dto.UserFormDTO;

public interface UserService {
    Integer join(UserFormDTO userFormDTO);
}
