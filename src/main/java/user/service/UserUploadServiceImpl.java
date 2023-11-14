package user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import user.bean.UserDTO;
import user.bean.UserImageDTO;
import user.dao.UserUploadDAO;

@Service
@Transactional
public class UserUploadServiceImpl implements UserUploadService {
	
	@Autowired
	UserUploadDAO userUploadDAO;

	@Override
	public void upload(List<UserImageDTO> userImageList) {
		
		for(UserImageDTO dto : userImageList) {
			userUploadDAO.save(dto);
		}
		
	}

	@Override
	public List<UserImageDTO> getList() {
		//return userUploadDAO.findAll();
		return userUploadDAO.findAllByOrderBySeqDesc();
	}

}
