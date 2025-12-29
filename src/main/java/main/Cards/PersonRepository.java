package main.Cards;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.hibernate.sql.ast.Clause.INSERT;
import static org.hibernate.sql.ast.Clause.UPDATE;

@Repository
public class PersonRepository {

    public String table; // tabelle

    public void setTable(String table){
       this.table = table;
    }

    // Template die die Verbindung zur Datenbank herstellt
    private final JdbcTemplate jdbcTemplate;

    //initialisere die Klasse mit dem Template
    public PersonRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // hol alle Personen in der Datenbank
    public List<Person> findAll() { // alle Dokumente Finden. sollte man am starten ausführen um alle Daten zu fetchen
        String sql = "SELECT id, name, surname, age, birth, placeofbirth, posX, posY  FROM test";

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) ->{
                    Person p = new Person();
                    p.setId(rs.getInt("id"));
                    p.setName(rs.getString("name"));
                    p.setSurname(rs.getString("surname"));
                    p.setAge(rs.getInt("age"));
                    p.setBirth(rs.getInt("birth"));
                    p.setPlaceOfBirth(rs.getString("placeofbirth"));
                    p.setPosX(rs.getInt("posX"));
                    p.setPosY(rs.getInt("posY"));
                    return p;
                }
        );
    }
    // füge eine Persone in die Datenbank ein
    public void insert(Person person) {
        String sql = "INSERT INTO test (id, name, surname, age, birth, placeOfBirth) VALUES (?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                person.getId(),
                person.getName(),
                person.getSurname(),
                person.getAge(),
                person.getBirth(),
                person.getPlaceOfBirth()
                //person.getAlive();
        );

    }
    public void update(Person person) {

    }
    public void delete(int id) {

    }


    public void updatePosition(Person person) {
        System.out.println("test");
        String sql = "UPDATE test SET posx = ?, posy = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                person.getPosX(),
                person.getPosY(),
                person.getId());
    }
    // hol die aktuell Maximale Id in der Datenbank
    public int  getMaxId(){
        String sql = "SELECT MAX(id) FROM test";

        return jdbcTemplate.queryForObject(sql, Integer.class);


    }
}
