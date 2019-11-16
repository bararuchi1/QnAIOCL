package com.genweb.common;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class CommonProperty
 */
public class CommonProperty extends HttpServlet {
	Logger LOGGER = Logger.getLogger(CommonProperty.class.getName());

	@Override
	public void init() throws ServletException {

			super.init();
			String dbUrl="mongodb://Mohanty:Allthatjazz1!@dedsec09-shard-00-00-npcsy.mongodb.net:27017,dedsec09-shard-00-01-npcsy.mongodb.net:27017,dedsec09-shard-00-02-npcsy.mongodb.net:27017/test?ssl=true&replicaSet=Dedsec09-shard-0&authSource=admin&retryWrites=true&w=majority";
			LOGGER.info("-------Read Commonparam IOCL-------");
			System.setProperty("DBCONNECTSTRING", dbUrl);
			LOGGER.info("-----Reading Commonparam completed ");
		

	}

	
}
