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


import galapos.empresaGames.model.ContrachequeG;
import galapos.empresaGames.services.ContrachequeGService;


@CrossOrigin
@RestController
@RequestMapping("empresaGames")
public class ContrachequeGController {
	
	@Autowired
	private ContrachequeGService contrachequeGService;
	
	@GetMapping("/contrachequeGerente")
	public List<ContrachequeG> buscarTodosContracheques(){
		List<ContrachequeG> contracheque = contrachequeGService.buscarTodosContracheques();
		return contracheque;
	}
	
	@GetMapping("/contrachequeGerente/{id_contracheque}")
	public ResponseEntity<ContrachequeG> buscarUmContracheque(@PathVariable Integer id_contracheque){
		ContrachequeG contracheque = contrachequeGService.buscarUmContracheque(id_contracheque);
		return ResponseEntity.ok().body(contracheque);
	}
	
	@GetMapping("/gerente/contracheque/{id_gerente}")
	public List<ContrachequeG> buscarContrachequeDoFuncionario(@PathVariable Integer id_gerente){
		List<ContrachequeG> contracheque = contrachequeGService.buscarContrachequesDoGerente(id_gerente);
		return contracheque;
	}
	
	@PostMapping("/gerente/contracheque/{id_gerente}")
	public ResponseEntity<ContrachequeG> InserirContracheque(@RequestBody ContrachequeG contracheque, @PathVariable Integer id_gerente){
		contracheque = contrachequeGService.inserirContracheque(contracheque, id_gerente);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id").buildAndExpand(contracheque.getId_contracheque()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/gerente/contracheque/{id_contracheque}")
	public ResponseEntity<Void> deletarUmContracheque(@PathVariable Integer id_contracheque){
		contrachequeGService.deletarUmContracheque(id_contracheque);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/gerente/contracheque/{id_contracheque}/{id_gerente}")
	public ResponseEntity<ContrachequeG> editarContracheque(@PathVariable Integer id_contracheque, @PathVariable Integer id_gerente,@RequestBody ContrachequeG contracheque){
		contracheque.setId_contracheque(id_contracheque);
		contracheque = contrachequeGService.editarContracheque(contracheque, id_gerente);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/gerente/entregarContracheque/{id_contracheque}")
	public ResponseEntity<ContrachequeG> entregarContracheque(@PathVariable Integer id_contracheque){
		contrachequeGService.entregarContracheque(id_contracheque);
		return ResponseEntity.noContent().build();
	}

}