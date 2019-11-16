package com.genweb.common;

import java.util.Date;
import java.util.logging.Logger;

import com.genweb.bean.Question;
import com.genweb.bean.UserDetail;
import com.mongodb.MongoClient;

import dev.morphia.Datastore;
import dev.morphia.Morphia;

public class InsertIntoMongo {
	private static Logger LOGGER = Logger.getLogger(InsertIntoMongo.class.getName());

	public static void main(String[] args) {
		MongoConnectionObject mongo = new MongoConnectionObject();
		Datastore datastore = mongo.getDataStore();
		
		
		/*
		 * String uri=
		 * "mongodb://Mohanty:Allthatjazz1!@dedsec09-shard-00-00-npcsy.mongodb.net:27017,dedsec09-shard-00-01-npcsy.mongodb.net:27017,dedsec09-shard-00-02-npcsy.mongodb.net:27017/test?ssl=true&replicaSet=Dedsec09-shard-0&authSource=admin&retryWrites=true&w=majority";
		 * //String uri2=
		 * "mongodb+srv://Mohanty:<password>@dedsec09-npcsy.mongodb.net/test?retryWrites=true&w=majority";
		 * MongoClient client=new MongoClient(uri); Morphia morphia = new Morphia();
		 * morphia.mapPackage("com.genweb.bean"); Datastore data =
		 * morphia.createDatastore(client, "bararuchi"); data.ensureIndexes();
		 */
		// Change the user details accordingly
		UserDetail userDetails = new UserDetail();
		userDetails.setUserId("1002");
		userDetails.setUserName("Tanmay");
		userDetails.setUserType("USER");
		userDetails.setPassword("Modiji");
		
		//questionDetails
		Question question=new Question();
		question.setInsertedDate(new Date()+"");
		question.setQuestionCatagory("Mechanics");
		question.setQuestionAnswer("Some random answer123");
		question.setQuestionDesc("Some question123");
		question.setQuestionId("10002");
		
		
		
		try {
			datastore.save(userDetails);
			LOGGER.info("Inserted to MongoDb I guess");
		} catch (Exception e) {
			
			LOGGER.info(e.getMessage());
			e.printStackTrace();
		}

	}

}
