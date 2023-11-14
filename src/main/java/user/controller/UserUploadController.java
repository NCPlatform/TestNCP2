package user.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import user.bean.UserDTO;
import user.bean.UserImageDTO;
import user.service.ObjectStorage;
import user.service.UserUploadService;

@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserUploadController {
	
	@Autowired
	private UserUploadService userUploadService;
	
	@Autowired
	private ObjectStorage objectStorageService;
	
	private String bucketName ="testmavenstorage";
	
	@PostMapping(path="upload", produces = "application/json;charset=UTF-8")
	public void upload(@RequestPart UserImageDTO userImageDTO,
			@RequestPart List<MultipartFile> list,
			HttpSession session) { // 받는 데이터는 RequestPart 어노테이션을 사용한다.
		
		String filepath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제 폴더 : " + filepath);
		
		File file;
		String originalFileName;
		String fileName;
		
		List<UserImageDTO> userImageList = new ArrayList<UserImageDTO>();
		
		for(MultipartFile img: list) {
			originalFileName = img.getOriginalFilename();
			
			fileName = objectStorageService.uploadFile(bucketName, "storage/", img);
			
			file = new File(filepath, originalFileName);
			
			try {
				img.transferTo(file);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			UserImageDTO dto = new UserImageDTO();
			System.out.println("DTO파일이름:"+userImageDTO.getImageName());
			dto.setImageName(userImageDTO.getImageName());//상품명
			dto.setImageContent(userImageDTO.getImageContent());//상품내용
			dto.setImageFileName(fileName);//UUID
			dto.setImageOriginalName(originalFileName);
			
			userImageList.add(dto);
		}
		
		userUploadService.upload(userImageList);
		System.out.println(userImageList);
	}
	
	@GetMapping(value="getUploadList")
	@ResponseBody
	public List<UserImageDTO> getlist() {
		
		System.out.println("리스트 가져오기");
		
		return userUploadService.getList();
	}
}
