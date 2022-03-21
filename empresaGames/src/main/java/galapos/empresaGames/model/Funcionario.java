package galapos.empresaGames.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id_funcionario;
	
	@Column(nullable = false, length = 150)
	private String func_nome;
	
	@Column(nullable = false, length = 150)
	private String func_cidade;

	@Column(nullable = false,length = 1)
	private Integer func_vinculo;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id_cargo")
	private Cargo cargo;	
	
	public Integer getId_funcionario() {
		return id_funcionario;
	}

	public Integer getFunc_vinculo() {
		return func_vinculo;
	}

	public void setFunc_vinculo(Integer func_vinculo) {
		this.func_vinculo = func_vinculo;
	}

	public void setId_funcionario(Integer id_funcionario) {
		this.id_funcionario = id_funcionario;
	}

	public String getFunc_nome() {
		return func_nome;
	}

	public void setFunc_nome(String func_nome) {
		this.func_nome = func_nome;
	}

	public String getFunc_cidade() {
		return func_cidade;
	}

	public void setFunc_cidade(String func_cidade) {
		this.func_cidade = func_cidade;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

    public void setFunc_vinculo(String string) {
    }
	
	


	
	
}
