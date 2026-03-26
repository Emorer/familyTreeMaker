package main.Cards;
import java.sql.Connection;
import java.util.List;

public class Connections {
    private int firstSpouse;
    private int secondSpouse;
    private int treeId;
    private Integer[]   children;

    public Connections(){}

    public int getFirstSpouse() {
        return firstSpouse;
    }
    public int getSecondSpouse() {return secondSpouse;}
    public int getTreeId() {return treeId;}
    public Integer[] getChildren() {return children;}

    public void setFirstSpouse(int firstSpouse) {
        this.firstSpouse = firstSpouse;
    }
    public void setSecondSpouse(int secondSpouse) {
        this.secondSpouse = secondSpouse;

    }
    public void setTreeId(int treeId) {
        this.treeId = treeId;
    }
    public void setChildren(Integer[] children) {
        this.children = children;
    }

}

