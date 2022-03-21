package galapos.empresaGames.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import galapos.empresaGames.model.ContrachequeG;

public interface ContrachequeGRepository extends JpaRepository<ContrachequeG, Integer> {
	
	@Query(value = "SELECT * FROM contrachequeg WHERE id_gerente = :id_gerente", nativeQuery = true)
	List<ContrachequeG> buscarContrachequeDoGerente(Integer id_gerente);

}
