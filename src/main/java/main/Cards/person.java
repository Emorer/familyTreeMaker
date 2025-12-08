package main.Cards;

public class person {
    private String name;
    private String surname; // nachname
    private int age; // alter automatisch berechnen.
    private int birth;
    private String placeOfBirth;
    private String Gender;
    private int id;
    private boolean alive;

    //ab hier sind die eigenschaften die nicht angezeigt werden
    private int level; // wo in der hieraschie ist eine person
    private Boolean core;
    private int posX;
    private int posY;
    private String Link;


    public person(int id){
        this.id = id;
    }
    public void addName(){}
    public void addSurname(){}
    public void addAge(){}
    public void addBirth(){}
    public void addGender(){}



    public void addSpouse(){

    }

    public void addParent(){

    }

    public void addChild(){

    }



}
