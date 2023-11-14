package user.service;

import java.util.List;

import user.bean.UserDTO;
import user.bean.UserImageDTO;

public interface UserUploadService {

	public void upload(List<UserImageDTO> userImageList);

	public List<UserImageDTO> getList();

}
