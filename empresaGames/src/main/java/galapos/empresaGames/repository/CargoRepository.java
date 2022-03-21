package galapos.empresaGames.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import galapos.empresaGames.model.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Integer> {

    @Query(value = "SELECT cargo.id_cargo,cargo.car_nome,cargo.car_atribuicao,gerente.id_gerente,gerente.ger_nome FROM cargo left JOIN gerente ON gerente.id_cargo = cargo.id_cargo order by cargo.id_cargo;", nativeQuery = true)
    List<List> cargoComSeuGerente();

    @Query(value = "SELECT * FROM cargo WHERE id_funcionario = :id_funcionario", nativeQuery = true)
    Cargo buscarCargoDoFuncionario(Integer id_funcionario);

    @Query(value = "SELECT * FROM cargo WHERE id_gerente = :id_gerente", nativeQuery = true)
    Cargo buscarCargoDoGerente(Integer id_gerente);  
    
    @Query(value = "SELECT id_cargo FROM cargo WHERE id_gerente = :id_gerente", nativeQuery = true)
    Integer mostraIdCargo(Integer id_gerente);

}
