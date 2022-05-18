package servlet;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;


@WebServlet (urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {
    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        JsonObjectBuilder response = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();

        Connection connection = null;
        try {
            String option = req.getParameter("option");
            ds.getConnection();
            switch (option){
                case "GET ALL":
                    ResultSet rst = connection.prepareStatement("SELECT * FROM customer").executeQuery();
                    while (rst.next()){
                        String id = rst.getString(1);
                        String name = rst.getString(2);
                        String address = rst.getString(3);
                        double salary = rst.getDouble(4);

                        objectBuilder.add("id",id);
                        objectBuilder.add("name",name);
                        objectBuilder.add("address",address);
                        objectBuilder.add("salary",salary);

                        arrayBuilder.add(objectBuilder.build());
                    }
                    response.add("status",200);
                    response.add("massage","Done");
                    response.add("data",arrayBuilder.build());
                    writer.print(response.build());
                    break;

            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try {
                connection.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

    }
}

