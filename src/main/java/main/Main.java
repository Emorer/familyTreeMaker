package main;
import main.database.PostgresConnector;
import main.database.PostgresMethods;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Main{
    public static void main(String[] args ){
        SpringApplication.run(Main.class, args);

        PostgresConnector postgresConnector = new PostgresConnector();
        PostgresMethods postgresMethods = new PostgresMethods();

        postgresConnector.connectToPostgres();
        postgresMethods.initConnection(postgresConnector);


    }


}

