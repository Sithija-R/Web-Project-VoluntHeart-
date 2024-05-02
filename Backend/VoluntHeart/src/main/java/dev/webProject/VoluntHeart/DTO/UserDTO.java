package dev.webProject.VoluntHeart.DTO;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;


import dev.webProject.VoluntHeart.Models.Location;
import lombok.Data;

@Data
public class UserDTO {

   
    ObjectId userId;

    String email;
    String fullName;
    String website;
    String mobile;
    String about;
    String profilePic;
    String coverImage;
    boolean donor;
    Location userLocation;
    private boolean googleLogin;

    private boolean isFollowed;

    private List<UserDTO> followers = new ArrayList<>();
    private List<UserDTO> following = new ArrayList<>();

    
    
}
