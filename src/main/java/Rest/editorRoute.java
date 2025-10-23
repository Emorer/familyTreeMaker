package Rest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


public class editorRoute{
    @RequestMapping("/editor")
    public String editor() {
        return "editor.html";

    }
}