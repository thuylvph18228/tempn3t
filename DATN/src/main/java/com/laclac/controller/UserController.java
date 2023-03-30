package com.laclac.controller;

import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.UserDto;
import com.laclac.config.security.service.dto.AuthUserDto;
import com.laclac.entity.User;
import com.laclac.repository.UserRepository;
import com.laclac.service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.Optional;

@RestController
@RequestMapping("/laclac/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(this.userService.getAll());
    }

    @GetMapping
    public ResponseEntity get(@RequestBody AuthUserDto authUserDto) {
        return ResponseEntity.ok(this.userRepo.findByUsername(authUserDto.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.userService.getById(id));
    }

    @GetMapping("/get-by-username")
    public ResponseEntity<?> getAllByUserName(@RequestParam(value = "username") String username) {
        return ResponseEntity.ok(this.userService.getByUsername(username));
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(this.userService.save(userDto));
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(this.userService.update(userDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.userService.updateStatus(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        this.userService.delete(id);
    }

    @GetMapping("/find-by-fullname-or-phone/{info}")
    public ResponseEntity findByFullnameOrPhone(@PathVariable("info") String info){
        return ResponseEntity.ok(this.userService.findByFullnameOrPhone(info));
    }

    @GetMapping("/forgot-password")
    public ResponseEntity findByEmail(
            @RequestParam("email") String email
    ) throws MessagingException {
        return ResponseEntity.ok(this.userService.getByEmail(email));
    }

    @PutMapping("/change-password")
    public ResponseEntity changePassword(@RequestBody UserDto userDto){
        return ResponseEntity.ok(this.userService.save(userDto));
    }

    @GetMapping("/compare-password")
    public ResponseEntity comparePassword(@RequestParam("password") String password){
        return ResponseEntity.ok(this.userService.comparePassword(password));
    }

    @PostMapping("register")
    public ResponseEntity register(@RequestBody UserDto userDto){
        return ResponseEntity.ok(this.userService.save(userDto));
    }

    @GetMapping("/get-by-role")
    public ResponseEntity getByRole( @RequestParam("role") String role) {
        return ResponseEntity.ok(this.userService.getAllByRole(role));
    }

}
