package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.models.daoUser;

@Repository
public class daoUserRepository {

	@Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public daoUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<daoUser> findAll() {
        String sql = "SELECT * FROM testing";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(daoUser.class));
    }

    public Optional<daoUser> findById(Long id) {
        String sql = "SELECT * FROM testing WHERE id = ?";
        try {
        	daoUser user = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(daoUser.class), id);
            return Optional.ofNullable(user);
        }catch(Exception e){
        	return null;
        }
        
    }

    public int save(daoUser user) {
        String sql = "INSERT INTO testing (name, surname, identification) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, user.getName(), user.getSurname(), user.getIdentification());
    }

    public int update(Long id, daoUser updatedUser) {
        String sql = "UPDATE testing SET name = ?, surname = ?, identification = ? WHERE id = ?";
        return jdbcTemplate.update(sql, updatedUser.getName(), updatedUser.getSurname(),
        updatedUser.getIdentification(), id);
        
        
    }

    public int deleteById(Long id) {
        String sql = "DELETE FROM testing WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
