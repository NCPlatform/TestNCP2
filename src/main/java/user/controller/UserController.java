package user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import user.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping(value="isExistId")
	@ResponseBody
	public String isExistId(@RequestParam String id) {
		return userService.isExistId(id);
	}
	
	
	@PostMapping(value="write")
	@ResponseBody
	public void write(@ModelAttribute UserDTO userDTO) {
		userService.write(userDTO);
	}
	
	@GetMapping(value="getList")
	@ResponseBody
	public Page<UserDTO> getlist(@PageableDefault(size=3, sort="name", direction=Sort.Direction.ASC) Pageable pageable, @RequestParam(required=false,value="") String searchKey, @RequestParam(required=false,value="") String searchValue ) {
		
		Page<UserDTO> test = userService.getList(pageable,searchKey,searchValue);
		
		return test;
	}
	
	@DeleteMapping(value="delete")
	public String delete(@RequestParam String id) {
		userService.delete(id);
		return id;
	}
	
	@GetMapping(value="getItem")
	@ResponseBody
	public UserDTO getItem(@RequestParam String id) {
		return userService.getItem(id);
	}
	
	@PutMapping(value="update")
	@ResponseBody
	public void update(@ModelAttribute UserDTO userDTO) {
		userService.update(userDTO);
	}
}
