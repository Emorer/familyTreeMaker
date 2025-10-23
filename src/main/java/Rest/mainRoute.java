package Rest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



//Controller
@Controller
public class mainRoute {
    //@GetMapping("/hello")
    @RequestMapping("/homepage")
    public String homepage() {
        return "homepage.html";

    }

    @RequestMapping("/Test")
    public String test(){
        return "test.html";
    }

}
