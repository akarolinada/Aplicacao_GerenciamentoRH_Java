package galapos.empresaGames.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

import galapos.empresaGames.model.Cargo;
import galapos.empresaGames.model.Gerente;

public interface GerenteRepository extends JpaRepository<Gerente,Integer>{

    @Query(value = "SELECT * FROM gerente WHERE id_cargo = :id_cargo", nativeQuery = true)
    Gerente buscarGerenteDoCargo(Integer id_cargo);

    @Query(value = "SELECT * FROM gerente WHERE id_cargo IS NULL AND ger_vinculo = 1", nativeQuery = true)
    List<Gerente> gerenteSemCargo();

    @Query(value = "SELECT * FROM cargo WHERE id_gerente IS NULL", nativeQuery = true)
    List<List> cargoSemGerente();

    @Query(value = "SELECT gerente.id_gerente, gerente.ger_nome, gerente.ger_cidade, gerente.ger_idade, gerente.ger_foto, cargo.id_cargo, cargo.car_nome, gerente.ger_vinculo FROM gerente left JOIN cargo ON gerente.id_cargo = cargo.id_cargo", nativeQuery = true)
    List<List> gerenteComSeuCargo();
    
    @Query(value = "SELECT * FROM gerente WHERE ger_nome = :ger_nome", nativeQuery = true)
	Gerente fetchByName(String ger_nome);
    
    @Query(value = "SELECT id_gerente FROM gerente ORDER BY id_gerente DESC LIMIT 1", nativeQuery = true)
	Integer funcionarioPromovido();
}
