package galapos.empresaGames.controllers.exception;

public class StandardError {
	
	private String date;
	private Integer status;
	private String error;
	
	public StandardError(String date, Integer status, String error) {
		this.date = date;
		this.status = status;
		this.error = error;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
	
	
	
	
	

}
