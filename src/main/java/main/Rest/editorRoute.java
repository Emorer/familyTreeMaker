package main.Rest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import main.Cards.Person;
import java.util.HashMap;
import java.util.Map;

// main route for the editor
@Controller
public class editorRoute{
    // alle Personen die abgespeichert werden
    private Map<Integer, Person> allPersons = new HashMap<>();
    private int idCounter = 1;
    @RequestMapping("/editor")
    public String editor() {
        return "editor";

    }

    // create new person instance and add to map
    @PostMapping("/editor")
    @ResponseBody
    public String handle(@RequestBody Person person) {
        person.setId(idCounter);
        allPersons.put(idCounter, person);

        System.out.println(allPersons);
        idCounter++;
        return "OK";

    }
}