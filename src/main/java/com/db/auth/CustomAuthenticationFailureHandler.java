package com.db.auth;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
/**
 * Spring Security will send control to CustomAuthenticationFailureHandler when authentication will get failed
 */
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws
            IOException,
            ServletException {
        // write your custom code here

        if(e instanceof DisabledException){
            response.sendRedirect("/login_error?error=disabled");
        } else if(e instanceof LockedException){
            response.sendRedirect("/login_error?error=blocked");
        }
    }
}
