package main.Rest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



//Controller
@Controller
public class mainRoute {
    //@GetMapping("/hello")
    @RequestMapping("/homepage")
    public String homepage() {
        return "homepage";

    }

    @RequestMapping("/test")
    public String test(){
        return "test";
    }

}
