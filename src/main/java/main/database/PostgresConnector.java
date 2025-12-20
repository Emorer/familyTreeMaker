package main.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

public class PostgresConnector {
    public Connection conn;

    public void connectToPostgres() {

        Properties prop = new Properties();
        String user = "";
        String url = "";
        String password = "";

        try(InputStream loginInfo = this.getClass().getClassLoader().getResourceAsStream("application.properties")) {

            if (loginInfo == null) {
                throw new IllegalArgumentException("application.properties" + " is not found");
            }

            prop.load(loginInfo);

            // Werte auslesen
            user = prop.getProperty("spring.datasource.username");
            url = prop.getProperty("spring.datasource.url");
            password = prop.getProperty("spring.datasource.password");


        } catch (IOException e) {
            e.printStackTrace();
        }
        try (Connection conn  = DriverManager.getConnection(url, user, password)) {
            System.out.println("Verbindung erfolgreich!");

            // Tabelle auslesen
            String query = "SELECT * FROM person";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                System.out.println(
                        rs.getInt("id") + " | " +
                                rs.getString("name") + " | " +
                                rs.getString("surname") + " | " +
                                rs.getInt("age")
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Connection getConnection() {
        return conn;
    }

}
