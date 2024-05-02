package dev.webProject.VoluntHeart.Repository;



import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.webProject.VoluntHeart.Models.Posts;
import java.util.List;
import dev.webProject.VoluntHeart.Models.Users.UserModel;




@Repository
public interface PostRepo extends MongoRepository<Posts,ObjectId>{


public Posts findPostByPostId(ObjectId postId);

List<Posts> findByCreatedBy(UserModel createdBy);

}
