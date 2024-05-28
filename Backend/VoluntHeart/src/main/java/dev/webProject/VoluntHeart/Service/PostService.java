package dev.webProject.VoluntHeart.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import dev.webProject.VoluntHeart.Exception.UserException;
import dev.webProject.VoluntHeart.Models.Location;
import dev.webProject.VoluntHeart.Models.Posts;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Repository.PostRepo;
import dev.webProject.VoluntHeart.Repository.UserRepo;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    // @Autowired
    // private MongoTemplate mongoTemplate;

    // @Autowired
    // private UserService userService;

    @Autowired
    private UserRepo userRepo;

    // create post
    public Posts createPosts(Map<String,String> data,UserModel creator) {
        
        Posts post = new Posts();
        // Location location = new Location(Double.parseDouble(data.get("location_lat")), Double.parseDouble(data.get("location_lng")));
        
        String uniqueString = UUID.randomUUID().toString();

        post.setUniqueKey(uniqueString);
        post.setContent(data.get("content"));
        post.setImage(data.get("image"));
        post.setVideo(data.get("video"));
        // post.setLocation(location);
        post.setCreatedAt(LocalDateTime.now());
        post.setCreatedBy(creator);

    

        creator.getPostsIds().add(post);

        postRepo.insert(post);
        userRepo.save(creator);
        

        // Posts post = new Posts((data.get("content"),data.get("image"), data.get("video"), Double.parseDouble(data.get("location_lat").toString()),Double.parseDouble(data.get("location_lng").toString()),creator)

        // UserModel postCreator = userService.findUserModelByEmail(email);
        // Location location = new Location(location_lat, location_lng);
        // Posts post = postRepo.insert(new Posts(content, image, video, location, LocalDateTime.now(), postCreator));

        // mongoTemplate.update(UserModel.class)
        //         .matching(Criteria.where("email").is(email))
        //         .apply(new Update().push("postIds").value(post))
        //         .first();
        return post;
    }

  
    // delete posts (only for creator)
    public void deletePost(String postId, String email) throws UserException {
        Posts post = findByID(postId);
        UserModel creator = post.getCreatedBy();

        if (!email.equals(creator.getEmail())) {
            throw new UserException("Permission Denied!");
        }

        postRepo.deleteById(postId);
        creator.getPostsIds().remove(post);
    }


    public List<Posts> allPosts() {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        return postRepo.findAll(sort);
    }

    public Posts findByID(String id) {
        return postRepo.findByPostId(id);
    }

    public Posts findPostByUniqueKey(String uniqueKey){
        return postRepo.findByUniqueKey(uniqueKey);
    }

    public List<Posts> findByUser(UserModel user){
        return postRepo.findByCreatedBy(user);

    }
    // add method to search by content.

}
