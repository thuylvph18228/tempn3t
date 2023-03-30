package com.laclac.repository;

import com.laclac.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query(value = "SELECT * FROM users WHERE fullname LIKE :info% or phone LIKE :info%", nativeQuery = true)
    List<User> findByFullnameOrPhone(String info);

    User findByEmail(String email);


    @Query("select count(id) from User ")
    long countById();

    @Query(value = "SELECT * FROM users u INNER JOIN user_roles ur ON u.id = ur.user_id\n" +
            "INNER JOIN roles r ON r.id = ur.role_id\n" +
            "WHERE r.name LIKE :role", nativeQuery = true)
    List<User> getAllByRole(String role);
}