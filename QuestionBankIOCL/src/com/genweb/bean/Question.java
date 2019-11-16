package com.genweb.bean;

import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Id;

@Entity("QuestionsAndAnswers")
public class Question {
@Id
String questionId;
String questionType;
String questionDesc;
String questionAnswer;
String insertedDate;
String questionCatagory;
public String getQuestionId() {
	return questionId;
}
public void setQuestionId(String questionId) {
	this.questionId = questionId;
}
public String getQuestionType() {
	return questionType;
}
public void setQuestionType(String questionType) {
	this.questionType = questionType;
}
public String getQuestionDesc() {
	return questionDesc;
}
public void setQuestionDesc(String questionDesc) {
	this.questionDesc = questionDesc;
}
public String getQuestionAnswer() {
	return questionAnswer;
}
public void setQuestionAnswer(String questionAnswer) {
	this.questionAnswer = questionAnswer;
}
public String getInsertedDate() {
	return insertedDate;
}
public void setInsertedDate(String insertedDate) {
	this.insertedDate = insertedDate;
}
public String getQuestionCatagory() {
	return questionCatagory;
}
public void setQuestionCatagory(String questionCatagory) {
	this.questionCatagory = questionCatagory;
}
@Override
public String toString() {
	return " [questionId=" + questionId + ", questionType=" + questionType + ", questionDesc=" + questionDesc
			+ ", questionAnswer=" + questionAnswer + ", insertedDate=" + insertedDate + ", questionCatagory="
			+ questionCatagory + "]";
}

}
