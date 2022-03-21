package galapos.empresaGames.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.services.GerenteService;

@CrossOrigin
@RestController
@RequestMapping("empresaGames")
public class GerenteController {
	
	@Autowired
	private GerenteService gerenteService;
	
	//busca todos gerentes
	@GetMapping("/gerente")
	public List<Gerente> mostrarTodosGerentes(){
	    List<Gerente> gerente = gerenteService.mostrarTodosGerentes();
		return gerente;
	}
	
	@GetMapping("/gerente/{id_gerente}")
	public ResponseEntity<Gerente> mostrarUmGerente(@PathVariable Integer id_gerente){
		Gerente gerente = gerenteService.mostrarUmGerente(id_gerente);
		return ResponseEntity.ok().body(gerente);
	}

	@GetMapping("/gerente-cargo/{id_cargo}")
	public ResponseEntity<Gerente> mostrarGerenteDoCargo(@PathVariable Integer id_cargo){
		Gerente gerente = gerenteService.mostrarGerenteDoCargo(id_cargo);
		return ResponseEntity.ok().body(gerente);
	}
	

	@GetMapping("/gerenteSemCargo")
	public List<Gerente> gerenteSemcargo(){
		List<Gerente> gerente = gerenteService.gerenteSemCargo();
		return gerente;
	}

	@GetMapping("/cargoSemGerente")
	public List<List> cargoSemGerente(){
		List<List> cargo = gerenteService.cargoSemGerente();
		return cargo;
	}

	@GetMapping("/gerentesESeusCargos")
	public List<List> gerentesESeusCargos(){
		List<List> gerentesECargos = gerenteService.mostrarGerenteComSeuCargo();
		return gerentesECargos;
	}

	@PostMapping("/gerente")
	public ResponseEntity<Gerente> cadastrarGerente(@RequestBody Gerente gerente){
		gerente = gerenteService.cadastrarGerente(gerente);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(gerente.getId_gerente()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/gerente/vinculo/{id_gerente}")
	public ResponseEntity<Void> vinculoGerente(@PathVariable Integer id_gerente){
		gerenteService.vinculoGerente(id_gerente);
		return ResponseEntity.noContent().build();		
	}

	@PutMapping("/gerente/definirCargo/{id_gerente}/{id_cargo}")
	public ResponseEntity<Gerente> atribuirCargo(@PathVariable Integer id_gerente, @PathVariable Integer id_cargo){
		gerenteService.atribuirCargo(id_gerente, id_cargo);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/gerente/{id_gerente}")
	public ResponseEntity<Void> editarGerente(@PathVariable Integer id_gerente, @RequestBody Gerente gerente){		
		gerente.setId_gerente(id_gerente);
		gerente = gerenteService.editarGerente(gerente);		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/gerente-nome/{ger_nome}")
	public ResponseEntity<Gerente> buscarGerentePeloNome(@PathVariable String ger_nome){
		Gerente gerente = gerenteService.buscarGerentePeloNome(ger_nome);
		return ResponseEntity.ok().body(gerente);
	}
	
	@GetMapping("/funcionarioPromovido")
	public Gerente funcionarioPromovido(){
		Gerente gerente = gerenteService.funcionarioPromovido();
		return gerente;
	}
	


	
	
}
