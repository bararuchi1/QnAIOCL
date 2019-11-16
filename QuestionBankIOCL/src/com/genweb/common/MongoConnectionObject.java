package com.genweb.common;

import com.mongodb.MongoClientURI;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.logging.Logger;

import javax.ws.rs.Path;


import com.mongodb.MongoClient;

import dev.morphia.Datastore;
import dev.morphia.Morphia;

public class MongoConnectionObject {
	Logger LOGGER = Logger.getLogger(MongoConnectionObject.class.getName());
	private static MongoConnectionObject instance = new MongoConnectionObject();

	private static MongoClient mongo = null;
	private static Datastore dataStore = null;
	private static Morphia morphia = null;

	public MongoClient getMongoDbObject() {
		FileReader file = null;
		String commomPropertyFilePath = "E:\\configFiles";

		MongoClientURI uri = null;
		MongoClient mongoClient = null;
		if (mongoClient == null) {
			try {
				LOGGER.info("DBCONNECTSTRING ::"+System.getProperty("DBCONNECTSTRING"));
				//uri = new MongoClientURI(System.getProperty("DBCONNECTSTRING"));//"mongodb://Mohanty:Allthatjazz1!@dedsec09-shard-00-00-npcsy.mongodb.net:27017,dedsec09-shard-00-01-npcsy.mongodb.net:27017,dedsec09-shard-00-02-npcsy.mongodb.net:27017/test?ssl=true&replicaSet=Dedsec09-shard-0&authSource=admin&retryWrites=true&w=majority");
				uri = new MongoClientURI("mongodb://Mohanty:Allthatjazz1!@dedsec09-shard-00-00-npcsy.mongodb.net:27017,dedsec09-shard-00-01-npcsy.mongodb.net:27017,dedsec09-shard-00-02-npcsy.mongodb.net:27017/test?ssl=true&replicaSet=Dedsec09-shard-0&authSource=admin&retryWrites=true&w=majority");
				mongoClient = new MongoClient(uri);
				LOGGER.info("mongoClient generated.");

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return mongoClient;
	}

	public Morphia getMorphia() {
		if (morphia == null) {
			morphia = new Morphia();
			morphia.mapPackage("com.genweb.bean");
			LOGGER.info("Package Mapped");
		}
		return morphia;
	}

	public Datastore getDataStore() {
		String dbName = "TanmayDb";
		if (dataStore == null) {

			dataStore = getMorphia().createDatastore(getMongoDbObject(), dbName);
			LOGGER.info("Datastore created.");
		}
		return dataStore;
	}

}
