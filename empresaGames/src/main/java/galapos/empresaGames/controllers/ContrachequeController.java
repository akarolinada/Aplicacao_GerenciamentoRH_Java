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

import galapos.empresaGames.model.Contracheque;
import galapos.empresaGames.services.ContrachequeService;

@CrossOrigin
@RestController
@RequestMapping("empresaGames")
public class ContrachequeController {
	
	@Autowired
	private ContrachequeService contrachequeService;
	
	@GetMapping("/contracheque")
	public List<Contracheque> buscarTodosContracheques(){
		List<Contracheque> contracheque = contrachequeService.buscarTodosContracheques();
		return contracheque;
	}
	
	@GetMapping("/contracheque/{id_contracheque}")
	public ResponseEntity<Contracheque> buscarUmContracheque(@PathVariable Integer id_contracheque){
		Contracheque contracheque = contrachequeService.buscarUmContracheque(id_contracheque);
		return ResponseEntity.ok().body(contracheque);
	}
	
	@GetMapping("/funcionario/contracheque/{id_funcionario}")
	public List<Contracheque> buscarContrachequeDoFuncionario(@PathVariable Integer id_funcionario){
		List<Contracheque> contracheque = contrachequeService.buscarContrachequesDoFuncionario(id_funcionario);
		return contracheque;
	}
	
	@PostMapping("/funcionario/contracheque/{id_funcionario}")
	public ResponseEntity<Contracheque> InserirContracheque(@RequestBody Contracheque contracheque, @PathVariable Integer id_funcionario){
		contracheque = contrachequeService.inserirContracheque(contracheque, id_funcionario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id").buildAndExpand(contracheque.getId_contracheque()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/funcionario/contracheque/{id_contracheque}")
	public ResponseEntity<Void> deletarUmContracheque(@PathVariable Integer id_contracheque){
		contrachequeService.deletarUmContracheque(id_contracheque);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/funcionario/contracheque/{id_contracheque}/{id_funcionario}")
	public ResponseEntity<Contracheque> editarContracheque(@PathVariable Integer id_contracheque, @PathVariable Integer id_funcionario,@RequestBody Contracheque contracheque){
		contracheque.setId_contracheque(id_contracheque);
		contracheque = contrachequeService.editarContracheque(contracheque, id_funcionario);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/funcionario/entregarContracheque/{id_contracheque}")
	public ResponseEntity<Contracheque> entregarContracheque(@PathVariable Integer id_contracheque){
		contrachequeService.entregarContracheque(id_contracheque);
		return ResponseEntity.noContent().build();
	}

}
