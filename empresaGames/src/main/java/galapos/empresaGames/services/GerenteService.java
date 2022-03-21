package galapos.empresaGames.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.repository.CargoRepository;
import galapos.empresaGames.repository.GerenteRepository;

@Service
public class GerenteService {
	
	@Autowired
	private GerenteRepository gerenteRepository;
	
	@Autowired
	private CargoService cargoService;

	@Autowired
	private CargoRepository cargoRepository;
	
	//busca todos os gerentes
	public List<Gerente> mostrarTodosGerentes(){
		return gerenteRepository.findAll();
	}
	
	//busca um gerente
	public Gerente mostrarUmGerente(Integer id_gerente) {
		Optional<Gerente> gerente = gerenteRepository.findById(id_gerente);
		return gerente.orElseThrow();
	}

	//mostra o gerente de um cargo especifico 
	public Gerente mostrarGerenteDoCargo(Integer id_cargo){
		Gerente gerente = gerenteRepository.buscarGerenteDoCargo(id_cargo);
		return gerente;
	}	

	//busca todos os gerentes sem cargo para aparecer na atribuição de gerente para um determinado cargo
	public List<Gerente> gerenteSemCargo(){
		return gerenteRepository.gerenteSemCargo();
	}

	public List<List> cargoSemGerente(){
		return gerenteRepository.cargoSemGerente();
	}


	public List<List> mostrarGerenteComSeuCargo(){
		return gerenteRepository.gerenteComSeuCargo();
	}

	public Gerente cadastrarGerente(Gerente gerente){
		gerente.setId_gerente(null);
		gerente.setGer_vinculo(1);
		return gerenteRepository.save(gerente);
	}

	public Gerente vinculoGerente(Integer id_gerente) {
		Gerente gerente = mostrarUmGerente(id_gerente);
		Integer vinculo = gerente.getGer_vinculo();
		Cargo cargo = cargoService.mostraCargoDoGerente(id_gerente);
		if (vinculo == 1) {
			gerente.setGer_vinculo(0);
			gerente.setCargo(null);
			cargo.setGerente(null);
			
		} else {
			gerente.setGer_vinculo(1);
		}
		return gerenteRepository.save(gerente);
	}

	public Gerente atribuirCargo(Integer id_gerente,Integer id_cargo){
		Gerente gerente = mostrarUmGerente(id_gerente);
		Cargo cargoAnterior = cargoService.mostraCargoDoGerente(id_gerente);
		Cargo cargo = cargoService.buscarUmCargo(id_cargo);
		if(gerente.getCargo()!=null) {
			gerente.setCargo(null);
			cargoAnterior.setGerente(null);			
		}
		gerente.setCargo(cargo);
		cargo.setGerente(gerente);
		return gerenteRepository.save(gerente);
	}

	public Gerente editarGerente(Gerente gerente) {
		mostrarUmGerente(gerente.getId_gerente());
		Integer idCargo = cargoRepository.mostraIdCargo(gerente.getId_gerente());
		if(idCargo != null) {
		Cargo cargo = cargoService.buscarUmCargo(idCargo);
		gerente.setCargo(cargo);
		}
		gerente.setGer_vinculo(1);	    	    
		return gerenteRepository.save(gerente);
	}
	
	public Gerente salvarFoto(Integer id_gerente, String caminhoFoto) {
		Gerente gerente = mostrarUmGerente(id_gerente);
		gerente.setGer_foto(caminhoFoto);
		return gerenteRepository.save(gerente);
	}
	
	public Gerente buscarGerentePeloNome(String ger_nome){
		Gerente gerente = gerenteRepository.fetchByName(ger_nome);
		return gerente;
	}
	
	public Gerente funcionarioPromovido() {
		Integer idGerente = gerenteRepository.funcionarioPromovido();
		Gerente gerente = mostrarUmGerente(idGerente);
		return gerente;
	}




}
