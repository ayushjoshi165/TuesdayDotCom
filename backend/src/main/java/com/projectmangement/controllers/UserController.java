package com.projectmangement.controllers;

import com.projectmangement.models.User;
import com.projectmangement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
// remove cross origin from the every call and make a globle configuration for it
    //
    @Autowired
UserRepository userRepository;

    @GetMapping("/users")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public List<User> userList()
    {
      return userRepository.findAll();

    }
    @GetMapping("/users/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public User userById(@PathVariable String id)
    {

        int userid = Integer.parseInt(id);
        return userRepository.findById(userid).get();

    }
    @PostMapping("/users")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public User addUser(@RequestBody Map<String , String> body)
    {

        String name = body.get("name");
        String  permission_id = body.get("permission_id");

       return  userRepository.save(new User(name, permission_id));

    }
//    @PutMapping("users/{id}")
//    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//    public User updateUsersList(@PathVariable String id, @RequestBody Map<String , String> body)
//    {
//        int userid = Integer.parseInt(id);
//
//       User user =  userRepository.findById(userid).get();
//        String name =  body.get("name");
//        String permission_id =   body.get("permission_id");
//       user.setName(name);
//       user.setPermissionId(permission_id);
//
//
//  return    userRepository.save(new User(name, permission_id));
//
//    }

    @PutMapping("users/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public User updateUsersList(@PathVariable String id, @RequestBody Map<String, String> body) {
        int userId = Integer.parseInt(id);

        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            String name = body.get("name");
            String permission_id = body.get("permission_id");
            String email = body.get("email");

            user.setName(name);
            user.setPermissionId(permission_id);
user.setEmail(email);
            // Save the updated user
            user = userRepository.save(user);

            return user;
        } else {
            // Handle the case where the user with the provided ID doesn't exist
            return null; // You can return an appropriate response here
        }
    }


    @DeleteMapping("users/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public boolean deleteUserById(@PathVariable String id)
    {
        int userId =Integer.parseInt(id);

        userRepository.deleteById(userId);

        return true;

    }

    @PostMapping("/users/search")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public List<User> searchByText(@RequestBody Map<String , String> body)
    {
      String  searchText =  body.get("text");
       return userRepository.findByNameOrPermissionId(searchText,searchText);

    }




}
