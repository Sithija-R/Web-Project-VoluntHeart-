


export const uploadMedia = async(media)=>{
    if(media){
        const data = new FormData();
        data.append("file",media);
        data.append("upload_preset","instagram");
        data.append("cloud_name","dibpybwcy")

        const res = await fetch("https://api.cloudinary.com/v1_1/dibpybwcy/auto/upload",
            {
                method:"post",
                body:data,
              
        })

        const fileData = await res.json();
        console.log("uploded ",fileData)
        return fileData.url.toString();
    }
   

    else console.log("error uploading")
}