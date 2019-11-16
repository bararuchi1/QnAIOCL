package com.genweb.bean;

import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Id;

@Entity("UserLoginInfo")
public class UserDetail {
	@Id
	String userId;
	String userName;
	String password;
	String userType;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	@Override
	public String toString() {
		return " [userName=" + userName + ", password=" + password + ", userType=" + userType + "]";
	}

}
