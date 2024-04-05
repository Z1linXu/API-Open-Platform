package com.api.apiinterface.controller;

import com.api.apiinterface.modal.User;
import org.springframework.web.bind.annotation.*;

/**
 * mingchengapi
 */
@RestController
@RequestMapping("/name")
public class NameController {
    @GetMapping("/")
    public String getNameByGet( String name){
        return "get 你的名字是" + name;
    }

    @PostMapping("/")
    public String getNameByPost(@RequestParam String name){
        return "post 你的名字是" + name;
    }

    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody User user){
        return "post 你的名字是" + user.getUsername() ;
    }
}
