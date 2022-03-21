package galapos.empresaGames.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import galapos.empresaGames.model.ContrachequeG;
import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.model.StatusTitulo;
import galapos.empresaGames.repository.ContrachequeGRepository;

@Service
public class ContrachequeGService {
	
	@Autowired
	private ContrachequeGRepository contrachequeGRepository;

	@Autowired
	private GerenteService gerenteService;

	// lista todos os cc independente de gerente

	public List<ContrachequeG> buscarTodosContracheques() {
		return contrachequeGRepository.findAll();
	}

	// lista apenas um cc de todos, independente independente do gerente
	public ContrachequeG buscarUmContracheque(Integer id_contracheque) {
		Optional<ContrachequeG> contracheque = contrachequeGRepository.findById(id_contracheque);
		return contracheque.orElseThrow();
	}

	public List<ContrachequeG> buscarContrachequesDoGerente(Integer id_gerente) {
		List<ContrachequeG> contracheque = contrachequeGRepository.buscarContrachequeDoGerente(id_gerente);
		return contracheque;
	}

	public ContrachequeG inserirContracheque(ContrachequeG contracheque, Integer id_gerente) {
		contracheque.setId_contracheque(null);
		Gerente gerente = gerenteService.mostrarUmGerente(id_gerente);
		contracheque.setGerente(gerente);
		return contrachequeGRepository.save(contracheque);
	}

	public void deletarUmContracheque(Integer id_contracheque) {
		contrachequeGRepository.deleteById(id_contracheque);
	}

	public ContrachequeG editarContracheque(ContrachequeG contracheque, Integer id_gerente) {
		buscarUmContracheque(contracheque.getId_contracheque());
		Gerente gerente = gerenteService.mostrarUmGerente(id_gerente);
		contracheque.setGerente(gerente);
		return contrachequeGRepository.save(contracheque);
	}

	public ContrachequeG entregarContracheque(Integer id_contracheque) {
		ContrachequeG contracheque = buscarUmContracheque(id_contracheque);
		StatusTitulo st1 = StatusTitulo.ENTREGUE;
		contracheque.setCc_status(st1);
		return contrachequeGRepository.save(contracheque);
	}


}
