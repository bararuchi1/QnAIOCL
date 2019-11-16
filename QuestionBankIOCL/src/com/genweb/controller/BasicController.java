package com.genweb.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.genweb.bean.ProductCatagory;
import com.genweb.bean.Question;
import com.genweb.bean.UserDetail;
import com.genweb.common.MongoConnectionObject;

import dev.morphia.Datastore;

@Path("/basicController")
public class BasicController {
	Logger LOGGER = Logger.getLogger(BasicController.class.getName());
	MongoConnectionObject conn = new MongoConnectionObject();

	@Path("/getLoginDetails")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getLoginDetails(UserDetail userDetails) {

		Datastore datastore = conn.getDataStore();
		Map<String, String> result = new HashMap<String, String>();

		UserDetail retrievedUser = null;

		List<UserDetail> userDetailsList = datastore.createQuery(UserDetail.class).field("userName")
				.equalIgnoreCase(userDetails.getUserName()).field("password").equalIgnoreCase(userDetails.getPassword())
				.find().toList();
		if (userDetailsList != null && userDetailsList.size() > 0) {
			retrievedUser = userDetailsList.get(0);
		}
		if (retrievedUser == null) {
			result.put("status", "fail");
			result.put("statusCode", "0");
		} else {
			LOGGER.info("Retrived User :" + retrievedUser);
			result.put("status", "Success");
			result.put("statusCode", "1");
			result.put("userType", retrievedUser.getUserType());
		}

		result.put("MapFucntionality", "working");
		return Response.ok(result).build();
	}

	@Path("/demoPost")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public UserDetail postMethodDemo() {
		UserDetail userDetails = new UserDetail();
		userDetails.setUserName("ModiJI");
		userDetails.setPassword("aaa");
		userDetails.setUserType("ADMo");
		LOGGER.info("demoPost Called");
		return userDetails;
	}

	@Path("/fetchQuestionDetails/{questionCatagory}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Question> getQuestionList(@PathParam("questionCatagory") String questionCatagory) {
		List<Question> questionList = null;
		Datastore datastore = conn.getDataStore();

		questionList = datastore.createQuery(Question.class).field("questionCatagory").equalIgnoreCase(questionCatagory)
				.find().toList();
		LOGGER.info("Question List :" + questionList);
		return questionList;
	}

	@Path("/getProductCatagory")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ProductCatagory> getQuestionCatagory() {
		List<ProductCatagory> productCatogory=null;
		Datastore datastore=conn.getDataStore();
		
		productCatogory=datastore.createQuery(ProductCatagory.class).asList();
		
		LOGGER.info(productCatogory.toString());
		
		
		return productCatogory;
	}

	@Path("/insertQnAintoDB")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertQnAintoDB(ArrayList<Question> qnAlist) {
		Map<String, String> result=new HashMap<String, String>();
		Datastore datastore=conn.getDataStore();
		try{datastore.save(qnAlist);
		result.put("ErrCode", "1");
		result.put("ErrMsg", "Success");
		}catch(Exception e) {
			result.put("ErrCode", "0");
			result.put("ErrMsg", "Failed");
			e.printStackTrace();
		}
		LOGGER.info("Return Status "+result.toString());
		return Response.ok(result).build();
		}
}
