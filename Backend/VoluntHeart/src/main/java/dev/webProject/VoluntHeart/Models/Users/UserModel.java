package dev.webProject.VoluntHeart.Models.Users;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.webProject.VoluntHeart.Models.Location;
import dev.webProject.VoluntHeart.Models.Posts;
import lombok.Data;

@Data
public class UserModel {

    @MongoId
    ObjectId userId;

    String email;
    String password;
    String fullName;
    String website;
    String mobile;
    String about;
    String profilePic;
    String coverImage;
    boolean donor;
    Location userLocation;
    private boolean googleLogin;

    @DocumentReference
    @JsonIgnore
    List<Posts> postsIds = new ArrayList<>();

    @DocumentReference
    List<Posts> likedPosts = new ArrayList<>();

    List<UserModel> followers = new ArrayList<>();
    
    List<UserModel> followings = new ArrayList<>();

}
