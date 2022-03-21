package galapos.empresaGames.model;

import java.util.Date;

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

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ContrachequeG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_contracheque;

    @Column(nullable = false)
    private String cc_descricao;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(columnDefinition = "date", nullable = false)
    //@Temporal(TemporalType.DATE)
    private Date cc_data_emissao;

    @NumberFormat(pattern = "#.##0,00")
    @Column(nullable = false)
    private Double cc_valor;

    @Enumerated(EnumType.STRING)
    private StatusTitulo cc_status;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_gerente")
    private Gerente gerente;

	public Integer getId_contracheque() {
		return id_contracheque;
	}

	public void setId_contracheque(Integer id_contracheque) {
		this.id_contracheque = id_contracheque;
	}

	public String getCc_descricao() {
		return cc_descricao;
	}

	public void setCc_descricao(String cc_descricao) {
		this.cc_descricao = cc_descricao;
	}

	public Date getCc_data_emissao() {
		return cc_data_emissao;
	}

	public void setCc_data_emissao(Date cc_data_emissao) {
		this.cc_data_emissao = cc_data_emissao;
	}

	public Double getCc_valor() {
		return cc_valor;
	}

	public void setCc_valor(Double cc_valor) {
		this.cc_valor = cc_valor;
	}

	public StatusTitulo getCc_status() {
		return cc_status;
	}

	public void setCc_status(StatusTitulo cc_status) {
		this.cc_status = cc_status;
	}

	public Gerente getGerente() {
		return gerente;
	}

	public void setGerente(Gerente gerente) {
		this.gerente = gerente;
	}
    
    
}