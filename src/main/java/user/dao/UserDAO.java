package user.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import user.bean.UserDTO;

//@Repository
public interface UserDAO extends JpaRepository<UserDTO, String> {
	
	public Page<UserDTO> findByNameContaining(Pageable pageable,String searchValue);

	public Page<UserDTO> findByIdContaining(Pageable pageable, String searchValue);

	/*@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%',?1,'%')")
	public List<UserDTO> getUserSearchName(String searchValue);

	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%',?1,'%')")
	public List<UserDTO> getUserSearchId(String searchValue);*/
	
	/*
	@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%',:searchValue,'%')")
	public List<UserDTO> getUserSearchName(@Param("searchValue") String searchValue);

	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%',:searchValue,'%')")
	public List<UserDTO> getUserSearchId(@Param("searchValue") String searchValue);*/

}