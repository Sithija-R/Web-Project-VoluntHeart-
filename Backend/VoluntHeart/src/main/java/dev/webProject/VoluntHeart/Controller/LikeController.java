package dev.webProject.VoluntHeart.Controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.webProject.VoluntHeart.DTO.LikeDTO;
import dev.webProject.VoluntHeart.DTOmapper.LikeDTOmapper;
import dev.webProject.VoluntHeart.Models.LikeModel;
import dev.webProject.VoluntHeart.Models.Users.UserModel;
import dev.webProject.VoluntHeart.Service.LikeService;
import dev.webProject.VoluntHeart.Service.UserService;

@RestController
@RequestMapping
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private UserService userService;
    

//like handling
@PostMapping("/posts/{postId}")
    public ResponseEntity<LikeDTO> likePost(@PathVariable ObjectId postId,@RequestHeader("Authorization") String jwt){

        UserModel user = userService.findByJwtToken(jwt);
        LikeModel like = likeService.likeHandler(user,postId);

        LikeDTO likeDTO = LikeDTOmapper.mapToLikeDTO(like, user);
        
        return new ResponseEntity<LikeDTO>(likeDTO,HttpStatus.CREATED);


    }
    
}
