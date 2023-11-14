package user.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.UserImageDTO;

public interface UserUploadDAO extends JpaRepository<UserImageDTO, Integer> {

	public List<UserImageDTO> findAllByOrderBySeqDesc();

}
