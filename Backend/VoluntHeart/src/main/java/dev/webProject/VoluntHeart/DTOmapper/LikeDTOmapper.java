package dev.webProject.VoluntHeart.DTOmapper;

import dev.webProject.VoluntHeart.DTO.LikeDTO;
import dev.webProject.VoluntHeart.DTO.PostsDTO;
import dev.webProject.VoluntHeart.DTO.UserDTO;
import dev.webProject.VoluntHeart.Models.LikeModel;
import dev.webProject.VoluntHeart.Models.Users.UserModel;

public class LikeDTOmapper {
    
    public static LikeDTO mapToLikeDTO(LikeModel like){

        LikeDTO likeDTO = new LikeDTO();
        
        likeDTO.setLikeId(like.getLikeId());
        likeDTO.setUserId(like.getUserId());;
        likeDTO.setLikedPostId(like.getLikedPostId());;


        return likeDTO;

    }
}
