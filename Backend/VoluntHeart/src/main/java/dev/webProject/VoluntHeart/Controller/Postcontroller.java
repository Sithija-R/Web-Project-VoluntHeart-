package dev.webProject.VoluntHeart.Controller;

import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import dev.webProject.VoluntHeart.DTO.PostsDTO;
import dev.webProject.VoluntHeart.DTOmapper.PostsDTOmapper;
import dev.webProject.VoluntHeart.Exception.UserException;
import dev.webProject.VoluntHeart.Models.Posts;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Response.ApiResponse;
import dev.webProject.VoluntHeart.Service.PostService;
import dev.webProject.VoluntHeart.Service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
@RequestMapping
public class Postcontroller {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;


    //get all posts
    @GetMapping("/posts")
    public ResponseEntity<List<PostsDTO>> getAllPosts( @RequestHeader("Authorization") String jwt) {
        
        UserModel user = userService.findByJwtToken(jwt);

        List<Posts> allPosts = postService.allPosts();
        List<PostsDTO> allPostsDTO = PostsDTOmapper.toListOfPostDTOs(allPosts, user);

        return new ResponseEntity<>(allPostsDTO,HttpStatus.OK);

    }

    //get users all posts
    @GetMapping("posts/user/{userId}")
    public ResponseEntity<List<PostsDTO>> getUserAllPosts(@PathVariable ObjectId userId, @RequestHeader("Authorization") String jwt) {
        
        UserModel user = userService.findByID(userId);

        List<Posts> allPosts = user.getPostsIds();
        List<PostsDTO> allPostsDTO = PostsDTOmapper.toListOfPostDTOs(allPosts, user);

        return new ResponseEntity<>(allPostsDTO,HttpStatus.OK);

    }

    //get user liked posts
    @GetMapping("posts/user/{userId}/likes")
    public ResponseEntity<List<PostsDTO>> getUserLikedPosts(@PathVariable ObjectId userId, @RequestHeader("Authorization") String jwt) {
        
        UserModel user = userService.findByID(userId);

        List<Posts> allPosts = user.getLikedPosts();
        List<PostsDTO> allPostsDTO = PostsDTOmapper.toListOfPostDTOs(allPosts, user);

        return new ResponseEntity<>(allPostsDTO,HttpStatus.OK);

    }


    //create post
    @PostMapping("path")
    public ResponseEntity<PostsDTO> createPost(@RequestBody Map<String, String> req, @RequestHeader("Authorization") String jwt) {

        UserModel creator = userService.findByJwtToken(jwt);
        Posts newPost = postService.createPosts(req, creator);

        PostsDTO postsDTO = PostsDTOmapper.mapToPostsDTO(newPost, creator);
        return new ResponseEntity<>(postsDTO, HttpStatus.CREATED);

        // return new
        // ResponseEntity<Posts>(postService.createPosts(data.get("content"),data.get("image"),
        // data.get("video"),
        // Double.parseDouble(data.get("location_lat").toString()),Double.parseDouble(data.get("location_lng").toString()),
        // data.get("email")), HttpStatus.OK);
    }

    // public ResponseEntity<PostsDTO> createPost(@RequestBody Posts
    // req,@RequestHeader("Authorization") String jwt){
    // UserModel creator = userService.findByJwtToken(jwt);
    // Posts newPost= postService.createPosts(null, creator);

    // PostsDTO postsDTO = PostsDTOmapper.mapToPostsDTO(newPost, creator);
    // return new ResponseEntity<>(postsDTO,HttpStatus.CREATED);

    // }


    //delete post
    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePosts(@PathVariable ObjectId postId, @RequestHeader("Authorization") String jwt) throws UserException {
        UserModel deleteRequestor = userService.findByJwtToken(jwt);
        postService.deletePost(postId, deleteRequestor.getEmail());

        ApiResponse response = new ApiResponse("Successfully Deleted !", true);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}
