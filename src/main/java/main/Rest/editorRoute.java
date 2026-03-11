package main.Rest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import main.Cards.PersonRepository;
import main.Cards.Tree;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import main.Cards.Person;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

// main route for the editor
@Controller
public class editorRoute{
    private final PersonRepository personRepository;
    private int idCounter;
    private int treeIDCounter;

    // initalisere die Verbindung zur Datenbank und den ID counter
    public editorRoute(PersonRepository personRepository) {
        this.personRepository = personRepository;

        try {
            idCounter = personRepository.getMaxId() + 1; // wenn die datenbank leer ist dann findet er nichts
        }
        catch(Exception e){
            idCounter = 0;
        }

        // treeIDCounter check
        try {
            treeIDCounter = personRepository.getMaxTreeId() + 1;
        }
        catch(Exception e){
            treeIDCounter = 0;
        }

    }

    // alle Personen die abgespeichert werden
    private Map<Integer, Person> allPersons = new HashMap<>();




    //erstelle cookies
    @RequestMapping("/editor" )
    public String editor(HttpServletRequest request,
                         HttpServletResponse response, Model model) {

        String uuid = getUuidFromCookies(request);
        System.out.println("aktuelle uuid: " + uuid);

        if (uuid == null) {
            uuid = UUID.randomUUID().toString();

            Cookie cookie = new Cookie("user_uuid", uuid);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 24 * 365); // 1 Jahr

            response.addCookie(cookie);
        }

        List<Tree> trees = personRepository.findByOwnerUuid(uuid);

        model.addAttribute("trees", trees);


        return "editor";
    }



    // create new person instance and add to map
    @PostMapping("/editor")
    @ResponseBody
    public int handle(@RequestBody Person person) {// füge die erstellte Person hinzu
        person.setId(idCounter);

        //System.out.println("Pos der neu hinzugefügten Perosn sollte 0 sein: " + person.getPosX());
        personRepository.insert(person);
        addToMap(person);


        System.out.println(allPersons);
        idCounter++;
        return idCounter - 1 ;

    }
    // create a new Tree
    @PostMapping("/editorNewTree")
    @ResponseBody
    public int createNewTree(@RequestBody Tree tree, @CookieValue("user_uuid") String uuid){
        tree.setId(treeIDCounter);

        personRepository.InsertTree(tree, uuid);

        treeIDCounter++;
        return treeIDCounter - 1;
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
    @PutMapping("/deleteCard")
    @ResponseBody
    public String getCardId(@RequestBody Map<String, Object> card){
        int id   = (Integer) card.get("id");
        allPersons.remove(id);

        personRepository.deleteCard(id);


        return  "ok";
    }

    // gets the every person and displays it on canvas
    @PutMapping("/editorTree")
    @ResponseBody
    public List<Person> getTree(@RequestBody Tree tree){

        int treeID = tree.getId();
        //set database table
        List<Person> wholeTree = personRepository.findAll(treeID);
        System.out.println("treeName: " + wholeTree);
        for(Person person : wholeTree){
            addToMap(person);

        }


        return wholeTree;
    }

    public void addToMap(Person person){
        allPersons.put(person.getId(), person);
    }



    private String getUuidFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {
            if ("user_uuid".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}