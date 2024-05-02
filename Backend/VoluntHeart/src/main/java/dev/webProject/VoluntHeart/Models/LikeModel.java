package dev.webProject.VoluntHeart.Models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import dev.webProject.VoluntHeart.Models.Users.UserModel;
import lombok.Data;

@Data
public class LikeModel {

    @Id
    private ObjectId likeId;
   

    private UserModel user;

    private Posts likedPost;

}
