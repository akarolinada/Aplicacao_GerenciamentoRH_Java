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

import galapos.empresaGames.model.Tasks;
import galapos.empresaGames.services.TasksService;

@RestController
@CrossOrigin
@RequestMapping("empresaGames")
public class TasksController {
	
	@Autowired
	private TasksService tasksService;
	
	@GetMapping("/tasks")
	public List<Tasks> buscarTodasTasks(){
		List<Tasks> tasks = tasksService.buscarTodasAsTasks();
		return tasks;
	}
	
	@GetMapping("/tasks/{id_task}")
	public ResponseEntity<Tasks> buscarUmaTask(@PathVariable Integer id_task){
		Tasks task = tasksService.buscarUmaTask(id_task);
		return ResponseEntity.ok().body(task);
	}
	
	@GetMapping("/cargo/task/{id_cargo}")
	public List<Tasks> buscarTasksDoCargo(@PathVariable Integer id_cargo){
		List<Tasks> task = tasksService.buscarTasksDoCargo(id_cargo);
		return task;
	}
	
	@PostMapping("/cargo/task/{id_cargo}")
	public ResponseEntity<Tasks> InserirTasks(@RequestBody Tasks tasks, @PathVariable Integer id_cargo){
		tasks = tasksService.inserirTask(tasks, id_cargo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id").buildAndExpand(tasks.getId_task()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/cargo/task/{id_task}")
	public ResponseEntity<Void> deletarUmaTask(@PathVariable Integer id_task){
		tasksService.deletarUmaTask(id_task);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/cargo/task/{id_task}/{id_cargo}")
	public ResponseEntity<Tasks> editarTasks(@PathVariable Integer id_task, @PathVariable Integer id_cargo,@RequestBody Tasks task){
		task.setId_task(id_task);
		task = tasksService.editarTasks(task, id_cargo);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/cargo/marcarEmAndamento/{id_task}")
	public ResponseEntity<Tasks> marcarEmandamento(@PathVariable Integer id_task){
		tasksService.marcarEmAndamento(id_task);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/cargo/marcarConcluido/{id_task}")
	public ResponseEntity<Tasks> marcarConcluido(@PathVariable Integer id_task){
		tasksService.marcarConcluido(id_task);
		return ResponseEntity.noContent().build();
	}



}
