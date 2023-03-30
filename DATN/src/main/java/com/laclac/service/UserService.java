package com.laclac.service;

import com.laclac.DTO.UserDto;
import com.laclac.entity.User;

import javax.mail.MessagingException;
import java.util.List;

public interface UserService {

    List<UserDto> getAll();
    List<User> getAllByPhone();
    List<User> getAllByRole(String role);
    List<Object> getByEmail(String email) throws MessagingException;
    User getById(int UserId);
    User save(User user);
    UserDto update(UserDto userDto);
    UserDto updateStatus(Integer id);
    User delete(int id);
    UserDto save(UserDto userDto);

    UserDto getByUsername(String username);

    List<UserDto> findByFullnameOrPhone(String info);

    Boolean comparePassword(String password);

}
