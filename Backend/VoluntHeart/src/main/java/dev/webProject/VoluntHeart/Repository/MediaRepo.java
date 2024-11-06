package dev.webProject.VoluntHeart.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.webProject.VoluntHeart.Models.Media;

@Repository
public interface MediaRepo extends MongoRepository<Media,String>{
    
}
