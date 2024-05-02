package dev.webProject.VoluntHeart.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.webProject.VoluntHeart.Models.Users.DonorModel;

@Repository
public interface DonorRepo extends MongoRepository<DonorModel,ObjectId>{

    DonorModel findDonorByEmail(String email);
    
}
