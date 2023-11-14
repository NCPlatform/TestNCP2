package user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import user.bean.UserDTO;
import user.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDAO userDAO;

	@Override
	public String isExistId(String id) {
		Optional<UserDTO> userDTO = userDAO.findById(id);
		System.out.println(userDTO); // if userDTO dont have value, it will print Optional.empty
		
		if(userDTO.isPresent()) { // if userDTO has value, it will return true;
			return "exist";
		}else{
			return "non_exist";
		}
	}

	@Override
	public void write(UserDTO userDTO) {
		userDAO.save(userDTO);
	}

	@Override
	public Page<UserDTO> getList(Pageable pageable, String searchKey,String searchValue) {
		if(searchKey == null || searchKey.equals("")) {
			return userDAO.findAll(pageable);
		}
		// 쿼리 메소드 사용
		else if (searchKey.equals("name")){
			return userDAO.findByNameContaining(pageable, searchValue);
		}else if(searchKey.equals("id")) {
			return userDAO.findByIdContaining(pageable, searchValue);
		}else {
			return null;
		}
		/*
		// 쿼리 어노테이션 사용
		else if (searchKey.equals("이름")){
			return userDAO.getUserSearchName(searchValue);
		}else if(searchKey.equals("아이디")) {
			return userDAO.getUserSearchId(searchValue);
		}else {
			return null;
		}
		*/
	}

	@Override
	public void delete(String id) {
		userDAO.deleteById(id);
	}

	@Override
	public void update(UserDTO userDTO) {
		userDAO.save(userDTO);
	}

	@Override
	public UserDTO getItem(String id) {
		Optional<UserDTO> userDTO = userDAO.findById(id);
		
		if(userDTO.isPresent()) { // if userDTO has value, it will return true;
			return userDTO.get();
		}else{
			return null;
		}
	}

}
