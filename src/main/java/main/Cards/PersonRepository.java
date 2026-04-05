package main.Cards;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Array;
import java.util.List;
import java.util.Map;

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
    public List<Person> findAll(int treeID) { // alle Dokumente Finden. sollte man am starten ausführen um alle Daten zu fetchen
        String sql = "SELECT id, name, surname, age, birth, placeofbirth, posX, posY  FROM test WHERE treeid = ?";

        System.out.println("treeID beim getten: " + treeID);
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) ->{ // erstellt
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
                },
                treeID
        );
    }
    // füge eine Persone in die Datenbank ein
    public void insert(Person person) {
        String sql = "INSERT INTO test (id, name, surname, age, birth, placeOfBirth, treeId) VALUES (?, ?, ?, ?, ?, ?, ?)";

        System.out.println("die TreeID: " + person.getTreeId());
        jdbcTemplate.update(
                sql,
                person.getId(),
                person.getName(),
                person.getSurname(),
                person.getAge(),
                person.getBirth(),
                person.getPlaceOfBirth(),
                person.getTreeId()
                //person.getAlive();
        );

    }


    public void InsertTree(Tree tree, String uuid) {
        String sql = "Insert INTO trees (id, name, owneruid) VALUES (?, ?, ?)";

        jdbcTemplate.update(
                sql,
                tree.getId(),
                tree.getName(),
                uuid

        );


    }
    public void updateCard(Person person) {
        String sql = "UPDATE test Set name = ?, surname = ?, age = ?, birth = ?, placeofbirth = ? Where id = ?";
        jdbcTemplate.update(sql,
                person.getName(),
                person.getSurname(),
                person.getAge(),
                person.getBirth(),
                person.getPlaceOfBirth(),
                person.getId()
        );


    }
    public void deleteCard(int id, int treeid, boolean flag) {

        String sql = "DELETE FROM test WHERE id = ?";
        jdbcTemplate.update(sql, id);
        // zweimal die gleiche wiel wir ja alle connections der karte löschen müssen
        deleteConnections(id, id , treeid, flag);
    }

    // wenn man nur die connection löscht dann nur nach der spezifischen connections suchen
    public void deleteConnections(int id, int toID, int treeid, boolean flag) {
        String sql = "DELETE FROM connections WHERE firstspouse = ? OR secondspouse = ?";
        jdbcTemplate.update(sql, id, toID);
        System.out.println(flag + " the bool flag");
        if(flag) {
            deleteChildConnection(id, treeid);
        }
    }
    public void deleteChildConnection(int id, int treeid) {
        String sql = "UPDATE connections SET children = array_remove(children, ?) WHERE treeid = ?";
        jdbcTemplate.update(sql, id, treeid);
    }

    public void deleteTree(int treeId) {
        String sql = "DELETE FROM trees WHERE id = ?";
        jdbcTemplate.update(sql, treeId);
        deleteAllCardsFromTree(treeId);
        deleteWholeTreeConnections(treeId);
    }

    public void deleteWholeTreeConnections(int treeId) {
        String sql = "DELETE FROM connections WHERE treeid = ?";
        jdbcTemplate.update(sql, treeId);
    }

    public void deleteAllCardsFromTree(int treeId) {
        String sql = "DELETE FROM test WHERE treeid  = ?";
        jdbcTemplate.update(sql, treeId);
    }




    // get all trees that this user has created
    public List<Tree> findByOwnerUuid(String uuid){
        String sql = "SELECT id, name FROM trees WHERE owneruid = ?";
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) ->{ // erstellt
                    Tree tree = new Tree();
                    tree.setId(rs.getInt("id"));
                    tree.setName(rs.getString("name"));
                    return tree;
                },
                uuid

        );
    }

    public void updatePosition(Person person) {

        String sql = "UPDATE test SET posx = ?, posy = ? WHERE id = ?"; // todo Change name of database
        jdbcTemplate.update(sql,
                person.getPosX(),
                person.getPosY(),
                person.getId());
    }

    /// //////////////////////////////////////////////////////
    /// Connections //////////////////////////////////////////
    /// //////////////////////////////////////////////////////

    public void InsertSpouseConn(Map<String, Integer> spouseConn) {
        String sql = "Insert INTO connections (firstspouse, secondspouse, treeid) VALUES (?, ?, ?)";

        jdbcTemplate.update(
                sql,
                spouseConn.get("fromId"),
                spouseConn.get("toId"),
                spouseConn.get("treeId")
        );

    }
    public void UpdateChildConn(Map<String, Integer> childConn) {

        String sql = "UPDATE connections SET children = array_append(children, ?) WHERE firstspouse = ? AND secondspouse = ?";

        jdbcTemplate.update(
                sql,
                childConn.get("childId"),
                childConn.get("fromId"),
                childConn.get("toId")

        );

    }

    // get all connections
    // hol alle Personen in der Datenbank
    public List<Connections> findAllConnections(int treeID) { // alle Dokumente Finden. sollte man am starten ausführen um alle Daten zu fetchen
        String sql = "SELECT firstSpouse, secondspouse, children FROM connections WHERE treeid = ?";

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) ->{
                    Connections p = new Connections();
                    p.setFirstSpouse(rs.getInt("firstspouse"));
                    p.setSecondSpouse(rs.getInt("secondspouse"));
                    Array sqlArray = rs.getArray("children");
                    p.setChildren(sqlArray != null ? (Integer[]) sqlArray.getArray() : new Integer[]{});


                    return p;
                },
                treeID
        );
    }

    // hol die aktuell Maximale Id in der Datenbank
    public int  getMaxId(){
        String sql = "SELECT MAX(id) FROM test";

        return jdbcTemplate.queryForObject(sql, Integer.class);


    }
    //hol die maximale Tree id in der trees datenbank
    public int getMaxTreeId(){
        String sql = "SELECT MAX(id) FROM trees";

        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
}
