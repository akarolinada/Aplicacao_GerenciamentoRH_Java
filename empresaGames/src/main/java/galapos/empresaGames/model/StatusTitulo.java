package galapos.empresaGames.model;

public enum StatusTitulo {

    PENDENTE("Pendente"),
    ENTREGUE("Entregue");

    private String descricao;

    StatusTitulo(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    

}
