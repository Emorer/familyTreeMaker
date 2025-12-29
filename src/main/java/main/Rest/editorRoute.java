package main.Rest;
import main.Cards.PersonRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import main.Cards.Person;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// main route for the editor
@Controller
public class editorRoute{
    private final PersonRepository personRepository;
    private int idCounter;

    // initalisere die Verbindung zur Datenbank und den ID counter
    public editorRoute(PersonRepository personRepository) {
        this.personRepository = personRepository;
        try {
            idCounter = personRepository.getMaxId() + 1; // wenn die datenbank leer ist dann findet er nichts
        }
        catch(Exception e){
            idCounter = 0;
        }

    }

    // alle Personen die abgespeichert werden
    private Map<Integer, Person> allPersons = new HashMap<>();

    @RequestMapping("/editor")
    public String editor() {
        return "editor";

    }

    // create new person instance and add to map
    @PostMapping("/editor")
    @ResponseBody
    public int handle(@RequestBody Person person) {
        person.setId(idCounter);
        // füge die erstellte Person hinzu
        personRepository.insert(person);


        System.out.println(allPersons);
        idCounter++;
        return idCounter - 1 ;

    }
    // sets the Position of a card in the class not in the database
    @PutMapping("/editorPos")
    @ResponseBody
    public String getCardPostion(@RequestBody Map<String, Object> card){

        int posX = (Integer) card.get("x");
        int posY = (Integer) card.get("y");
        int id   = (Integer) card.get("id");

        System.out.println("posX: " + posX + " posY: " + posY + " id: " + id);
        Person person = allPersons.get(id);
        person.setPosX(posX);
        person.setPosY(posY);
        personRepository.updatePosition(person);


        return  "ok";
    }

    // sets the Position of a card in the class not in the database
    @PutMapping("/editorTree")
    @ResponseBody
    public List<Person> getTree(@RequestBody Map<String, String> tree){

        String treeName =  tree.get("treeName");
        //set database table
        List<Person> wholeTree = personRepository.findAll();
        System.out.println("treeName: " + wholeTree);
        for(Person person : wholeTree){
            addToMap(person);
            System.out.println(person.getName());
            System.out.println(person.getAge());
            System.out.println(person.getBirth());
            System.out.println(person.getName());
        }


        return wholeTree;
    }

    public void addToMap(Person person){
        allPersons.put(person.getId(), person);
    }
}