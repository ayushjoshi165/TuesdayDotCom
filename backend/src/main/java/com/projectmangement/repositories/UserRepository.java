package com.projectmangement.repositories;

import com.projectmangement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    //custom query to fetch the userRecord by name of permission_id

    List<User> findByNameOrPermissionId(String text, String textAgain);
}
