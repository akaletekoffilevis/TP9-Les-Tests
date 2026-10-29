package fr.akalete.taskflow.auth;

public record LoginResponse(String token, String redirectTo) {
}
