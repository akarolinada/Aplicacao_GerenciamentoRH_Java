package galapos.empresaGames.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import galapos.empresaGames.model.Contracheque;
import galapos.empresaGames.model.Funcionario;
import galapos.empresaGames.model.StatusTitulo;
import galapos.empresaGames.repository.ContrachequeRepository;

@Service
public class ContrachequeService {

	@Autowired
	private ContrachequeRepository contrachequeRepository;

	@Autowired
	private FuncionarioService funcionarioService;

	// lista todos os cc independente de funcionario

	public List<Contracheque> buscarTodosContracheques() {
		return contrachequeRepository.findAll();
	}

	// lista apenas um cc de todos, independente independente do funcionario
	public Contracheque buscarUmContracheque(Integer id_contracheque) {
		Optional<Contracheque> contracheque = contrachequeRepository.findById(id_contracheque);
		return contracheque.orElseThrow();
	}

	public List<Contracheque> buscarContrachequesDoFuncionario(Integer id_funcionario) {
		List<Contracheque> contracheque = contrachequeRepository.buscarContrachequeDoFuncionario(id_funcionario);
		return contracheque;
	}

	public Contracheque inserirContracheque(Contracheque contracheque, Integer id_funcionario) {
		contracheque.setId_contracheque(null);
		Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcionario);
		contracheque.setFuncionario(funcionario);
		return contrachequeRepository.save(contracheque);
	}

	public void deletarUmContracheque(Integer id_contracheque) {
		contrachequeRepository.deleteById(id_contracheque);
	}

	public Contracheque editarContracheque(Contracheque contracheque, Integer id_funcinario) {
		buscarUmContracheque(contracheque.getId_contracheque());
		Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcinario);
		contracheque.setFuncionario(funcionario);
		return contrachequeRepository.save(contracheque);
	}

	public Contracheque entregarContracheque(Integer id_contracheque) {
		Contracheque contracheque = buscarUmContracheque(id_contracheque);
		StatusTitulo st1 = StatusTitulo.ENTREGUE;
		contracheque.setCc_status(st1);
		return contrachequeRepository.save(contracheque);
	}

}
