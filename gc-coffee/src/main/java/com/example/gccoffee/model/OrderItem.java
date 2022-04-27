package com.example.gccoffee.model;

import java.util.UUID;

public record OrderItem(UUID productId, Category category, Long price, int quantity) {
}
