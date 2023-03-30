package com.laclac.service.Iplm;

import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.UserDto;
import com.laclac.entity.User;
import com.laclac.entity.UserStatus;
import com.laclac.repository.UserRepository;
import com.laclac.service.MailService;
import com.laclac.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    MailService mailService;

    @Override
    @Transactional
    public List<UserDto> getAll() {
        return this.userRepo.findAll().stream().map(User :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<User> getAllByPhone() {
        return null;
    }

    @Override
    @Transactional
    public List<User> getAllByRole(String role) {
        return this.userRepo.getAllByRole(role);
    }

    @Override
    @Transactional
    public List<Object> getByEmail(String email) throws MessagingException {
        UserDto userDto = this.userRepo.findByEmail(email).toDto();
        String codeChangePass = (int)((Math.random() + 1) * 1000000)+"";
        if(userDto.getId() != null){
            String to = userDto.getEmail();
            String subject = "Mã xác nhận";
            String body =  "Mã xác nhận quên mật khẩu của bạn là: " + codeChangePass;
            this.mailService.sendmail(to, subject, body);
        } else {
            return null;
        }
        List<Object> object = new ArrayList<>();
        object.add(userDto);
        object.add(codeChangePass);
        return object;
    }

    @Override
    @Transactional
    public User getById(int UserId) {
        return null;
    }

    @Override
    @Transactional
    public User save(User user) {
        return null;
    }

    @Override
    @Transactional
    public UserDto update(UserDto userDto) {
        User user = this.userRepo.findById(userDto.getId()).get();
        userDto.setPassword(user.getPassword());
        return this.userRepo.saveAndFlush(User.toEntity(userDto)).toDto();
    }

    @Override
    public UserDto updateStatus(Integer id) {
        User user = this.userRepo.findById(id).get();
        if(user.getStatus().toString().equalsIgnoreCase("ACTIVE")){
            user.setStatus(UserStatus.BLOCKED);
        } else {
            user.setStatus(UserStatus.ACTIVE);
        }
        return this.userRepo.saveAndFlush(user).toDto();
    }

    @Override
    @Transactional
    public User delete(int id) {
        return null;
    }

    @Override
    public UserDto save(UserDto userDto) {
        String password = new BCryptPasswordEncoder().encode(userDto.getPassword());
        userDto.setPassword(password);
        UserDto u = this.userRepo.saveAndFlush(User.toEntity(userDto)).toDto();
        return u;
    }

    @Override
    public UserDto getByUsername(String username) {
        return this.userRepo.findByUsername(username).toDto();
    }

    @Override
    public List<UserDto> findByFullnameOrPhone(String info) {
        return this.userRepo.findByFullnameOrPhone(info).stream().map(User :: toDto).collect(Collectors.toList());
    }

    @Override
    public Boolean comparePassword(String password) {
        User user = CurrentUser.getCurrentUser().get();
        return new BCryptPasswordEncoder().matches(password, user.getPassword());
    }
}
