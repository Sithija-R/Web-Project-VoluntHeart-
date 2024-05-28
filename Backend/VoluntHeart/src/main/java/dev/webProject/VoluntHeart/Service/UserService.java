package dev.webProject.VoluntHeart.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dev.webProject.VoluntHeart.Configuration.JwtProvider;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    //get all users
    public List<UserModel> allUsers() {
        return userRepo.findAll();
    }

    //find by Id
    public Optional<UserModel> findByID(String userId){
        return userRepo.findById(userId);
    }

    // find by email
    public UserModel findUserModelByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    // find by full name
    public List<UserModel> findbyFullname(String fullName) {
        return userRepo.findByFullName(fullName);

    }

    //find by jwt token
    public UserModel findByJwtToken(String jwt){
        String email = jwtProvider.getEmailFromToken(jwt);
       
        return findUserModelByEmail(email);
    }

    // login purpose
    public User findbyemail(String email) {

        UserModel user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User Not found");

        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new User(user.getEmail(), user.getPassword(), authorities);
     

    }

  //follow
  public UserModel userFollow(String email,UserModel reqUser){
    
    UserModel userToFollow = findUserModelByEmail(email);
    if (reqUser.getFollowings().contains(userToFollow) && userToFollow.getFollowers().contains(reqUser)) {
        reqUser.getFollowings().remove(userToFollow);
        userToFollow.getFollowers().remove(reqUser);
    }
    reqUser.getFollowings().add(userToFollow);
    userToFollow.getFollowers().add(reqUser);

    userRepo.save(reqUser);
    userRepo.save(userToFollow);
    return userToFollow;
  }
    
  //search user
  public List<UserModel> searchUsers(String keyword){
    return userRepo.findByFullNameContainingIgnoreCase(keyword);
  }
}
