package galapos.empresaGames.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import galapos.empresaGames.model.ContrachequeG;
import galapos.empresaGames.model.Funcionario;
import galapos.empresaGames.model.Gerente;

public interface FuncionarioRepository extends JpaRepository<Funcionario,Integer>{
	
	@Query(value = "SELECT * FROM funcionario WHERE id_cargo = :id_cargo", nativeQuery = true)
	List<Funcionario> fetchByCargo(Integer id_cargo);
	
	@Query(value = "SELECT id_funcionario, func_nome, func_cidade, cargo.id_cargo, car_nome, car_atribuicao, func_vinculo FROM cargo right JOIN funcionario ON funcionario.id_cargo = cargo.id_cargo order by id_funcionario;", nativeQuery = true)
	List<List> funcionariosComCargo();
	
	@Query(value = "SELECT id_cargo FROM funcionario WHERE id_funcionario = :id_funcionario", nativeQuery = true)
	Integer buscaIdCargodoFunc(Integer id_funcionario);
	
	@Query(value = "SELECT * FROM contrachequeg WHERE id_gerente IS NULL", nativeQuery = true)
	List<ContrachequeG> contrachequeSolto();	

}
