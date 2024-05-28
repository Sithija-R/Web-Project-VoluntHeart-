package dev.webProject.VoluntHeart.DTO;



import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class LikeDTO {

    
    private String likeId;

    private String userId;

    private String likedPostId;


    
}
