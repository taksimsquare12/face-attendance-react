export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "my_preset"); 
  
  const res = await fetch("https://api.cloudinary.com/v1_1/dtmyq6csl/image/upload", {
    method: "POST",
    body: data
  });
  
  const result = await res.json();
  console.log("Uploaded Image URL:", result.secure_url);
  return result.secure_url;
}
