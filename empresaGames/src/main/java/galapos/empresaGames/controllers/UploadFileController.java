package galapos.empresaGames.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import galapos.empresaGames.model.Gerente;
import galapos.empresaGames.services.GerenteService;
import galapos.empresaGames.utils.UploadFileUtil;



@RestController
@RequestMapping("empresaGames")
@CrossOrigin
public class UploadFileController {
	
	@Autowired
	GerenteService gerenteService;
	
	@PostMapping("/envio/{id_gerente}")
	public ResponseEntity<String> enviarDados(@PathVariable Integer id_gerente,MultipartFile foto,@RequestParam("nome") String nome){
		
		String fileName = nome;
		
		
		String uploadDir = "D:/soulcode/SoulCodeAcademy/JAVA/eclipse-workspace/Spring/Projeto empresa na ideia da prof/empresaGames_front/src/assets/img_db";
		String nomeMaisCaminho = "assets/img_db/" + nome;
		
		Gerente gerente = gerenteService.salvarFoto(id_gerente, nomeMaisCaminho);
		
		
		try {
			UploadFileUtil.salvarArquivo(uploadDir, fileName, foto);
			
		}catch(Exception e) {
			System.out.println("O arquivo não foi enviado" + e);
		}
		
		System.out.println("Deu certo:" + nomeMaisCaminho);
		return ResponseEntity.ok("Arquivo enviado");
		
	}
	
}