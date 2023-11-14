package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="userimage")
public class UserImageDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int seq;
	
	@Column(name="imageName", length=50)
	private String imageName;
	
	@Column(name="imageContent", length=4000)
	private String imageContent;
	
	@Column(name="imageFileName", nullable=false, length=100)
	private String imageFileName;
	
	@Column(name="imageOriginalName", length=100) 
	private String imageOriginalName;
	
}
