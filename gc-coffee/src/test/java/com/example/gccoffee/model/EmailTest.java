package com.example.gccoffee.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EmailTest {

    @Test
    public void testEmail(){
        assertThrows(IllegalArgumentException.class, () -> {
            Email email = new Email("aaaaa");});
    }

    @Test
    public void testValidEmail(){
        Email email = new Email("hello@email.com");
        assertTrue(email.getAddress().equals("hello@email.com"));
    }
}