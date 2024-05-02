package dev.webProject.VoluntHeart.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import dev.webProject.VoluntHeart.Models.Users.UserModel;
import lombok.Data;

@Data
public class Posts{
    
@MongoId
private ObjectId postId;

private String content;
private String image;
private String video;
private Location location;
private LocalDateTime createdAt;
private UserModel createdBy;

private List<LikeModel> postLikes = new ArrayList<>();

// public Posts(String content,String image,String video , Location location,LocalDateTime createdAt,UserModel createdBy){
//     this.content=content;
//     this.image=image;
//     this.video=video;
//     this.location=location;
//     this.createdAt= createdAt;
//     this.createdBy = createdBy;

// }



}
