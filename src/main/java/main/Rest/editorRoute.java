package main.Rest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;


@Controller
public class editorRoute{
    @RequestMapping("/editor")
    public String editor() {
        return "editor";

    }
}