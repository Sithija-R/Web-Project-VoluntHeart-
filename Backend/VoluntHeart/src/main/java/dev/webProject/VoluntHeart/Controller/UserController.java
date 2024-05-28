package dev.webProject.VoluntHeart.Controller;

import org.springframework.web.bind.annotation.RestController;

import dev.webProject.VoluntHeart.DTO.UserDTO;
import dev.webProject.VoluntHeart.DTOmapper.UserDTOmapper;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping
public class UserController {

  @Autowired
  private UserService userService;

// api test
  @GetMapping("/root/users")
  public ResponseEntity<String> userDemo() {
    return new ResponseEntity<String>("user controller", HttpStatus.OK);
  }


//get all users
  public ResponseEntity<List<UserModel>> getAllUsers() {
    return new ResponseEntity<List<UserModel>>(userService.allUsers(), HttpStatus.OK);
  }

  //search by name
  @GetMapping("/search")
  public ResponseEntity<List<UserDTO>> searchUsersByName(@RequestParam String keyword){
    List<UserModel> usersWithKeyword= userService.findbyFullname(keyword);

    List<UserDTO> userDTOsWithKeyword = UserDTOmapper.toListUserDtos(usersWithKeyword);

    return new ResponseEntity<>(userDTOsWithKeyword,HttpStatus.ACCEPTED);
  }
 

  //get user profile
  @GetMapping()
  public ResponseEntity<UserDTO> getUser(@PathVariable String email,@RequestHeader("Authorization") String jwt){
    UserModel reqUser = userService.findByJwtToken(jwt);
    UserModel user2 = userService.findUserModelByEmail(email);

    UserDTO userDTO_2 = UserDTOmapper.mapToUserDTO(user2);

    userDTO_2.setFollowed(checkFollowStatus(reqUser,user2));
    return new ResponseEntity<UserDTO>(userDTO_2,HttpStatus.ACCEPTED);
  }


  @GetMapping("/user/profile")
  public ResponseEntity<UserDTO> getUserProfile(@RequestHeader("Authorization") String jwt){
   UserModel reqUser = userService.findByJwtToken(jwt);

    UserDTO userDTO = UserDTOmapper.mapToUserDTO(reqUser);

   
    return new ResponseEntity<UserDTO>(userDTO,HttpStatus.ACCEPTED);
  }

  //follow user
  @PutMapping("follow/{userId}")
  public ResponseEntity<UserDTO> followUserHandling(@PathVariable String userId,@RequestHeader("Authorization") String jwt){
    UserModel followRequestor = userService.findByJwtToken(jwt);

    UserModel userTofollow = userService.userFollow(userId, followRequestor);

    UserDTO usertoFollowDTO = UserDTOmapper.mapToUserDTO(userTofollow);

    usertoFollowDTO.setFollowed(checkFollowStatus(followRequestor, userTofollow));

    return new ResponseEntity<>(usertoFollowDTO,HttpStatus.ACCEPTED);

  }



@GetMapping("user/get/{userId}")
public ResponseEntity<Optional<UserModel>> getuserId(@PathVariable String userId){
Optional<UserModel> uname = userService.findByID(userId);

  return new ResponseEntity<Optional<UserModel>>(uname,HttpStatus.OK);
}



  //check for follow status
  private final boolean checkFollowStatus(UserModel reqUser, UserModel user2) {
    return reqUser.getFollowings().contains(user2);
  }
}
