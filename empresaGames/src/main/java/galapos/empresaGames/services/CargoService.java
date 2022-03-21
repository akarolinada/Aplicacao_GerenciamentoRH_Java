package galapos.empresaGames.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.repository.CargoRepository;
import galapos.empresaGames.services.exceptions.ObjectNotFoundException;

@Service
public class CargoService {

	@Autowired
	private CargoRepository cargoRepository;

	@Lazy
	@Autowired
	private GerenteService gerenteService;

	public List<Cargo> mostraTodosCargos() {
		return cargoRepository.findAll();
	}

	public Cargo buscarUmCargo(Integer id_cargo) {
		Optional<Cargo> cargo = cargoRepository.findById(id_cargo);
		return cargo.orElseThrow(() -> new ObjectNotFoundException("Não encontrado. Id procurado: " + id_cargo));
	}

	public List<List> cargoComSeuGerente(){
		return cargoRepository.cargoComSeuGerente();
	}

	public Cargo mostrarCargoDoFuncionario(Integer id_funcionario){
		Cargo cargo = cargoRepository.buscarCargoDoFuncionario(id_funcionario);
		return cargo;
	}

	public Cargo mostraCargoDoGerente(Integer id_gerente){
		Cargo cargo = cargoRepository.buscarCargoDoGerente(id_gerente);
		return cargo;
	}

	public Cargo cadastrarCargo(Cargo cargo) {
		cargo.setId_cargo(null);
		return cargoRepository.save(cargo);
	}

	public Cargo editarCargo(Cargo cargo) {
		buscarUmCargo(cargo.getId_cargo());
		return cargoRepository.save(cargo);
	}

	public void deletarUmCargo(Integer id_cargo) {
		try {
			cargoRepository.deleteById(id_cargo);
		} catch (DataIntegrityViolationException e) {
			throw new galapos.empresaGames.services.exceptions.DataIntegrityViolationException(
					"O cargo não pode ser deletada, pois existem funcionarios cadastrados no mesmo.");
		}
	}

	public Cargo atribuirGerente(Integer id_cargo,Integer id_gerente){
		Cargo cargo = buscarUmCargo(id_cargo);
		Gerente gerenteAnterior = gerenteService.mostrarGerenteDoCargo(id_cargo);
		Gerente gerente = gerenteService.mostrarUmGerente(id_gerente);
		if(cargo.getGerente()!=null) {
			cargo.setGerente(null);
			gerenteAnterior.setCargo(null);
		}
		cargo.setGerente(gerente);
		gerente.setCargo(cargo);
		return cargoRepository.save(cargo);
	}

	

	public Cargo deixarCargoSemGerente(Integer id_cargo, Integer id_gerente) {
		Cargo cargo = buscarUmCargo(id_cargo);
		cargo.setGerente(null);
		Gerente gerente = gerenteService.mostrarUmGerente(id_gerente);
		gerente.setCargo(null);
		return cargoRepository.save(cargo);
	}

}
