package com.signup.signupp.repository;

import com.signup.signupp.user.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<SiteUser,Integer> {
    SiteUser findByUsername(String username);

    SiteUser findByEmail(String email);
    SiteUser findByNickname(String nickname);
}
