package com.projectmangement.models;
import javax.persistence.*;

@Entity
public class User {

  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

  private String name;
  private String email;

  private String permissionId;

    public User() {
    }
    public User( String name, String permissionId) {
        this.setName(name);
        this.setPermissionId(permissionId);
    }
    public User(int id, String name, String permissionId, String email) {
        this.setEmail(email);
        this.setId(id);
        this.setName(name);
        this.setPermissionId(permissionId);
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name  +
                ", content='" + permissionId +
                '}';
//        return id + content + title;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
