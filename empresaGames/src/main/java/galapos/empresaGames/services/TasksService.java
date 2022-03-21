package galapos.empresaGames.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.StatusTask;
import galapos.empresaGames.model.Tasks;
import galapos.empresaGames.repository.TasksRepository;

@Service
public class TasksService {
	
	@Autowired
	private TasksRepository tasksRepository;

	@Autowired
	private CargoService cargoService;

	// lista todos os cc independente de funcionario

	public List<Tasks> buscarTodasAsTasks() {
		return tasksRepository.findAll();
	}

	// lista apenas um cc de todos, independente independente do funcionario
	public Tasks buscarUmaTask(Integer id_task) {
		Optional<Tasks> task = tasksRepository.findById(id_task);
		return task.orElseThrow();
	}

	public List<Tasks> buscarTasksDoCargo(Integer id_cargo) {
		List<Tasks> tasks = tasksRepository.buscarTasksDoCargo(id_cargo);
		return tasks;
	}

	public Tasks inserirTask(Tasks task, Integer id_cargo) {
		task.setId_task(null);
		Cargo cargo = cargoService.buscarUmCargo(id_cargo);
		task.setCargo(cargo);
		return tasksRepository.save(task);
	}

	public void deletarUmaTask(Integer id_task) {
		tasksRepository.deleteById(id_task);
	}

	public Tasks editarTasks(Tasks task, Integer id_cargo) {
		buscarUmaTask(task.getId_task());
		Cargo cargo = cargoService.buscarUmCargo(id_cargo);
		task.setCargo(cargo);
		return tasksRepository.save(task);
	}

	public Tasks marcarEmAndamento(Integer id_task) {
		Tasks task = buscarUmaTask(id_task);
		StatusTask st1 = StatusTask.EM_ANDAMENTO;
		task.setTask_status(st1);
		return tasksRepository.save(task);
	}
	
	public Tasks marcarConcluido(Integer id_task) {
		Tasks task = buscarUmaTask(id_task);
		StatusTask st1 = StatusTask.CONCLUIDO;
		task.setTask_status(st1);
		return tasksRepository.save(task);
	}


}
