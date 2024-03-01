package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.models.daoUser;
import com.example.demo.services.crudService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class crudController {

	
    @Autowired
    private crudService crudservice;

    @GetMapping
    public ResponseEntity<List<daoUser>> getAllUsers() {
        List<daoUser> users = this.crudservice.getAllUser();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/saludo")
    public String getHelloWorld(){
    	return("Hello World");	
		    }
		    

    @GetMapping("/{id}")
    public ResponseEntity<Optional<daoUser>> getUserById(@PathVariable Long id) {
        Optional<daoUser> user = this.crudservice.getById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    public ResponseEntity<daoUser> createUser(@RequestBody daoUser user) {
        int user_Save = this.crudservice.UsersSave(user);
        
        if (user_Save > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<daoUser> updateUser(@PathVariable Long id, @RequestBody daoUser updatedUser) {
        int user_Update = this.crudservice.UsersUpdate(id, updatedUser);

        if (user_Update > 0) {
            updatedUser.setId(id);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        int user_Delete = this.crudservice.UsersDeleted(id);

        if (user_Delete > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
