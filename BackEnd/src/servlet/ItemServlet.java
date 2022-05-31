package servlet;

import javax.annotation.Resource;
import javax.json.*;
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
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


@WebServlet (urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    @Resource(name ="java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        JsonObjectBuilder dataMsgBuilder = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();

        Connection connection = null;
        try {
            connection = ds.getConnection();
            String option = req.getParameter("option");
            switch (option) {

                case "GENERATED_ID":
                    ResultSet rstI = connection.prepareStatement("SELECT code FROM item ORDER BY code DESC LIMIT 1").executeQuery();
                    if (rstI.next()) {
                        int tempId = Integer.parseInt(rstI.getString(1).split("-")[1]);
                        tempId += 1;
                        if (tempId < 10) {
                            objectBuilder.add("code", "I00-00" + tempId);
                        } else if (tempId < 100) {
                            objectBuilder.add("code", "I00-0" + tempId);
                        } else if (tempId < 1000) {
                            objectBuilder.add("code", "I00-" + tempId);
                        }
                    } else {
                        objectBuilder.add("code", "I00-001");
                    }

                    dataMsgBuilder.add("data", objectBuilder.build());
                    dataMsgBuilder.add("message", "Done");
                    dataMsgBuilder.add("status", "200");
                    writer.print(dataMsgBuilder.build());
                    break;

                case "GETALL":
                    ResultSet rst = connection.prepareStatement("SELECT * FROM item").executeQuery();
                    while (rst.next()) {
                        String itemCode = rst.getString(1);
                        String itemName = rst.getString(2);
                        int itemQtyOnHand = rst.getInt(3);
                        int itemUnitPrice = rst.getInt(4);

                        resp.setStatus(HttpServletResponse.SC_OK);//201

                        objectBuilder.add("code", itemCode);
                        objectBuilder.add("name", itemName);
                        objectBuilder.add("qtyOnHand", itemQtyOnHand);
                        objectBuilder.add("unitPrice", itemUnitPrice);

                        arrayBuilder.add(objectBuilder.build());

                        System.out.println(itemCode + " " + itemName + " " + itemQtyOnHand + " " + itemUnitPrice);
                    }
                    dataMsgBuilder.add("data", arrayBuilder.build());
                    dataMsgBuilder.add("message", "Done");
                    dataMsgBuilder.add("status", "200");

                    writer.print(dataMsgBuilder.build());
                    break;


                case "SEARCH":
                    String id = req.getParameter("id");
                    PreparedStatement pstm = connection.prepareStatement("SELECT * FROM item WHERE code LIKE ?");
                    pstm.setObject(1, "%"+id+"%");
                    ResultSet resultSet = pstm.executeQuery();

                    while (resultSet.next()) {
                        String itemCodeS = resultSet.getString(1);
                        String itemNameS = resultSet.getString(2);
                        int itemQtyOnHandS = resultSet.getInt(3);
                        double itemUnitPriceS = resultSet.getDouble(4);

                        resp.setStatus(HttpServletResponse.SC_OK);//201

                        objectBuilder.add("code", itemCodeS);
                        objectBuilder.add("name", itemNameS);
                        objectBuilder.add("qtyOnHand", itemQtyOnHandS);
                        objectBuilder.add("unitPrice", itemUnitPriceS);

                        arrayBuilder.add(objectBuilder.build());
                    }
                    dataMsgBuilder.add("data", arrayBuilder.build());
                    dataMsgBuilder.add("message", "Done");
                    dataMsgBuilder.add("status", "200");

                    writer.print(dataMsgBuilder.build());
                    break;


            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        String itemId = req.getParameter("itemId");
        String itemName = req.getParameter("itemName");
        String itemQty = req.getParameter("itemQty");
        String unitPrice = req.getParameter("unitPrice");
        PrintWriter writer = resp.getWriter();

        System.out.println(itemId);
        Connection connection = null;
        try {
            connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("INSERT INTO item values(?,?,?,?)");
            pstm.setObject(1, itemId);
            pstm.setObject(2, itemName);
            pstm.setObject(3, itemQty);
            pstm.setObject(4, unitPrice);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_CREATED);//201
                response.add("status", 200);
                response.add("message", "Successfully Added");
                response.add("data", "");
                writer.print(response.build());
            }

        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            resp.setStatus(HttpServletResponse.SC_OK); //200
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String itemCode = req.getParameter("itemCode");
        JsonObjectBuilder dataMsgBuilder = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();
        Connection connection = null;
        try {
            connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("DELETE FROM item WHERE code=?");
            pstm.setObject(1, itemCode);

            if (pstm.executeUpdate() > 0) {
                resp.setStatus(HttpServletResponse.SC_OK); //200
                dataMsgBuilder.add("data", "");
                dataMsgBuilder.add("message", "Item Deleted");
                dataMsgBuilder.add("status", "200");
                writer.print(dataMsgBuilder.build());
            }
        } catch (SQLException e) {
            dataMsgBuilder.add("status", 400);
            dataMsgBuilder.add("message", "Error");
            dataMsgBuilder.add("data", e.getLocalizedMessage());
            writer.print(dataMsgBuilder.build());
            resp.setStatus(HttpServletResponse.SC_OK); //200
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        //we have to get updated data from JSON format
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String code = jsonObject.getString("code");
        String name = jsonObject.getString("name");
        int qtyOnHand = jsonObject.getInt("qtyOnHand");
        int unitPrice = jsonObject.getInt("unitPrice");
        PrintWriter writer = resp.getWriter();
        System.out.println(code + " " + name + " " + qtyOnHand + " " + unitPrice);

        Connection connection = null;
        try {
            connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("UPDATE item SET description=?, qtyOnHand=?, unitPrice=? WHERE code=?");
            pstm.setObject(1, name);
            pstm.setObject(2, qtyOnHand);
            pstm.setObject(3, unitPrice);
            pstm.setObject(4, code);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_CREATED);//201
                response.add("status", 200);
                response.add("message", "Successfully Updated");
                response.add("data", "");
                writer.print(response.build());
            }

        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());
            resp.setStatus(HttpServletResponse.SC_OK); //200
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }




}




