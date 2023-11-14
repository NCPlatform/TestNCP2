package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo","main.controller","user.*","spring.conf"})
@EnableJpaRepositories("user.dao")
@EntityScan("user.bean")
public class JpAwithReactApplication {

	public static void main(String[] args) {
		System.out.println("프로젝트 가동");
		SpringApplication.run(JpAwithReactApplication.class, args);
	}

}
