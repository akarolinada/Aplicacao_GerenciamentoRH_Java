package galapos.empresaGames.model;

public enum StatusTask {
	
	    PENDENTE("Pendente"),
	    EM_ANDAMENTO("Em andamento"),
	    CONCLUIDO("Concluido");

	    private String status;

	    StatusTask(String status){
	        this.status = status;
	    }

		public String getStatus() {
			return status;
		}

	   

}
