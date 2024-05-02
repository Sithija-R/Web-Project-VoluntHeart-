package dev.webProject.VoluntHeart.DTOmapper;

import dev.webProject.VoluntHeart.DTO.LikeDTO;
import dev.webProject.VoluntHeart.DTO.PostsDTO;
import dev.webProject.VoluntHeart.DTO.UserDTO;
import dev.webProject.VoluntHeart.Models.LikeModel;
import dev.webProject.VoluntHeart.Models.Users.UserModel;

public class LikeDTOmapper {
    
    public static LikeDTO mapToLikeDTO(LikeModel like,UserModel reqUser){

        UserDTO userDto = UserDTOmapper.mapToUserDTO(like.getUser());
        // UserDTO reqUserDTO = UserDTOmapper.mapToUserDTO(reqUser);
        PostsDTO postsDTO = PostsDTOmapper.mapToPostsDTO(like.getLikedPost(),reqUser);

        LikeDTO likeDTO = new LikeDTO();
        
        likeDTO.setLikeId(like.getLikeId());
        likeDTO.setLikedPost(postsDTO);
        likeDTO.setUser(userDto);


        return likeDTO;

    }
}
