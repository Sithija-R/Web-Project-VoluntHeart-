package dev.webProject.VoluntHeart.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.webProject.VoluntHeart.Models.LikeModel;
import dev.webProject.VoluntHeart.Models.Posts;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Repository.LikeRepo;

@Service
public class LikeService {

    @Autowired
    LikeRepo likeRepo;

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    // like unlike handling
    public LikeModel likeHandler(UserModel user, ObjectId postId) {
       
        Posts post = postService.findByID(postId);
        LikeModel isLikeExist = likeRepo.findLikeByUserAndPost(user, post);

        if (isLikeExist != null) {
            likeRepo.deleteById(isLikeExist.getLikeId());
            post.getPostLikes().remove(isLikeExist);
            user.getLikedPosts().remove(post);

        }

        LikeModel like = new LikeModel();
        like.setLikedPost(post);
        like.setUser(user);

        post.getPostLikes().add(like);
        user.getLikedPosts().add(post);
        likeRepo.save(like);

        return like;
    }
}
