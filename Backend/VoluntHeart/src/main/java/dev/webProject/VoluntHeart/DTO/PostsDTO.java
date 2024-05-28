package dev.webProject.VoluntHeart.DTO;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;

import dev.webProject.VoluntHeart.Models.Location;
import lombok.Data;

@Data
public class PostsDTO {

    private String postId;

    private String uniqueKey;
    private String content;
    private String image;
    private String video;
    private Location location;
    private LocalDateTime createdAt;
    private UserDTO createdBy;

    private int totalLikes;
    private boolean isLiked;
    private boolean isCreator;

}
