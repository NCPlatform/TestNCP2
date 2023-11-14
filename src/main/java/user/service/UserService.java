package user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import user.bean.UserDTO;

public interface UserService {

	public String isExistId(String id);

	public void write(UserDTO userDTO);

	public Page<UserDTO> getList(Pageable pageable, String searchKey,String searchValue);

	public void delete(String id);

	public void update(UserDTO userDTO);

	public UserDTO getItem(String id);


}
