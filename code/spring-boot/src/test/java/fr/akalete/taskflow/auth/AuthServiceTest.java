package fr.akalete.taskflow.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository users;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private JwtService jwt;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_avecIdentifiantsValides_retourneUnJeton() {
        // Arrange
        var user = new User("ada@exemple.fr", "$2a$10$hash");
        when(users.findByEmail("ada@exemple.fr"))
                .thenReturn(Optional.of(user));
        when(encoder.matches("secret", user.getPassword()))
                .thenReturn(true);
        when(jwt.generate(user)).thenReturn("jwt-123");

        // Act
        LoginResponse response = authService.login(
                new LoginRequest("ada@exemple.fr", "secret"));

        // Assert
        assertThat(response.token()).isEqualTo("jwt-123");
        assertThat(response.redirectTo()).isEqualTo("/dashboard");
        verify(jwt).generate(user);
    }

    @Test
    void login_avecMotDePasseInvalide_leveUnauthorized() {
        var user = new User("ada@exemple.fr", "$2a$10$hash");
        when(users.findByEmail("ada@exemple.fr"))
                .thenReturn(Optional.of(user));
        when(encoder.matches("faux", user.getPassword()))
                .thenReturn(false);

        assertThatThrownBy(() -> authService.login(
                new LoginRequest("ada@exemple.fr", "faux")))
                .isInstanceOf(InvalidCredentialsException.class);
    }
}
