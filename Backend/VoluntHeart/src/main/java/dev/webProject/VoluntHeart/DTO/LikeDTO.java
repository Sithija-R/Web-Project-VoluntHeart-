package dev.webProject.VoluntHeart.DTO;

import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class LikeDTO {

    
    private ObjectId likeId;

    private UserDTO user;

    private PostsDTO likedPost;


    
}
