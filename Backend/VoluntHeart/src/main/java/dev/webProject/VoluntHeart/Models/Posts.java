package dev.webProject.VoluntHeart.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.MongoId;

import dev.webProject.VoluntHeart.Models.Users.UserModel;
import lombok.Data;

@Data
@Document(collection = "posts")
public class Posts{
    
@Id
private String postId;

private String uniqueKey;
private String content;
private String image;
private String video;
private Location location;
private LocalDateTime createdAt;
private UserModel createdBy;

@DocumentReference
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
