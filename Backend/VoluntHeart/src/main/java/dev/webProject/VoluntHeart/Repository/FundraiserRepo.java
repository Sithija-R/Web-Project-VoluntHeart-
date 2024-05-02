package dev.webProject.VoluntHeart.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.webProject.VoluntHeart.Models.Users.FundraiserModel;

@Repository
public interface FundraiserRepo extends MongoRepository<FundraiserModel,ObjectId>{
    
public FundraiserModel findFundraiserByEmail(String email);


}
