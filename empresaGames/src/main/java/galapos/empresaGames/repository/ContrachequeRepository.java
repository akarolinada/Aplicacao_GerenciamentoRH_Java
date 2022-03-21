package galapos.empresaGames.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import galapos.empresaGames.model.Contracheque;

public interface ContrachequeRepository extends JpaRepository<Contracheque, Integer> {
	
	@Query(value = "SELECT * FROM contracheque WHERE id_funcionario = :id_funcionario", nativeQuery = true)
	List<Contracheque> buscarContrachequeDoFuncionario(Integer id_funcionario);
	

}
