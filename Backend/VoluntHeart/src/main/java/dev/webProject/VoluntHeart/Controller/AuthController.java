package dev.webProject.VoluntHeart.Controller;

import org.springframework.web.bind.annotation.RestController;

import dev.webProject.VoluntHeart.Configuration.JwtProvider;
import dev.webProject.VoluntHeart.Exception.UserException;
import dev.webProject.VoluntHeart.Models.Users.DonorModel;
import dev.webProject.VoluntHeart.Models.Users.FundraiserModel;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Repository.DonorRepo;
import dev.webProject.VoluntHeart.Repository.FundraiserRepo;
import dev.webProject.VoluntHeart.Response.AuthResponse;
import dev.webProject.VoluntHeart.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("path")
public class AuthController {

    @Autowired
    private FundraiserRepo fundraiserRepo;

    @Autowired
    private DonorRepo donorRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserService userService;

    // signup
    @PostMapping("/signup/fundraiser")
    public ResponseEntity<AuthResponse> fundraiserSignUpHandler(@RequestBody FundraiserModel fundraiser) throws UserException {

        String email = fundraiser.getEmail();
        String password = fundraiser.getPassword();
        String fullName = fundraiser.getFullName();
        String regNum = fundraiser.getRegNumber();

        if ((donorRepo.findDonorByEmail(email) != null) || (fundraiserRepo.findFundraiserByEmail(email) != null)) {
            throw new UserException("Email is already exist");

        }
        FundraiserModel createFundraiser = new FundraiserModel();
        createFundraiser.setEmail(email);
        createFundraiser.setPassword(password);
        createFundraiser.setFullName(fullName);
        createFundraiser.setRegNumber(regNum);
        createFundraiser.setDonor(false);

        fundraiserRepo.save(createFundraiser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signup/donor")
    public ResponseEntity<AuthResponse> donorSignUpHandler(@RequestBody DonorModel donor) throws UserException {

        String email = donor.getEmail();
        String password = donor.getPassword();
        String fullName = donor.getFullName();

        if ((donorRepo.findDonorByEmail(email) != null) || (fundraiserRepo.findFundraiserByEmail(email) != null)) {
            throw new UserException("Email is already exist");

        }
        DonorModel createDonor = new DonorModel();
        createDonor.setEmail(email);
        createDonor.setPassword(password);
        createDonor.setFullName(fullName);
        createDonor.setDonor(true);

        donorRepo.save(createDonor);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.CREATED);
    }

    // login

    @PostMapping("/login/fundraiser")
    public ResponseEntity<AuthResponse> userLogin(@RequestBody UserModel user) throws UserException {

        String email = user.getEmail();
        String password = user.getPassword();

        Authentication authentication = authenticate(email, password);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);

    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = userService.findbyemail(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Email or Password");

        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {

            throw new BadCredentialsException("Invalid Email or Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
