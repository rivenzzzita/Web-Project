package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.dao.*;
import com.example.demo.models.daoUser;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;


@Service
public class crudService {
	

	@Autowired
	private daoUserRepository daouserRepository;
	
	public List<daoUser> getAllUser(){
		return this.daouserRepository.findAll();
	}
	
   public Optional<daoUser> getById(Long id){
	return this.daouserRepository.findById(id);   
   }
   
   public int UsersSave(daoUser user) {
	return this.daouserRepository.save(user);
   }
	
   public int UsersUpdate(Long id, daoUser updatedUser) {
	   return this.daouserRepository.update(id, updatedUser);
   }
   
   public int UsersDeleted(Long id) {
	   return this.daouserRepository.deleteById(id);   
   }
}
