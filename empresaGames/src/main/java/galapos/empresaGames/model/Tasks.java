package galapos.empresaGames.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tasks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_task;
	
	@Column(nullable = false, length = 150)
	private String task_titulo;
	
	@Column(nullable = false,length = 500)
	private String task_descricao;
	
	@Enumerated(EnumType.STRING)
	private StatusTask task_status;
	
	@JoinColumn(name = "id_cargo")
	@JsonIgnore
	@ManyToOne
	private Cargo cargo;

	public Integer getId_task() {
		return id_task;
	}

	public void setId_task(Integer id_task) {
		this.id_task = id_task;
	}

	public String getTask_titulo() {
		return task_titulo;
	}

	public void setTask_titulo(String task_titulo) {
		this.task_titulo = task_titulo;
	}

	

	public String getTask_descricao() {
		return task_descricao;
	}

	public void setTask_descricao(String task_descricao) {
		this.task_descricao = task_descricao;
	}

	public StatusTask getTask_status() {
		return task_status;
	}

	public void setTask_status(StatusTask task_status) {
		this.task_status = task_status;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}
	
	
	
	
	

}
