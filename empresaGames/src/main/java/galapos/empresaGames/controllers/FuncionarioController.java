package galapos.empresaGames.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.ContrachequeG;
import galapos.empresaGames.model.Funcionario;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.repository.FuncionarioRepository;
import galapos.empresaGames.services.FuncionarioService;

@CrossOrigin
@RestController
@RequestMapping("empresaGames")
public class FuncionarioController {	

	@Autowired
	private FuncionarioService funcionarioService;

	@GetMapping("/funcionario")
	public List<Funcionario> mostrarTodosFuncionarios() {
		List<Funcionario> funcionario = funcionarioService.mostrarTodosFuncionarios();
		return funcionario;
	}
	
	@GetMapping("/funcionario-cargo")
	public List<List> funcionariosComCargo(){
		List<List> funcionariosCargo = funcionarioService.funcionariosComCargo();
		return funcionariosCargo;
	}

	@GetMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<?> buscarUmFuncionario(@PathVariable Integer id_funcionario) {
		Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcionario);
		return ResponseEntity.ok(funcionario);
	}
	
	@GetMapping("/funcionario/busca-cargo/{id_cargo}")
	public List<Funcionario> buscaFuncionarioCargo(@PathVariable Integer id_cargo){
		List<Funcionario> funcionario = funcionarioService.buscarFuncionarioCargo(id_cargo);
		return funcionario;
	}

	@PostMapping("/funcionario")
	public ResponseEntity<Funcionario> InserirFuncionario(@RequestBody Funcionario funcionario){
		funcionario = funcionarioService.InserirFuncionario(funcionario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(funcionario.getId_funcionario()).toUri();
		return ResponseEntity.created(uri).build();
		
	}
	 @DeleteMapping("/funcionario/{id_funcionario}")
	 public ResponseEntity<Void> deletarUmFuncionario(@PathVariable Integer id_funcionario) {
	 	funcionarioService.deletarUmFuncionario(id_funcionario);
	 	return ResponseEntity.noContent().build();
	 }	

	@PutMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void> editarFuncionario(@PathVariable Integer id_funcionario, @RequestBody Funcionario funcionario){		
		funcionario.setId_funcionario(id_funcionario);		
		funcionario = funcionarioService.editarFuncionario(funcionario);		
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/funcionario/vinculo/{id_funcionario}")
	public ResponseEntity<Void> vinculoFuncionario(@PathVariable Integer id_funcionario){
		funcionarioService.vinculoFuncionario(id_funcionario);
		return ResponseEntity.noContent().build();		
	}

	@PutMapping("funcionario/aplicarCargo/{id_funcionario}")
	public ResponseEntity<Funcionario> atribuirCargoAoFuncionario(@PathVariable Integer id_funcionario, @RequestBody Cargo cargo){
		Funcionario funcionario = funcionarioService.atribuirCargoAoFuncionario(id_funcionario, cargo);
		return ResponseEntity.noContent().build();
	}


	@PutMapping("/funcionario/deixarSemCargo/{id_funcionario}")
	public ResponseEntity<Funcionario> deixarFuncionarioSemCargo(@PathVariable Integer id_funcionario){
		Funcionario funcionario = funcionarioService.deixarFuncionarioSemCargo(id_funcionario);
		return ResponseEntity.noContent().build();
	}

	

	
	
	

	
	
	
	
	




}
