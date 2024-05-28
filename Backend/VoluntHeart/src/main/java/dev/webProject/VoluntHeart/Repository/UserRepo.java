package dev.webProject.VoluntHeart.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import dev.webProject.VoluntHeart.Models.Users.UserModel;

@Repository
public interface UserRepo extends MongoRepository<UserModel, String> {

    public List<UserModel> findByFullName(String fullName);

    public UserModel findByEmail(String email);
   

    public List<UserModel> findByFullNameContainingIgnoreCase(String fullName);

}
