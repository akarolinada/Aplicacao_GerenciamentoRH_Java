package galapos.empresaGames.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import galapos.empresaGames.model.Tasks;

public interface TasksRepository extends JpaRepository<Tasks, Integer> {
	
	@Query(value = "SELECT * FROM tasks WHERE id_cargo = :id_cargo", nativeQuery = true)
	List<Tasks> buscarTasksDoCargo(Integer id_cargo);

}
