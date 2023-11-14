package user.service;

import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorage {
	
	public String uploadFile(String bucketName, String directoryPath, MultipartFile img);

	public void deleteFile(String bucketName, String imageFileName);

}
