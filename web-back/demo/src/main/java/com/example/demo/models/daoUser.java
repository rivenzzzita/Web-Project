package com.example.demo.models;

import java.sql.ResultSet;
import java.sql.SQLException;

public class daoUser {

    private Long id;
    private String name;
    private String surname;
    private String identification;

    // Constructor sin argumentos necesario para RowMapper
    public daoUser() {
    }

    // Constructor con argumentos
    public daoUser(Long id, String name, String surname, String identification) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.identification = identification;
    }

    // Getter y Setter para 'id'
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter y Setter para 'name'
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter y Setter para 'surname'
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    // Getter y Setter para 'identification'
    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    // Método estático para crear un daoUser desde un ResultSet
    public static daoUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new daoUser(
                rs.getLong("id"),
                rs.getString("name"),
                rs.getString("surname"),
                rs.getString("identification")
        );
    }
}
