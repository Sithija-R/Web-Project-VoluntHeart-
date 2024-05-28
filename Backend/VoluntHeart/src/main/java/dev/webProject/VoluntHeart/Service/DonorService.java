package dev.webProject.VoluntHeart.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.webProject.VoluntHeart.Models.Users.DonorModel;
import dev.webProject.VoluntHeart.Repository.DonorRepo;

@Service
public class DonorService {
    
    @Autowired
    private DonorRepo donorRepo;

     public List<DonorModel> getAll(){
        return donorRepo.findAll();
    }

    public DonorModel findByEmail(String email){
        return donorRepo.findByEmail(email);
    }

    //   public User findbyemail(String email){

    //     DonorModel donor = null;
    //     donorRepo.findFundraiserByEmail(email);
    //     if (donor==null||donor.isGoogleLogin()) {
    //         throw new UsernameNotFoundException("User Not found");
            
    //     }
    //     List<GrantedAuthority> authorities = new ArrayList<>();
    //     return new User(donor.getEmail(),donor.getPassword(),authorities);

    // }

//update profile
    public DonorModel updateUser(String email, DonorModel requester){
       
        DonorModel donor = findByEmail(email);

        if (requester.getFullName()!=null) {
            donor.setFullName(requester.getFullName());
        }
        if (requester.getWebsite()!=null) {
            donor.setWebsite(requester.getWebsite());
        }
        if (requester.getAbout()!=null) {
            donor.setAbout(requester.getAbout());
        }
        if (requester.getMobile()!=null) {
            donor.setMobile(requester.getMobile());
        }
        if (requester.getProfilePic()!=null) {
            donor.setProfilePic(requester.getProfilePic());
        }
        if (requester.getCoverImage()!=null) {
            donor.setCoverImage(requester.getCoverImage());
        }
        if (requester.getUserLocation()!=null) {
            donor.setUserLocation(requester.getUserLocation());
        }

        return donorRepo.save(donor);
    }
}
