package fr.akalete.taskflow.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users,
                       PasswordEncoder encoder,
                       JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public LoginResponse login(LoginRequest request) {
        User user = users.findByEmail(request.email())
                .filter(candidate -> encoder.matches(
                        request.password(), candidate.getPassword()))
                .orElseThrow(InvalidCredentialsException::new);

        return new LoginResponse(jwt.generate(user), "/dashboard");
    }
}
