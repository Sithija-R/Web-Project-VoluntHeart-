package dev.webProject.VoluntHeart.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.webProject.VoluntHeart.Models.LikeModel;
import dev.webProject.VoluntHeart.Models.Posts;
import dev.webProject.VoluntHeart.Models.Users.UserModel;

@Repository
public interface LikeRepo extends MongoRepository<LikeModel,ObjectId>{

    public List<LikeModel> findLikeByPostId(ObjectId postIdentifier);

    public LikeModel findLikeByUserAndPost(UserModel user,Posts post);

   

    
}
