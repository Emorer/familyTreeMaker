package main.Cards;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tree {

    @Id
    private int id;
    private String name;
    private float created_at;
    private String owneruid;

    public Tree() {

    }

    // getter und setter for id
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;

    }
    // getter Setter for name
    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
