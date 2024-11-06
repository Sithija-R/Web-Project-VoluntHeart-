package dev.webProject.VoluntHeart.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "media")
public class Media {

@Id
private String id;

private String name;
private String type;
private String url;


}
