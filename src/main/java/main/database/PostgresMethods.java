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


public class PostgresMethods {
    public Connection conn;


    public void initConnection(PostgresConnector postgresConnector) {
        conn = postgresConnector.getConnectionToPostgres();

    }

}
