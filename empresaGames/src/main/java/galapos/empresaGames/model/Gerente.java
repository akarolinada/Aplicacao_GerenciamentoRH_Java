package galapos.empresaGames.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Gerente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_gerente;
	
	@Column(nullable= false, length=150)
	private String ger_nome;
	
	@Column(nullable=true, length=150)
	private Integer ger_idade;
	
	@Column(nullable=false, length=150)
	private String ger_cidade;
	
	@Column(nullable = true)
	private String ger_foto;

	@Column(nullable = false)
	private Integer ger_vinculo;
	
	@OneToOne
	@JoinColumn(name = "id_cargo", unique = true)
	@JsonIgnore
	private Cargo cargo;

	public Integer getId_gerente() {
		return id_gerente;
	}

	public void setId_gerente(Integer id_gerente) {
		this.id_gerente = id_gerente;
	}

	public String getGer_nome() {
		return ger_nome;
	}

	public void setGer_nome(String ger_nome) {
		this.ger_nome = ger_nome;
	}

	public Integer getGer_idade() {
		return ger_idade;
	}

	public void setGer_idade(Integer ger_idade) {
		this.ger_idade = ger_idade;
	}

	public String getGer_cidade() {
		return ger_cidade;
	}

	public void setGer_cidade(String ger_cidade) {
		this.ger_cidade = ger_cidade;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public String getGer_foto() {
		return ger_foto;
	}

	public void setGer_foto(String ger_foto) {
		this.ger_foto = ger_foto;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public Integer getGer_vinculo() {
		return ger_vinculo;
	}

	public void setGer_vinculo(Integer ger_vinculo) {
		this.ger_vinculo = ger_vinculo;
	}

	
}
