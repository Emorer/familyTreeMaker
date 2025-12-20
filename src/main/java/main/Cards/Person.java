package main.Cards;


public class Person {
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


    public Person() {}

    public Person(int id){
        this.id = id;
    }



    public void addName(){}
    public void addSurname(){}
    public void addAge(){}
    public void addBirth(){}
    public void addGender(){}

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

    public String getGender() {
        return Gender;
    }

    public int getId() {
        return id;
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

    public void setGender(String gender) {
        Gender = gender;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void addSpouse(){}
    public void addParent(){}
    public void addChild(){}



}
