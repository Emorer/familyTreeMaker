package main.Cards;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Person {
    @Id
    private int id;
    private int treeId;
    private String name;
    private String surname; // nachname
    private int age; // alter automatisch berechnen.
    private int birth;
    private String placeOfBirth;
    private boolean alive;
    private String Gender;

    //ab hier sind die eigenschaften die nicht angezeigt werden
    private int posX;
    private int posY;

    private int level; // wo in der hieraschie ist eine person
    private Boolean core;
    private String Link;


    public Person() {}

    public Person(int id){
        this.id = id;
    }



    public void addName(){}
    public void addSurname(){}
    public void addAge(){}
    public void addBirth(){}
    public void addGender(){}

    public int getId() {
        return id;
    }
    public int getTreeId() {
        return treeId;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getAge() {
        return age;
    }

    public int getBirth() {
        return birth;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public int getPosX() {
        return posX;
    }
    public int getPosY() {
        return posY;
    }

    public String getGender() {
        return Gender;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setBirth(int birth) {
        this.birth = birth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }
    public void setPosX(int posX) {
        this.posX = posX;
    }
    public void setPosY(int posY) {
        this.posY = posY;
    }

    public void setGender(String gender) {
        Gender = gender;
    }
    public void setId(int id) {
        this.id = id;
    }

    public void setTreeId(int treeId) {
        this.treeId = treeId;
    }
    public void addSpouse(){}
    public void addParent(){}
    public void addChild(){}



}
