package galapos.empresaGames.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.ContrachequeG;
import galapos.empresaGames.model.Funcionario;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.repository.FuncionarioRepository;
import galapos.empresaGames.repository.GerenteRepository;

@Service
public class FuncionarioService {

	@Autowired
	private FuncionarioRepository funcionarioRepository;

	@Autowired
	private CargoService cargoService;
	
	@Autowired
	private GerenteRepository gerenteRepository;

	public List<Funcionario> mostrarTodosFuncionarios(){
	return funcionarioRepository.findAll();
	}

	public List<List> funcionariosComCargo() {
		return funcionarioRepository.funcionariosComCargo();
	}

	public Funcionario buscarUmFuncionario(Integer id_funcionario) {
		Optional<Funcionario> funcionario = funcionarioRepository.findById(id_funcionario);
		return funcionario.orElseThrow();
	}

	public Funcionario InserirFuncionario(Funcionario funcionario) {
		funcionario.setId_funcionario(null);
		funcionario.setFunc_vinculo(1);
		return funcionarioRepository.save(funcionario);
	}

	 public void deletarUmFuncionario(Integer id_funcionario) {
	 funcionarioRepository.deleteById(id_funcionario);
	 }

	public Funcionario editarFuncionario(Funcionario funcionario) {
		buscarUmFuncionario(funcionario.getId_funcionario());
		Integer idCargo = funcionarioRepository.buscaIdCargodoFunc(funcionario.getId_funcionario());
		if(idCargo != null) {
			Cargo cargo = cargoService.buscarUmCargo(idCargo);
			funcionario.setCargo(cargo);
		}
		funcionario.setFunc_vinculo(1);
		return funcionarioRepository.save(funcionario);
	}

	public Funcionario vinculoFuncionario(Integer id_funcionario) {
		Funcionario funcionario = buscarUmFuncionario(id_funcionario);
		Integer vinculo = funcionario.getFunc_vinculo();
		if (vinculo == 1) {
			funcionario.setFunc_vinculo(0);
			funcionario.setCargo(null);
		} else {
			funcionario.setFunc_vinculo(1);
		}
		return funcionarioRepository.save(funcionario);
	}

	public Funcionario atribuirCargoAoFuncionario(Integer id_funcionario, Cargo cargo) {
		Funcionario funcionario = buscarUmFuncionario(id_funcionario);
		funcionario.setCargo(cargo);
		return funcionarioRepository.save(funcionario);
	}

	public List<Funcionario> buscarFuncionarioCargo(Integer id_cargo) {
		List<Funcionario> funcionario = funcionarioRepository.fetchByCargo(id_cargo);
		return funcionario;
	}

	public Funcionario deixarFuncionarioSemCargo(Integer id_funcionario) {
		Funcionario funcionario = buscarUmFuncionario(id_funcionario);
		funcionario.setCargo(null);
		return funcionarioRepository.save(funcionario);
	}
	
	
	
	
	
	
	

	
	
}
