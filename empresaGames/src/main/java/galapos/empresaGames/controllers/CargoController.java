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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.services.CargoService;

@CrossOrigin
@RestController
@RequestMapping("empresaGames")
public class CargoController {

	@Autowired
	private CargoService cargoService;

	@GetMapping("/cargo")
	public List<Cargo> mostrarTodosCargos() {
		List<Cargo> cargo = cargoService.mostraTodosCargos();
		return cargo;
	}

	@GetMapping("/cargo/{id_cargo}")
	public ResponseEntity<Cargo> buscarUmCargo(@PathVariable Integer id_cargo) {
		Cargo cargo = cargoService.buscarUmCargo(id_cargo);
		return ResponseEntity.ok(cargo);
	}

	@GetMapping("/cargo-funcionario/{id_funcionario}")
	public ResponseEntity<Cargo> mostrarCargodoFuncionario(@PathVariable Integer id_funcionario){
		Cargo cargo = cargoService.mostrarCargoDoFuncionario(id_funcionario);
		return ResponseEntity.ok().body(cargo);
	}

	@GetMapping("/cargo-do-gerente/{id_gerente}")
	public ResponseEntity<Cargo> mostrarCargodoGerente(@PathVariable Integer id_gerente){
		Cargo cargo = cargoService.mostraCargoDoGerente(id_gerente);
		return ResponseEntity.ok().body(cargo);
	}

	@GetMapping("/cargo-gerente")
	public List<List> cargosComGerente(){
		List<List> cargoGerente = cargoService.cargoComSeuGerente();
		return cargoGerente;
	}

	@PostMapping("/cargo")
	public ResponseEntity<Void> cadastrarCargo(@RequestBody Cargo cargo) {
		cargo = cargoService.cadastrarCargo(cargo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(cargo.getId_cargo())
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/cargo/{id_cargo}")
	public ResponseEntity<Cargo> editarCargo(@PathVariable Integer id_cargo, @RequestBody Cargo cargo) {
		cargo.setId_cargo(id_cargo);
		cargo = cargoService.editarCargo(cargo);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/cargo/{id_cargo}")
	public ResponseEntity<Void> deletarUmCargo(@PathVariable Integer id_cargo) {
		cargoService.deletarUmCargo(id_cargo);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/cargo/definirGerente/{id_cargo}/{id_gerente}")
	public ResponseEntity<Cargo> atribuirGerente(@PathVariable Integer id_cargo, @PathVariable Integer id_gerente){
		cargoService.atribuirGerente(id_cargo, id_gerente);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/cargo/tirarGerente/{id_cargo}/{id_gerente}")
	public ResponseEntity<Gerente> deixarCargoSemGerente(@PathVariable Integer id_cargo, @PathVariable Integer id_gerente){
		cargoService.deixarCargoSemGerente(id_cargo, id_gerente);
		return ResponseEntity.noContent().build();
	}
}
